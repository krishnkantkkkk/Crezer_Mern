import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import UserRouter from './routes/UserRouter.js';
import cookieParser from 'cookie-parser';
import connectDB from './configuration/db.js';

import cors from 'cors';



connectDB();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
  origin : process.env.FRONTEND_ORIGIN,
  credentials: true,
}));

const homeHtml = `
  <html>
    <head>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Merienda:wght@300..900&family=Roboto+Slab:wght@100..900&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Merienda:wght@300..900&family=Roboto+Slab:wght@100..900&display=swap');
      </style>
    </head>
    <body>
      <div style="height:100%; width:100%; display:flex; justify-content:center; align-items:center; background: #222831; border-radius:10px">
          <h1 style="font-family: 'Roboto slab'; color : white; text-align:center">THIS IS THE <span style="color:#45ffca; font-family: Merienda; font-weight:900">CREzER </span>BACKEND</h1>
      </div>
    </body>
  </html>`

app.get('/', (req, res) => {
  res.send(homeHtml);
});

app.use('/users', UserRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});