// Basic setup
var express=require("express")
var app=express()
app.use(express.static("public"))
app.set("view engine","ejs")
var  bodyparser=require("body-parser")
app.use(bodyparser.urlencoded({extended:true}))
require('dotenv').config()

// Mongoose setup
var mongoose=require("mongoose")

mongoose.connect(process.env.URI,{useNewUrlParser:true,useUnifiedTopology:true,useCreateIndex:true,useFindAndModify:false},function(err){
    if(err){
        console.log("Cannot connect to database")
    }
})


// Routes configuration
var todoRoutes=require("./routes")
app.use(todoRoutes)


app.listen(process.env.PORT);