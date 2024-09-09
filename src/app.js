const express = require("express");
const app = express();
const path = require("path");
const session = require('express-session');
const port = process.env.PORT || 3000;
const hbs = require("hbs");
require("./db/conn");
const Register = require("./models/registers");
const Attendance=require("./models/attendence");
const User = require('./models/user');
// Middleware to parse incoming JSON data
app.use(express.json());

// Middleware to parse incoming form data
app.use(express.urlencoded({ extended: false }));

app.use('/static', express.static("public"));

app.use(session({
    secret: 'your-secret-key', // Change this to your actual secret key
    resave: false,
    saveUninitialized: true
    // Add more configuration options if needed
}));








app.set("view engine", "hbs");
app.set("views", 'views');

app.get("/", (req, res) => {
    res.render('index.hbs');
});

app.get("/register", (req, res) => {
    res.render('register');
});

app.post("/register", async (req, res) => {
    try {
        const password = req.body.password;
        const cpassword = req.body.confirmpassword;

        if (password === cpassword) {
            const registerempl = new Register({
                firstname: req.body.firstname,
                email: req.body.email,
                password: req.body.password,
                confirmpassword: req.body.confirmpassword
            });
            const registered = await registerempl.save();
            res.status(201).render("dash");
        } else {
            res.send("Passwords do not match");
        }
    } catch (error) {
        res.status(400).send(error);
    }
});
// Import the User model
 // Adjust the path as needed based on your directory structure

// POST route for handling login
// Assuming you've set up your Express app and configured Handlebars as the view engine

// Example of handling the login POST request
app.get("/login", (req, res) => {
    res.render('login');
});




app.get("/AfterRegister",(req,res)=>{
    res.render('AfterRegister')
})

app.get("/about",(req,res)=>{
    res.render('about')
})
app.get("/diet",(req,res)=>{
    res.render('diet')
})
app.get("/exercisemain",(req,res)=>{
    res.render('exercisemain')
})
app.get("/exercisemain",(req,res,next)=>{
    res.render('exercisemain')
})

app.get("/exercide",(req,res,next)=>{
    res.render('exercide')
})
app.get("/login",(req,res,next)=>{
    res.render('login')
})
app.get("/new",(req,res,next)=>{
    res.render('new')
})
app.get("/yog",(req,res,next)=>{
    res.render('yog')
})
app.get("/dash",(req,res,next)=>{
    const user = req.session.user;
    
    res.render('dash',{user})
})

app.get("/attendence",(req,res,next)=>{
    const user = req.session.user;
    
    res.render('attendence',{user})
})
// ... (Previous code remains unchanged)

// Import the Register model


// POST route for handling lfirstname

// POST route for handling login
app.post('/login', async (req, res) => {
    const { firstname, password } = req.body;
    
    try {
        // Find user by firstname
        const user = await Register.findOne({ firstname });
        if (!user) {
            return res.status(401).send('Invalid firstname or password');
        }
        // Convert the provided password to match the stored password type
        let providedPassword = password;

        if (typeof user.password === 'number') {
            providedPassword = parseInt(password);
        }

        // Compare the passwords
        if (user.password !== providedPassword.toString()) {
            return res.status(401).send('Invalid firstname or password');
        }

        req.session.user = user; // Store user in session
        res.render('dash');
    } catch (error) {
        console.error('Error occurred during login:', error);
        res.status(500).send('Internal Server Error');
    }
});

// ... (Remaining routes and app.listen remain unchanged)


app.post("/mark-attendance", async (req, res) => {
    try {
      const { user_id, year, month, day, status } = req.body;

    
      if (!user_id || !year || !month || !day || status === undefined) {
        return res.status(400).send("Missing required fields");
      }
  
      let attendanceRecord = await Attendance.findOne({ user_id, year });
  
      if (!attendanceRecord) {
        attendanceRecord = new Attendance({ user_id, year, attendance: [] });
      }
  
      let monthRecord = attendanceRecord.attendance.find(a => a.month === month);
      if (!monthRecord) {
        monthRecord = { month, days: [] };
        attendanceRecord.attendance.push(monthRecord);
      }
  
      let dayRecord = monthRecord.days.find(d => d.day === day);
      if (!dayRecord) {
        dayRecord = { day, status };
        monthRecord.days.push(dayRecord);
      } else {
        dayRecord.status = status;
      }
  
      await attendanceRecord.save();
      res.status(200).send("Attendance marked successfully");
      // Redirect to the dash.hbs file after marking attendance
      res.redirect('/dash'); // Replace '/dash' with your actual route
    } catch (error) {
      console.error("Error marking attendance:", error);
      res.status(500).send("Internal Server Error");
    }
  });
      
  
// Example route to retrieve user data including ID from session
app.get('/api/userdata', (req, res) => {
    const user = req.session.user; // Retrieve user information from the session
    res.json(user); // Send user data as a JSON response
  });
  



  // Add a GET route to fetch attendance data for a user
  app.get("/get-attendance/:user_id/:year", async (req, res) => {
    try {
      const { user_id, year } = req.params;
  
      const attendanceRecord = await Attendance.findOne({ user_id, year });
      if (!attendanceRecord) {
        return res.status(404).send("Attendance record not found");
      }
  
      res.json(attendanceRecord);
    } catch (error) {
      console.error("Error fetching attendance:", error);
      res.status(500).send("Internal Server Error");
    }
  });
  









app.listen(port, () => {
    console.log(`Server is running at port no ${port}`);
});
