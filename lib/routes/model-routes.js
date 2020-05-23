'use strict'; 

const express = require('express');
const router = express.Router();

const modelFinder = require('../middleware/model-finder.js');

router.param('model', modelFinder);

// POST /api/v1/:model (CREATE A NEW ENTRY)
router.post('/:model', async (req, res, next) => {
  let result = await req.collectionModel.create(req.body);
  console.log('RESULTS OF POST', result);
  res.status(201);
  res.send(result);
});

// GET /api/v1/:model (GET ALL ENTRIES)
router.get('/:model', async (req, res, next) => {
  let result = await req.collectionModel.getAllResults({});
  console.log('RESULTS OF READ ALL', result);
  res.status(200);
  res.send(result);
});

// GET /api/v1/:model/:id (GET A SPECIFIC ENTRY)
router.get('/:model/:id', async (req, res, next) => {
  let result = await req.collectionModel.getById(req.params.id);
  res.status(200);
  res.send(result);
});

// PUT /api/v1/:model/:id (UPDATE AN ENTRY)
router.put('/:model/:id', async (req, res, next) => {
  let result = await req.collectionModel.update(req.params.id, req.body);
  res.status(200);
  res.send(result);
});

// DELETE /api/v1/:model/:id (DELETE AN ENTRY)
router.delete('/:model/:id', async (req, res, next) => {
  let result = await req.collectionModel.delete(req.params.id);
  res.status(200);
  res.send(result);
});

module.exports = router;