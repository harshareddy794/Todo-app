var express=require("express")
var router=express.Router({mergeParams: true})
var mongoose=require("mongoose")


// Create mongoose model for todo list
todoSchema= new mongoose.Schema({
    todo:{
        require: true,
        type:String
    },
    finished:{
        type:Boolean,
        default: false
    }
})


var todo=mongoose.model("todo",todoSchema)


router.post("/add/todo",function(req,res){
    newTodo={
        todo:req.body.todo
    }
    todo.create(newTodo,function(err,foundTodo){
        if(err){
            console.log(err)
        }else{
            res.redirect("/")
        }
    })
})

router.get("/remove/:id",function(req,res){
    newTodo={
        finished:true
    }
    todo.findByIdAndUpdate(req.params.id,newTodo,function(err,foundTodo){
        if(err){
            console.log(err)
        }else{
            res.redirect("/")
        }
    })
})


// Routes configuration
router.get("/",function(req,res){
    todo.find(function(err,findTodos){
        res.render("index",{todos:findTodos})
    })
})

module.exports=router