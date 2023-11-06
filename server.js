const express=require('express')
const bodyParser= require('body-parser')
const mongoose= require('mongoose')
require('dotenv').config();

const app=express();
const PORT= process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(process.env.DB_CONNECTION,{useNewUrlParser: true,useUnifiedTopology: true})
.then(()=>{
    console.log('Connected to the database');
})
.catch((error)=>{
    console.error('Database connection error:',error);
    process.exit(1);
});

const authRoutes=require('./routes/authRoutes')
const userRoutes=require('./routes/userRoutes')
app.use('/auth',authRoutes)
app.use('/users',userRoutes)


app.listen(PORT,()=>{
    console.log(`Server is listening on PORT ${PORT}`);
});