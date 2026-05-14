import express from 'express';
import axios from 'axios';
const port=3000;
import loginRouter from './loggingmiddelware/login.js';
const ip='http://4.224.186.213'
const app=express();
app.use(express.json());
app.use('/login', loginRouter);


app.listen(port,()=>{
    console.log(`Server is running on port  http://localhost:${port}`);}
);