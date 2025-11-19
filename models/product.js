const { getDatabase } = require('../config/database');
const { ObjectId } = require('mongodb');

const productCollection = () => getDatabase().collection('products');

module.exports = {
    findAll() {
        return productCollection().find().toArray();
    },
    findById(id) {
        return productCollection().findOne({ _id: new ObjectId(id) });
    },
    create(data) {
        return productCollection().insertOne(data).then(res => res.insertedId);
    },
    update(id, data) {
        return productCollection().updateOne(
            { _id: new ObjectId(id) },
            { $set: data }
        ).then(res => res.modifiedCount);
    },
    delete(id) {
        return productCollection().deleteOne({ _id: new ObjectId(id) }).then(res => res.deletedCount);
    }
};
