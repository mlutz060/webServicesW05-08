const validator = require('../helpers/validate');

const validateUser = (req, res, next) =>{
    const validationRule = {
        fname: 'required|min:2',
        lname: 'required|string|min:2',
        height: 'required|string',
        membershipStatus: 'string',
        cardNum: 'required|min:16',
    };
    validator(req.body, validationRule, {}, (err, status) =>{
        if (!status){
            res.status(412).send({
                success: false,
                message: 'Validation failed',
                data: err
            });
        } else {
            next();
        }
    });
};
const validateProduct = (req, res, next) =>{
  const validationRule = {
    bookTitle: "required|string",
    bookAuthor: "required|string",
    bookSummary: "required|string",
    stock: "required|string",
    location: "required|string",
    pages: "required|string",
    genre: "required|string"
  };
  validator(req.body, validationRule, {}, (err, status) =>{
      if (!status){
          res.status(412).send({
              success: false,
              message: 'Validation failed',
              data: err
          });
      } else {
          next();
      }
  });
};
const validateId = (req, res, next) => {
    const validationRule = {
      id: 'required|alpha_num|size:24'
    }
    validator(req.params, validationRule, {}, (err, status) => {
      if (!status) {
        res.status(412).send({
          success: false,
          message: 'Validation failed',
          data: err
        });
      } else {
        next();
      }
    });
  }

  const { requiresAuth } = require('express-openid-connect');

module.exports = {
    validateUser,
    validateProduct,
    validateId,
    requiresAuth
}