import * as mongodb from '../databse/connect';
import { ObjectId } from 'mongodb';
import { Request, Response, NextFunction } from 'express';

const getAllProducts = async (req, res) => {
  try {
    const result = await mongodb.getDb().db('SimpleWebsite').collection('products').find();
    const lists = await result.toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getsingleProduct = async (req, res) => {
  try {
    const productId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDb()
      .db('SimpleWebsite')
      .collection('products')
      .find({ _id: productId });
    const lists = await result.toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const PostNewProduct = async (req, res) => {
  try {
    const product = {
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
      .insertOne(product);
    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json(response.error || "There was an error");
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const UpdateProduct = async (req, res) => {
  try {
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

    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json({ error: 'Error' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const DeleteProduct = async (req, res) => {
  try {
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
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export {
  getAllProducts,
  getsingleProduct,
  PostNewProduct,
  UpdateProduct,
  DeleteProduct
};
