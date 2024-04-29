import express, { response } from "express"
import {PORT, mongoDBURL} from "./config.js"
import mongoose from "mongoose";
import bookRoute from './routes/bookRoute.js';
import cors from 'cors'

const app =  express();

app.use(express.json());

app.get('/', (req,res)=>{
    console.log(req);
    return res.status(234).send("Welcome to MERN Stack Tutorial");

});
app.listen(PORT, ()=>{
    console.log(`App is running on port : ${PORT}`);
});


app.use('/books', bookRoute);


//allow custom origins
app.use(
    cors({
        origin:"http://localhost:3000",
        methods:['GET','POST','PUT',"DELETE"],
        allowedHeaders:['content-type'],
    })
);


mongoose
.connect(mongoDBURL)
.then(() =>{
    console.log("App connected to database");
})
.catch((err) =>{
    console.log(err);
});