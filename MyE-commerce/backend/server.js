import express from 'express';
import data from './data.js';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import seedRoute from './routes/seedRoute.js';
import productRoute from './routes/ProductRoute.js';
import userRouter from './routes/userRoutes.js';
import cors from 'cors';
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
app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use('/api/seed', seedRoute);
app.use('/api/products', productRoute);
app.use('/api/users', userRouter);

const port = process.env.PORT || 5000;

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});
app.listen(port, () => {
  console.log(`serve at adreese http://localhost:${port}`);
});
