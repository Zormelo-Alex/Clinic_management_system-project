const { Router } = require("express");
const router = Router();
const Users = require("../models/users");
const { hashPassword, compare } = require("../utils/helpers");


const notAdmin = (req, res, next) =>{
    if(req.session.user.role == "Admin") next();
    else res.redirect("/searchPatient");
}

router.use((req, res, next)=>{
    if(req.session.user.empID) next();
    else res.send("Login First!");
});

router.get("/addStaff", notAdmin, async (req, res)=>{
    const user = await Users.findOne({empID: req.session.user.empID});
    res.render("dashboard", {user});
});

router.post("/addStaff", notAdmin, async(req, res)=>{
    if(!req.body.gender) req.body.gender = "male";
    if(!req.body.address2) req.body.address2 = "null";
    if(!req.body.emergency2) req.body.emergency2 = "null";
    const Password = hashPassword(req.body.password);
    req.body.password = Password;
    const userDB = await Users.findOne({$or: [{empID: req.body.empID}, {username: req.body.username}]});
    //console.log(userDB);
    if(userDB) return res.send("user with that Employee ID or username already exists!");
    Users.create(req.body, (err, newUser)=>{
        if(!err){
            //console.log(newUser);
            console.log("New staff added```");
            res.redirect('/addStaff');
        }else{
            console.log(err);
            res.send("error occured while adding user! " + err);
        }
    })
});

router.post("/updateStaff", async(req, res)=>{
    const user = req.session.user;
    const { empID } = req.body;
    const findUser = await Users.findOneAndUpdate({empID}, req.body);
    if(findUser){
        console.log("```User updated info```");
    }
    if(user.role == "Admin"){
        return res.redirect("/searchStaff");
    }else return res.redirect("back");
});


router.get("/searchStaff", notAdmin, async(req, res)=>{
    const user = await Users.findOne({empID: req.session.user.empID});
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

router.get("/manageSchedule", notAdmin, async (req, res)=>{
    const user = await Users.findOne({empID: req.session.user.empID});
    const allUsers = await Users.find({});
    allUsers.forEach(user=>{
        const num = Math.random() * allUsers.length;
        user.Num = num; 
    });
    function byNum(a, b){
        return parseInt(a.Num) - parseInt(b.Num);
    }
    allUsers.sort(byNum);
    res.render("manage", {user, allUsers});
});


router.get("/editInfo", async (req, res)=>{
    const user = await Users.findOne({empID: req.session.user.empID});
    const finduser = await Users.findOne({empID: user.empID});
    res.render("edit", {user, finduser});
});

router.get("/user/:id", async (req, res)=>{
    const id = req.params.id;
    const user = await Users.findOne({empID: req.session.user.empID});
    const findUser = await Users.findById(id);
    res.render("editStaff", {user, dbUser: findUser});
});

router.get("/user/delete/:id", async (req, res)=>{
    const {id} = req.params;
    const del  = await Users.findByIdAndRemove({_id: id}); 
    console.log("you deleted ", del.username);
    res.redirect("/searchStaff")

})

// router.get("/changePassword", (req, res)=>{
//     res.render("change_password")
// });
// router.post("/updatePassword", (req, res)=>{
//     console.log(req.body);
//     const { old, newPass } = req.body;
//     const co
//     res.send("done");
// });


module.exports = router;
