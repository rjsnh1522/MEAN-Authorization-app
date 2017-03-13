const express=require('express');
const path=require('path');
const bodyParser=require('body-parser');
const cors =require('cors');
// const passport=require('passport-jwt');
var passport = require('passport');
const mongoose =require('mongoose');
const config=require('./config/database.js');


mongoose.connect(config.database);
// //on connecton
mongoose.connection.on('connected',()=>{
  console.log("connected to database"+config.database);
});

//on error
mongoose.connection.on('error',(err)=>{
  console.log("database err"+err);
});


const app=express();

const users =require('./routes/users');

const port =3000;

// for heroku
// const port =process.env.PORT || 8080;




app.use(cors());

//set static folder
app.use(express.static(path.join(__dirname,'public')));



//body paser Middleware

app.use(bodyParser.json());

//Passport Middleware

app.use(passport.initialize());

app.use(passport.session());

require('./config/passport')(passport);

app.use('/users',users);

//index route
app.get('/',(req,res)=>{

  res.send("Invalid Endpoint");
});


app.get('*',(req,res)=>{

  res.sendFile(path.join(__dirname,'public/index.html'));
});

//start server
//using arrow function
app.listen(port,()=>{

  console.log("listening to port "+port);

});
