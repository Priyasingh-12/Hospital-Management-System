const express = require("express")
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const router = express.Router();

// ================  for signup POST ==============
router.post("/signup",async (req,res) => {
try {
    const{name, email, password, confirmPassword } = req.body ;

//  Check required fields
  if(!name || !email || !password || !confirmPassword){
   return res.status(400).json({
    message: "All fields are required",
   })
  }
    // check password
   if(password !== confirmPassword){
    return res.status(400).json({
        message: "Passwords do not match",
    })
   }

   //check exist user
   const existUser = await User.findOne({ email }) ;
   if(existUser){
    return res.status(400).json({
        message: "Email already registered",
    })
   }

   //====== hash the password 
   const hashedPassword = await bcrypt.hash(password, 10)
   
   //===== create user 
   const user = await User.create({
    name,
    email,
    password:hashedPassword,
   })
   res.status(201).json({
     message: "User registered successfully",
     user:{
          id: user._id,
        name: user.name,
        email: user.email,
     }
   })

} catch (error) {
    res.status(500).json({
     message: " my Server error",
    });
}
})

// ================= for login post=============

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    // Check fields
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    // Find user
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    // Compare password
    const isPasswordCorrect = await bcrypt.compare(
      password,
      user.password
    );

    if (!isPasswordCorrect) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    // Create JWT
    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
         role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    return res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: "Login server error",
      error: error.message,
    });
  }
});

module.exports = router;