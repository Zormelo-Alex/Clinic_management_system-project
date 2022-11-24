const express = require("express");
const app = express();
const session = require("express-session");
const mongoose = require("mongoose");
const mongoStore = require("connect-mongo");
const Users = require("./src/models/users");
const auth = require("./src/routes/auth");
const { hashPassword } = require("./src/utils/helpers");
const {seed, addAdmin} = require("./seed");




//seed()
//addAdmin();


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

const notAdmin = (req, res, next) =>{
    if(req.session.user.role == "Admin") next();
    else res.render("search-p", {user: req.session.user});
}

app.use(auth);

app.use((req, res, next)=>{
    if(req.session.user.empID) next();
    else res.send("cant");
});


app.get("/addStaff", notAdmin, (req, res)=>{
    const user = req.session.user;
    res.render("dashboard", {user});
});

app.post("/addStaff", notAdmin, async(req, res)=>{
    if(!req.body.gender) req.body.gender = "male";
    if(!req.body.address2) req.body.address2 = "null";
    if(!req.body.emergency2) req.body.emergency2 = "null";
    const Password = hashPassword(req.body.password);
    req.body.password = Password;
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

app.post("/update", (req, res)=>{
    console.log(req.body);
    res.redirect("/addStaff")
})

app.get("/searchStaff", notAdmin, async(req, res)=>{
    const user = req.session.user;
    const allUsers = await Users.find({});
    //console.log(allUsers);
    res.render("search", {user, allUsers})
});

app.get("/manageSchedule", notAdmin, (req, res)=>{
    const user = req.session.user;
    res.render("manage", {user});
});

app.get("/searchPatient", (req, res)=>{
    const user = req.session.user;
    res.render("search-p", {user})
});

app.get("/editInfo", (req, res)=>{
    const user = req.session.user;
    res.render("edit", {user});
});

app.get("/changePassword", (req, res)=>{
    res.render("changePass")
});



app.listen("5000", ()=>{
    console.log("server started on port 5000");
})