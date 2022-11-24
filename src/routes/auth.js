const { Router } = require("express");
const router = Router();
const Users = require("../models/users");
const { hashPassword, compare } = require("../utils/helpers");

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
            req.session.user = foundUser;
            if(foundUser.role == "Admin")return res.render("dashboard", {user: foundUser});
            res.render("search-p", {user: foundUser});
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
    req.session.user = {};
    console.log("logged out");
    res.redirect("/")
});



module.exports = router;