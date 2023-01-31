const { Router } = require("express");
const router = Router();
const Users = require("../models/users");
const { compare } = require("../utils/helpers");

router.get("/", (req, res)=>{
    res.redirect("/login");
});

router.get("/login", (req, res)=>{
    res.render("login");
});

router.post("/login", async (req, res)=>{
    const {username, password} = req.body;
    const foundUser = await Users.findOne({ $or: [{username: username}, {empID: username}] });
    //console.log(Compared, foundUsers.password, password);
    if(foundUser){
        const Compared = compare(password, foundUser.password);
        if(Compared){
            req.session.user = await foundUser;
            console.log("logged in as "+ req.session.user.username);
            if(foundUser.role == "Admin")return res.render("dashboard", {user: foundUser});
            res.redirect("/searchPatient");
        }else{
            console.log("incorrect password")
            res.redirect("/");
        }
    }else{
        console.log("couldnt find user!");
       res.redirect("/");
    }
});

router.get("/logOut", (req, res)=>{
    console.log("logged out as " + req.session.user.username);
    req.session.user = {};
    res.redirect("/")
});



module.exports = router;