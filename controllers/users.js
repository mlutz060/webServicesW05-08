const mongodb = require('../databse/connect');
const ObjectId = require('mongodb').ObjectId;

const getAllUsers = async (req, res, next) => {
    const result = await mongodb.getDb().db().collection('users').find();
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    });
  };

  const getsingleUser = async (req, res, next) => {
    const userId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDb()
      .db()
      .collection('users')
      .find({ _id: userId });
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists[0]);
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