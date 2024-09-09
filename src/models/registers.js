const mongoose=require("mongoose")
const employeeShema=new mongoose.Schema({
    firstname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        uniqe:true
    },
    password:{
        type:String,
        required:true
    },
    confirmpassword:{
        type:String,
        required:true
    }
})

const Register=new mongoose.model("Register",employeeShema);

module.exports=Register;