const express = require("express");
const app = express();
const session = require("express-session");
const mongoose = require("mongoose");
const mongoStore = require("connect-mongo");
const auth = require("./src/routes/auth");
const user = require("./src/routes/user");
const patient = require("./src/routes/patients");
const {seed, addAdmin} = require("./seed");

//seed()
//addAdmin();
 
//connecting to the database
mongoose.connect("mongodb://localhost:27017/cms").then(res=> console.log("db connected successfully...")).catch((err)=> console.log(err.message));

app.use(express.static("src"));
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(session({
    secret: "DOM",
    resave: false,
    saveUninitialized: false,
    store: mongoStore.create({
        mongoUrl: "mongodb://localhost:27017/cms"
    }),
}));


app.use(auth);
app.use(user);
app.use(patient);



//specifying the port to run the app
app.listen("7000", ()=>{
    console.log("server started on port 7000");
})