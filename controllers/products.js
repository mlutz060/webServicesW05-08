const mongodb = require('../databse/connect');
const ObjectId = require('mongodb').ObjectId;

const getAllProducts = async (req, res, next) => {
    const result = await mongodb
    .getDb()
    .db('SimpleWebsite')
    .collection('products')
    .find();
    if (result){
      result.toArray().then((lists) => {
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(lists)
          });
        }
      else {
          res
            .status(500)
            .json(
              result.error || "ERROR: Something went wrong, this show could not be found."
            );
      };
  };

const getsingleProduct = async (req, res, next) => {    
  const productId = new ObjectId(req.params.id);
  const result = await mongodb
      .getDb()
      .db('SimpleWebsite')
      .collection('products')
      .find({ _id: productId });
      if (result)
      {
        result.toArray().then((lists) => {
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(lists[0])
          });
        }
      else {
          res
            .status(500)
            .json(
              result.error || "ERROR: Something went wrong, this show could not be found."
            );
      };
  };

const PostNewProduct = async (req, res, next) => {
    const product = {
      bookTitle: req.body.bookTitle,
      bookAuthor: req.body.bookAuthor,
      bookSummary: req.body.bookSummary,
      stock: req.body.stock,
      location: req.body.location,
      pages: req.body.pages,
      genre: req.body.genre
    };
    const result = await mongodb
      .getDb()
      .db('SimpleWebsite')
      .collection('products')
      .insertOne(product);
    if (result.acknowledged) {
      res.status(201).json(result);
    } else {
      res.status(500)
      .json(response.error || "There was an error");
    }
};

const UpdateProduct = async (req, res, next) => {
    const productId = new ObjectId(req.params.id);
    const data = {
      bookTitle: req.body.bookTitle,
      bookAuthor: req.body.bookAuthor,
      bookSummary: req.body.bookSummary,
      stock: req.body.stock,
      location: req.body.location,
      pages: req.body.pages,
      genre: req.body.genre
    };
    const response = await mongodb
      .getDb()
      .db('SimpleWebsite')
      .collection('products')
      .replaceOne({ _id: productId }, data);

      if (result.modifiedCount > 0) {
        res.status(204).send();
      } else {
        res
          .status(500)
          .json(result.error || "ERROR: The show could not be updated.");
      }
};

const DeleteProduct = async (req, res, next) => {
    const productId = new ObjectId(req.params.id);
    const response = await mongodb
      .getDb()
      .db('SimpleWebsite')
      .collection('products')
      .deleteOne({ _id: productId });

    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json({ error: 'Error' });
    }
  };

module.exports = {
  getAllProducts,
  getsingleProduct,
  PostNewProduct,
  UpdateProduct,
  DeleteProduct
};
