const dotenv = require('dotenv');
dotenv.config();

const MongoClient = require('mongodb').MongoClient;

let database;
const initDb = (callback, name) => {
    if (database) {
        console.log('databae is already initialized!');
        return callback(null, database);
    }
    MongoClient.connect(process.env.MONGODB_URL)
        .then((client) => {
            database = client;
            callback(null, database);
        });

    const getDatabase = () => {
        if (!database) {
            throw Error('Database not intialized')
        }
        return database;
    }
};


module.export = {
    getDatabase,
    initDb
}
