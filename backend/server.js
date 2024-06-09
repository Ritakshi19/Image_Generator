require('dotenv').config()
const express = require('express');
const imageRouter= require('./Routes/imageRouter.js');
const authRouter= require('./Routes/authRouter.js');

const app = require('./app.js')
const test=require('./models/imageModel.js')
const test1=require('./models/userModel.js')

const mongoose =require('mongoose');

app.use(express.json());

app.use('/api/images', imageRouter);
app.use('/api/v1/auth', authRouter);



const url = "mongodb+srv://$_USERNAME_$:$_PASSWORD_$@cluster0.nkfrijt.mongodb.net/$_DB_NAME_$?retryWrites=true&w=majority&appName=Cluster0";

let dbLink= url.replace("$_USERNAME_$", process.env.DB_USER);
dbLink= dbLink.replace("$_PASSWORD_$",  process.env.DB_PASSWORD);
dbLink= dbLink.replace("$_DB_NAME_$",   process.env.DB_NAME);

mongoose.connect(dbLink).then(() => console.log ('Database Connected!'));

//server running on url 
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    console.log(`http://localhost:${port}`);
});
