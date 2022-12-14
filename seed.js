const mongoose = require("mongoose");
const Users = require("./src/models/users");
const { hashPassword } = require("./src/utils/helpers");

const seed = () =>{
    Users.remove({}, (data, err)=>{
        if(!err) console.log(data);
        console.log(err);
    })
} 

const addAdmin = () =>{
    const admin = {
        username: "Alexander Dodzi Zormelo",
        dob: "2000-07-09",
        gender: "male",
        role: "Admin",
        nationality: "Ghanaian",
        pob: "Nungua",
        contact: "0553926202",
        email: "alexzormelo@gmail.com",
        address1: "a92",
        address2: "A92",
        emergency1: "0244543998",
        emergency2: "0240950247",
        password: "alex123",
        empID: "EMP0000"
    }
    const Password = hashPassword(admin.password);
    admin.password = Password;
    Users.create(admin, (err,data)=>{
        if(!err){
            console.log(data);
        }else{
            console.log(err);
        }
    })
}

module.exports = {seed, addAdmin};