const express = require("express");
const app = express();
const session = require("express-session");
const mongoose = require("mongoose");
const mongoStore = require("connect-mongo");
const passport = require("passport");
const Users = require("./src/models/users");
const auth = require("./src/routes/auth");
const {seed, addAdmin} = require("./seed");



//addAdmin();
//seed()


mongoose.connect("mongodb://localhost:27017/cms").then(res=> console.log("db connected successfully...")).catch((err)=> console.log(err));

app.use(express.static("src"));
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded());
app.use(session({
    secret: "DOM",
    resave: false,
    saveUninitialized: false,
    store: mongoStore.create({
        mongoUrl: "mongodb://localhost:27017/cms"
    }),
}));

app.use(auth);

app.get("/addStaff", (req, res)=>{
    res.render("administrator")
});

app.post("/addStaff", async(req, res)=>{
    if(!req.body.gender) req.body.gender = "male";
    if(!req.body.address2) req.body.address2 = "null";
    if(!req.body.emergency2) req.body.emergency2 = "null";
    const userDB = await Users.findOne({$or: [{empID: req.body.empID}, {username: req.body.username}]});
    console.log(userDB);
    if(userDB) return res.send("user with that Employee ID or username already exists!");
    Users.create(req.body, (err, newUser)=>{
        if(!err){
            console.log(newUser);
            res.redirect('/addStaff');
        }else{
            console.log(err);
            res.send("error occured while adding user! " + err);
        }
    })
});

app.get("/searchStaff", (req, res)=>{
    res.render("search")
});

app.get("/manageSchedule", (req, res)=>{
    res.render("manage")
});

app.get("/searchPatient", (req, res)=>{
    res.render("search-p")
});

app.get("/editInfo", (req, res)=>{
    res.render("edit")
});

app.get("/changePassword", (req, res)=>{
    res.render("changePass")
});

app.get("/logOut", (req, res)=>{
    res.send("logged out");
});



app.listen("5000", ()=>{
    console.log("server started on port 5000");
})