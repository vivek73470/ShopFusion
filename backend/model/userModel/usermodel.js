const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username:{type:String, required:true},
    email:{type:String, required:true,unique: true,},
    password:{type:String, required:true},
    gender:{type:String,default:null},
    number:{type:String,default:null},
    address:{type:String,default:null},
    DOB:{type:String,default:null},
},
{versionKey:false}
)

// User :  JavaScript variable name that you use to interact with your Mongoose model 
// user : This is the name of the MongoDB collection where your documents are stored.
module.exports = mongoose.model("user",userSchema)

// module.exports = User;