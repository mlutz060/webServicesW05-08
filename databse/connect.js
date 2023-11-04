const dotenv = require('dotenv');
dotenv.config();
const MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');
let _db;

const initDb = (callback) => {
    if(_db){
        console.log('Already initialized');
        return callback(null, _db);
    }
    MongoClient.connect(process.env.DATABASE_URL)
        .then((client) => {
            _db = client;
            callback(null, _db);
        })
        .catch((err) => {
            callback(err);
        });
};

const getDb = () => {
    if (!_db){
        throw Error('DB not initialized');
    }
    return _db;
};

module.exports = {
    initDb,
    getDb,
}
