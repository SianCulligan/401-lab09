'use strict';

const productsSchema = require ('../models/products-schema.js');
const categoriesSchema = ('../models/categories-schema.js');
const Model = require('../models/model.js');

const modelFinder = (req,res, next) =>  {
  console.log('FOUND MODEL', req.params.model);
  //valid models are product and category
  switch(req.params.model) {
  case 'products': 
    console.log('found product model');
    req.collectionModel = new Model(productsSchema);
    next();
    break;

  case 'categories': 
    console.log('found category model');
    req.collectionModel = new Model(categoriesSchema);
    next();
    break;

  default: 
    res.status(404);
    res.end();
    break;
  } 
};

module.exports = modelFinder;