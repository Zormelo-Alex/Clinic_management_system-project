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
    const foundUsers = await Users.findOne({ $or: [{username: username}, {empID: username}] });
    const Compared = compare(password, foundUsers.password);
    //console.log(Compared, foundUsers.password, password);
    if(foundUsers){
        req.session.user = foundUsers;
        console.log(req.session);
        if(foundUsers.empID == "EMP0000"){
            if(Compared) return res.render("administrator");
            res.redirect("/");
        }else if(Compared){
            res.send("authenticated successfully");
        }else{
            res.redirect('/');
        }
    }else{
       res.redirect("/");
    }
});


module.exports = router;