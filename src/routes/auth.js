const { Router } = require("express");
const router = Router();
const Users = require("../models/users");

router.get("/", (req, res)=>{
    res.redirect("/login");
});

router.get("/login", (req, res)=>{
    res.render("login");
});

router.post("/login", async (req, res)=>{
    const {username, password} = req.body;
    console.log(req.session);
    const foundUsers = await Users.findOne({ $or: [{username: username}, {empID: username}] });
    if(foundUsers){
        if(foundUsers.empID == "EMP0000"){
            if(password == foundUsers.password) return res.render("administrator");
            res.redirect("/");
        }else if(password == foundUsers.password){
            res.send("authenticated successfully");
        }else{
            res.redirect('/');
        }
    }else{
       res.redirect("/");
    }
});


module.exports = router;