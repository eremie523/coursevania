const passport = require("passport");
const User = require("../db/Models/Users");

passport.serializeUser((user, done) => {
    console.log("reaches Here");
    done(null, user.id);
})

passport.deserializeUser(async (id, done) => {
    const user = await User.findOne({_id: id})
    if(user){
        done(null, user)
    }else{
        done("User Not Found", null)
    }
})