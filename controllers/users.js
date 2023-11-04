const mongodb = require('../databse/connect');
const ObjectId = require('mongodb').ObjectId;
const findOrCreate = require('mongoose-findorcreate');


const getAllUsers = async (req, res) => {
    const result = await mongodb.getDb().db('SimpleWebsite').collection('users').find();
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    });
  };

  const getsingleUser = async (req, res, next) => {
    const userId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDb()
      .db('SimpleWebsite')
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
    const response = await mongodb
      .getDb()
      .db('SimpleWebsite')
      .collection('users')
      .insertOne(user);
    if (response.acknowledged){
        res.status(201).json(response);
    }
    else {
        res.status(500).json(response.error || "there was an error");
    }
};

const UpdateUser = async (req, res) => {
  const user = new ObjectId(req.params.id);
  const data = {
    fname: req.body.fname,
    lname: req.body.lname ,
    height: req.body.height,
    membershipStatus: req.body.membershipStatus,
    cardNum: req.body.cardNum
  }
  const response = await mongodb
    .getDb()
    .db('SimpleWebsite')
    .collection('users')
    .replaceOne({ _id: user }, data);
  console.log(response);
  if(response.modifiedCount > 0){
    res.status(204).send();
  }
  else{
    res.status(500).json(response.error || 'Error')
  }
};

const DeleteUser = async (req, res) => {
  const user = new ObjectId(req.params.id);
  const response = await mongodb
    .db('SimpleWebsite')
    .collection('users')
    .deleteOne({ _id: user }, true);
  if (response.deletedCount > 0){
    res.status(204).send();
  }
  else{
    res.status(500).json(response.error || 'Error');
  }
}


module.exports = {
    getAllUsers,
    getsingleUser,
    PostNewUser,
    UpdateUser,
    DeleteUser
}