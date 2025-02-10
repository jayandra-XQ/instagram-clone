import 'dotenv/config'
import express from "express";
import connectDB from './config/db.js';

const app = express();


const PORT = process.env.PORT || 5001;

app.get('/', (req, res) => {
  res.send('Hello, World!');
})


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  connectDB();
});
