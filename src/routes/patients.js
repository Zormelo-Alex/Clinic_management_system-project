const { Router } = require("express");
const router = Router();
const Patients = require("../models/patients");



router.get("/addPatient", (req, res)=>{
    const user = req.session.user;
    res.render("addPatient", {user});
});

router.post("/addPatient", async (req, res)=>{
    console.log(req.body);
    const patientDB = await Patients.findOne({pID: req.body.pID});
    console.log(patientDB);
    if(patientDB) return res.send("Patient with that ID already exists!");
    const newPatient = Patients.create(req.body);
    res.redirect("/searchPatient");
});

router.get("/searchPatient", async (req, res)=>{
    const user = req.session.user;
    const allPatients = await Patients.find({});
    //console.log(allUsers);
    res.render("search-p", {user, allPatients})
});


module.exports = router;