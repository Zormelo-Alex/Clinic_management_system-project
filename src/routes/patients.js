const { Router } = require("express");
const router = Router();
const Patients = require("../models/patients");
const medData = require("../models/medData");


const notRecords = (req, res, next) =>{
    const user = req.session.user;
    if(user.role != "Records") return res.send("Sorry you can't access this route");
    next();
}

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
    //console.log(allPatients);
    res.render("search-p", {user, allPatients})
});

router.post("/getPatient", async (req, res)=>{
    const payload = req.body.payload.trim();
    const search = await Patients.find({$or: [{username: {$regex: new RegExp('.*'+ payload + '.*', 'i')}}, {pID: {$regex: new RegExp('^'+ payload + '.*', 'i')}}]}).exec();
    //limit search result to 10
    //search = search.slice(0, 10);
    res.send({payload : search});
});

router.get("/patient/:id", async (req, res)=>{
    const id = req.params.id;
    const user = req.session.user;
    const findPatient = await Patients.findById(id);
    res.render("viewPatient", {user, dbPatient: findPatient});
});

router.post("/updatePatient", notRecords, async (req, res)=>{
    const { pID } = req.body;
    const findUser = await Patients.findOneAndUpdate({pID}, req.body);
    return res.redirect("/searchPatient");
});

router.get("/patient/:id/addData", async (req, res)=>{
    const id = req.params.id;
    const user = req.session.user;
    const findPatient = await Patients.findById(id);
    const pmedData = await medData.find({pID: id});
    if(pmedData.length > 0){
        console.log("found something");
        return res.render("addToPatientData", {user, pmedData, dbPatient: findPatient});
    }
    res.render("addMedData", {user, dbPatient: findPatient});
});

router.post("/patient/:id/addData", async (req, res)=>{
    const id = req.params.id;
    const user = req.session.user;
    req.body.pID = id;
    const newMedData = medData.create(req.body);
    res.redirect("back");
});

router.post("/patient/:id/updateData", async (req, res)=>{
    const id = req.params.id;
    const user = req.session.user;
    req.body.pID = id;
    const pmedData = await medData.find({pID: id});
    if(pmedData.length > 0){
        console.log("found something");
        console.log(req.body, pmedData);
    }
    res.redirect("back");
});

router.get("/patient/:id/allPatientData", async (req, res)=>{
    const id = req.params.id;
    const user = req.session.user;
    const dbPatient = await Patients.findById(id);
    const pmedData = await medData.find({pID: id});
    res.render("allPatientData", {dbPatient, pmedData, user});
});




module.exports = router;