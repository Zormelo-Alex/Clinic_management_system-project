const passport = require("passport")
const User = require("../database/shcemas/user")
const {Strategy} = require("passport-local")
const {compare} = require("../utils/helpers")

//serializing the user using passport
//to update the user session
passport.serializeUser((user, done)=> {
    done(null, user.id)
    console.log("serialized user")
    //console.log(user)
})

//deserializing the user to access the sssion data and compare to the db to veryfy the user
passport.deserializeUser(async (id, done)=> {
    console.log("user deserialized")
    //console.log(id)
    try{
        //finding one user using the id generated from the session
        //could also use findbyid
        const userFound = await User.findOne({id})
        if(!userFound) throw new Error("user not found")
        done(null, userFound)
        console.log(userFound)
    }catch(err){
        console.log(err)
        done(err, null)
    }
})

passport.use(
    new Strategy(
        //without this object conversion thing you could 
        //take the usename as username
        {
            usernameField: "email"
        },
        async(email, password, done)=>{
            //console.log(email)
            //console.log(password)
            
            try{
                if(!email || !password) throw new Error("bad request. missing credentials")
                const userDB = await User.findOne({email})
                //console.log(userDB)
                if(!userDB) throw new Error("couldn't find user")
                const comparepass = compare(password, userDB.password)
                if(comparepass) {
                    console.log("Authenticated successfully")
                    done(null, userDB)
                }else{
                    console.log("invalid password")
                    done(null, null)
                }
            }catch (err){
                console.log(err)
                done(err, null)
            }  
        }
    )
);