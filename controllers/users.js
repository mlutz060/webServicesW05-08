const mongodb = require('../databse/connect');
// const ObjectId = require('mongodb').ObjectId;

const getAllUsers = async (res) => {
    const results = await mongodb.getDb().db().collection('users').find();
    results.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists);
    });
};

const getsingleUser = async (res) => {
    const results = await mongodb.getDb().db().collection('users').find();
    results.toArray().then((lists) =>{
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists);
    });
};


const PostNewUser = async (req, res) => {
    const user = {
        fname: req.body.fname,
        lname: req.body.lname ,
        height: req.body.height,
        membershipStatus: req.body.membershipStatus,
        cardNum: req.body.cardNum
    };
    const response = await mongodb.getDb().db().collection('users').insertOne(user);
    if (response.acknowledged){
        res.status(201).json(response);
    }
    else {
        res.status(500).json(response.error || "there was an error");
    }
};



module.exports = {
    getAllUsers,
    getsingleUser,
    PostNewUser
}