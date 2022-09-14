import express from 'express';
import data from '../data.js';
import Product from '../models/ProductModel.js';
const seedRoute = express.Router();
seedRoute.get('/', async (req, res) => {
  await Product.remove({});
  const createdProducts = await Product.insertMany(data.products);
  res.send({ createdProducts });
});

export default seedRoute;
