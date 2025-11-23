require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const GithubStrategy = require('passport-github2').Strategy;
const cors = require("cors");

const mongodb = require('./config/database');
const routes = require('./routes');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const app = express();
const port = process.env.PORT || 3000;

/* --------------------------
   BASIC MIDDLEWARE
--------------------------- */
app.use(bodyParser.json());
app.use(cors({ origin: '*', methods: ['GET','POST','PUT','DELETE','OPTIONS'] }));

app.use(session({
  secret: "secret",
  resave: false,
  saveUninitialized: true,
}));

app.use(passport.initialize());
app.use(passport.session());

/* --------------------------
   PASSPORT SERIALIZATION
--------------------------- */
passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});

/* --------------------------
   GITHUB STRATEGY
--------------------------- */
passport.use(new GithubStrategy(
  {
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL, // e.g. http://localhost:3000/github/callback
  },
  function (accessToken, refreshToken, profile, done) {
    return done(null, profile);
  }
));

/* --------------------------
   ROUTES
--------------------------- */

// GitHub login route
app.get("/login", passport.authenticate("github"));

// GitHub callback
app.get(
  "/github/callback",
  passport.authenticate("github", { failureRedirect: "/api-docs" }),
  (req, res) => {
    req.session.user = req.user;
    res.redirect("/");
  }
);

// Check login status
app.get("/", (req, res) => {
  if (req.session.user) {
    res.send(`Logged in as ${req.session.user.displayName}`);
  } else {
    res.send("Logged out");
  }
});

// API routes
app.use("/", routes);

// Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

/* --------------------------
   ERROR HANDLERS
--------------------------- */
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Something went wrong!",
    error: err.message,
  });
});

/* --------------------------
   START SERVER
--------------------------- */
mongodb.initDb((err, db) => {
  if (err) {
    console.error("Database initialization failed", err);
    process.exit(1);
  } else {
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
      console.log("Database connected successfully");
    });
  }
});
