const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Users = require("./src/models/users");


mongoose.connect("mongodb://localhost:27017/cms").then(res=> console.log("db connected successfully...")).catch((err)=> console.log(err));

app.use(express.static("src"));
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded());


app.get("/", (req, res)=>{
    res.redirect("/login");
});

app.get("/login", (req, res)=>{
    res.render("login");
});

app.post("/login", async (req, res)=>{
    const {username, password} = req.body;
    const foundUsers = await Users.findOne({username: username});
    //console.log(foundUsers);
    // if(username == "Alexander") res.status(200).render("administrator",{username});
    res.redirect("/addStaff");
});

app.get("/addStaff", (req, res)=>{
    res.render("administrator")
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
    console.log("server started on port 5001");
})