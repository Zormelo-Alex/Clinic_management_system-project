const { Router } = require("express");
const router = Router();
const Users = require("../models/users");


const notAdmin = (req, res, next) =>{
    if(req.session.user.role == "Admin") next();
    else res.render("search-p", {user: req.session.user});
}

router.use((req, res, next)=>{
    if(req.session.user.empID) next();
    else res.send("cant");
});


router.get("/addStaff", notAdmin, (req, res)=>{
    const user = req.session.user;
    res.render("dashboard", {user});
});

router.post("/addStaff", notAdmin, async(req, res)=>{
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
            //console.log(newUser);
            res.redirect('/addStaff');
        }else{
            console.log(err);
            res.send("error occured while adding user! " + err);
        }
    })
});

router.post("/updateStaff", async(req, res)=>{
    const { empID } = req.body;
    const findUser = await Users.findOneAndUpdate({empID}, req.body);
    return res.redirect("/searchStaff");
});


router.get("/searchStaff", notAdmin, async(req, res)=>{
    const user = req.session.user;
    const allUsers = await Users.find({});
    //console.log(allUsers);
    res.render("search", {user, allUsers})
});

router.post("/getUser", async (req, res)=>{
    const payload = req.body.payload.trim();
    const search = await Users.find({username: {$regex: new RegExp('.*'+ payload + '.*', 'i')}}).exec();
    //limit search result to 10
    //search = search.slice(0, 10);
    res.send({payload : search});
});

router.get("/manageSchedule", notAdmin, (req, res)=>{
    const user = req.session.user;
    res.render("manage", {user});
});


router.get("/editInfo", (req, res)=>{
    const user = req.session.user;
    res.render("edit", {user});
});

router.get("/user/:id", async (req, res)=>{
    const id = req.params.id;
    const user = req.session.user;
    const findUser = await Users.findById(id);
    res.render("editStaff", {user, dbUser: findUser});
});

router.get("/changePassword", (req, res)=>{
    res.render("changePass")
});


module.exports = router;
