import jwt from "jsonwebtoken";
import UserModel from "../models/User.js";

//Generate jwt token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "2 h" })
};

//Register User
export const registerUser = async (req, res) => {
   
    
  const { fullName, email, password, profileImageUrl } = req.body;
 console.log(fullName, email, password, profileImageUrl);
  //Validation Check for missing field
  if (!fullName || !email || !password) {
   return res.status(400).json({
      message: "All fiedls are requried",
    });
  }
  try {
    //check if email already exist
    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "Email already in use",
      });
    }

    //Create User

    const user = await UserModel.create({
      fullName,
      email,
      password,
      profileImageUrl,
    });

    res.status(200).json({
      id: user._id,
      user,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({
      message: "Error registering user",
      error: error.message,
    });
  }
};

//Login User
export const loginUser = async (req, res) => {
    const {email,password} = req.body
    if(!email || !password){
        return res.status(400).json({
            message:"All field are required"
        })
    }
    try {
        const user = await UserModel.findOne({email});

        if(!user || !(await user.comparePassword(password))){
             return res.status(400).json({
            message:"Invalid credentials"
        })
        }

        res.status(200).json({
            id:user._id,
            user,
            token:generateToken(user._id)
        })
    } catch (error) {
        res.status(500).json({
      message: "Error registering user",
      error: error.message,
    });
    }
};

//Get User Info
export const getUserInfo = async (req, res) => {
    try {
        const user = await UserModel.findById(req.user.id).select("-password")
        if(!user){
            return res.status(404).json({
                message:"user not found"
            })
        }
        res.status(200).json({
            user,
        })
    } catch (error) {
         res.status(500).json({
      message: "Error registering user",
      error: error.message,
    });
    }
};


//Update user
export const updateUser = async (req, res) => {
    const {fullName, profileImageUrl} = req.body  
}