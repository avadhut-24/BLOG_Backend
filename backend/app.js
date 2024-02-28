import express from 'express';
import mongoose from 'mongoose';
import userRouter from './routes/user_routes.js';
import blogRouter from './routes/blog_routes.js';
const app = express();
app.use(express.json());

app.use('/blog', blogRouter);
app.use('/user', userRouter);

const db_link = 'mongodb://localhost:27017';
mongoose
  .connect(db_link)
  .then(() => app.listen(3000))
  .then(() => {
    console.log('Connected to database and listening to local host 3000');
  })
  .catch((err) => {
    console.log(err);
  });
