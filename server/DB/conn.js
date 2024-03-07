import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

const DB = process.env.DATABASE

mongoose.connect(DB, {
  useUnifiedTopology: true,
  useNewUrlParser: true
}).then(() => console.log("Database Connected"))
  .catch((err) => {
    console.error("Error connecting to database:", err);
  });