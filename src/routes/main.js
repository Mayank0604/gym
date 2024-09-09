const express = require("express");
const Register = require("../models/registers");
const routes=express.Router()


routes.get("/",(req,res)=>{
    res.render('index')
})

routes.get("/AfterRegister",(req,res)=>{
    res.render('AfterRegister')
})

routes.get("/about",(req,res)=>{
    res.render('about')
})
routes.get("/diet",(req,res)=>{
    res.render('diet')
})
routes.get("/exercisemain",(req,res)=>{
    res.render('exercisemain')
})
routes.get("/exercisemain",(req,res,next)=>{
    res.render('exercisemain')
})
routes.get("/dash",(req,res,next)=>{
    res.render('dash')
})
routes.get("/exercide",(req,res,next)=>{
    res.render('exercide')
})
routes.get("/login",(req,res,next)=>{
    res.render('login')
})
routes.get("/new",(req,res,next)=>{
    res.render('new')
})
routes.get("/yog",(req,res,next)=>{
    res.render('yog')
})
routes.get("/yoga",(req,res,next)=>{
    res.render('yoga')
})


routes.get("/register", (req, res,nexr) => {
    res.render("register");
})

routes.post('/signup', (req, res) => {
    const { username, password } = req.body;
  
    if (!username || !password) {
      return res.status(400).json({ error: 'Please provide both username and password' });
    }
  
    // Check if username already exists
    for (const user of users) {
      if (user.username === username) {
        return res.status(400).json({ error: 'Username already exists' });
      }
    }
  
    // Create a new user and add it to the database
    const newUser = { username, password };
    users.push(newUser);
  
    return res.status(201).json({ message: 'User signed up successfully' });
  });

  const users = [];

  
  
  // Route to handle user registration
 // Route to handle user registration

// POST route for user registration

routes.post("/register",async(req,res)=>{
  try{
      const password=req.body.password;
      const cpassword=req.body.confirmpassword;

      if(password===cpassword){
          const registerempl= new Register({
              firstname:req.body.firstname,
              email:req.body.email,
              password:req.body.password,
              confirmpassword:req.body.confirmpassword
          })
          console.log(password)
         const registered= await registerempl.save()
         res.status(201).render("index")
      }else{
          res.send("password are not matching")
      }
  }  catch(error){
          res.status(400).send(error)
  }
})
module.exports=routes;