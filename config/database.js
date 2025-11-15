const dotenv = require('dotenv');
dotenv.config();

const { MongoClient } = require('mongodb');

let database; // will hold the DB instance

// Initialize database connection
const initDb = async (callback) => {
    if (database) {
        console.log('Database is already initialized!');
        return callback(null, database);
    }

    try {
        const client = await MongoClient.connect(process.env.MONGODB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        database = client.db(process.env.DB_NAME); // database name from .env
        console.log('Database connected successfully');
        callback(null, database);
    } catch (err) {
        console.error('Failed to connect to database', err);
        callback(err);
    }
};

// Get the database instance
const getDatabase = () => {
    if (!database) {
        throw new Error('Database not initialized. Call initDb first.');
    }
    return database;
};

module.exports = {
    initDb,
    getDatabase
};
