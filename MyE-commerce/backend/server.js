import express from 'express';
import data from './data.js';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import seedRoute from './routes/seedRoute.js';
import productRoute from './routes/ProductRoute.js';
dotenv.config();
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log(`db connected`);
  })
  .catch((err) => {
    console.log(err.message);
  });
const app = express();

app.use('/api/seed', seedRoute);
app.use('/api/products', productRoute);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`serve at adreese http://localhost:${port}`);
});
