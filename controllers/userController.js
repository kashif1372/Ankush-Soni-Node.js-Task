const User= require("../models/User")
const bcrypt=require('bcrypt')
const getAllUsers=async(req,res)=>{
    try{
        const users=await User.find();
        res.json(users);
    }catch(err){
        console.log(err);
        res.status(500).json({error: "Internal Server Error"});
    }
}

/// Create
const registerUser = async (req, res) => {
    try {
      const { username, email, password } = req.body;
  
      const existingUser = await User.findOne({ email });
  
      if (existingUser) {
        return res.status(400).json({ error: "User with this email already exists" });
      }
  
    //   console.log("Password before hashing:", password);
  
      const hashedPassword = await bcrypt.hash(password, 10);
  
    //   console.log("Hashed password:", hashedPassword);
  
      const newUser = new User({
        username,
        email,
        password: hashedPassword,
      });
  
      await newUser.save();
  
      return res.status(200).json({ message: "User Registration Successful" });
    } catch (err) {
      console.log("Error during registration", err);
      res.status(500).json({ error: "Internal server error" });
    }
  };

//getting specific user by id
const getUserById= async (req,res)=>{
    try{
        const {id}=req.params;
        const user=await User.findById(id);

        if(!user){
            return res.status(404).json({error: 'User not found'});
        }
        return res.json(user);
    }catch(err){
        console.log('Error fetching users',err);
        return res.status(500).json({error: 'Internal Server Error'});
    }
}

//Update a user
const updateUser=async(req,res)=>{
    try{
        const {id}=req.params;
        const {username,email}=req.body;

        const updatedUser= await User.findByIdAndUpdate(id,{username,email},{new: true})

        if(!updateUser){
            return res.status(404).json({error: 'User not found'});
        }

        return res.json({message: 'User updated Successfully',user: updateUser});
    }catch(err){
        console.log('Error Updating user: ',err);
        return res.status(500).json({error: 'Internal Server error'});
    }
};

//Delete User
const deleteUser=async(req,res)=>{
  try{
    const {id}=req.params;
    const deleteUser=await User.findByIdAndDelete(id);

    if(!deleteUser){
      return res.status(404).json({error: "user not found"});
    }

    return res.json({message: 'User deleted Successfully'});

  }catch(err){
    console.log('Error in deleting user');
    return res.status(500).json({error: "Internal server error"});
  }
}


module.exports={getAllUsers,registerUser,getUserById,updateUser,deleteUser};