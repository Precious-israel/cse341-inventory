const { getDatabase } = require('../config/database');
const { ObjectId } = require('mongodb');

// Correct name:
const transactionCollection = () => getDatabase().collection('transactions');

module.exports = {

    findAll() {
        return transactionCollection().find().toArray();
    },

    findById(id) {
        return transactionCollection().findOne({ _id: new ObjectId(id) });
    },

    create(data) {
        return transactionCollection().insertOne(data).then(res => res.insertedId);
    },

    update(id, data) {
        return transactionCollection().updateOne(
            { _id: new ObjectId(id) },
            { $set: data }
        ).then(res => res.modifiedCount);
    },

    delete(id) {
        return transactionCollection().deleteOne({ _id: new ObjectId(id) }).then(res => res.deletedCount);
    }
};
