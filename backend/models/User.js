import mongoose from "mongoose";
import bcrypt from "bcryptjs"

const UserSchema = new mongoose.Schema ({
fullName:{
    type:String,
    required:true,
},
email:{
    type:String,
    required:true,
    unique:true
},
password:{
    type:String,
    required:true
},
profileImageUrl:{
    type:String,
    default:null
},

},{timestamps:true})

//Hash password before saving
UserSchema.pre("save", async function () {
    if (!this.isModified("password")) {
        return; 
    }

    // Hash the password
    try {
        this.password = await bcrypt.hash(this.password, 10);
    } catch (error) {
        throw new Error("Password hashing failed");
    }
});

//Compare passwords
UserSchema.methods.comparePassword = async function (candidatePassword){
return await bcrypt.compare(candidatePassword,this.password)
}

const UserModel = mongoose.model("User",UserSchema);

export default UserModel;