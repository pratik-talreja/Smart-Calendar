import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import model from "./models/index.js";
import routes from "./routes/index.js";
import googleauth from 'google-auth-library';

// import googleauth from 'google-auth-library';


import {} from "dotenv/config";


const app = express();
mongoose.connect(
  "mongodb+srv://" +
    process.env.Login +
    ":" +
    process.env.Pass +
    "@cluster0.ktxqt.mongodb.net/" +
    process.env.DataBaseName +
    "?retryWrites=true&w=majority"
);

// mongoose.connect(
//   `mongodb+srv://nidhi:donna123@cluster0.ktxqt.mongodb.net/smartCalendar?retryWrites=true&w=majority`
// );


app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

routes(app);

export default app;
