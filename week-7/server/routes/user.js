const { Router } = require("express");
const userRouter = Router();
const { userModel, purchaseModel } = require("../db/database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {JWT_USER_SECRET} = require("../config/config");
const userAuth = require("../middleware/userAuth");


userRouter.post("/signup", async (req, res) => {
  const { email, password, firstname, lastname } = req.body;
  if (!email || !password || !firstname || !lastname) {
    return res.status(400).json({
      msg: "Please provide an email, password, firstname, and lastname",
    });
  }
  try {
    const userExists = await userModel.findOne({ email });
    console.log(userExists);
    if (userExists) {
      return res.status(400).json({
        msg: "User already exists",
      });
    }

    const hash = await bcrypt.hash(password, 10);

    const newUser = userModel({
      email,
      password: hash,
      firstname,
      lastname,
    });

    await newUser.save();
    res.status(201).json({
      msg: "User created",
    });
  } catch (err) {
    res.status(500).json({
      msg: "Internal server error:" + err,
    });
  }
});

userRouter.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res(400).json({
      msg: "Email or Password is missing",
    });
  }

  try {
    const userExists = await userModel.findOne({ email });
    if (!userExists) {
      return res.status(400).json({
        msg: "User does not exist please sign up",
      });
    }

    const passMatch = await bcrypt.compare(password, userExists.password);
    if (!passMatch) {
      return res.status(400).json({
        msg: "Invalid password",
      });
    }
    const token = jwt.sign(
      {
        id: userExists._id,
      },
      JWT_USER_SECRET
    );

    res.status(200).json({
      msg: "User logged in",
      token,
    });
  } catch (err) {
    res.status(400).json({
      msg: "Internal server error" + err, 
    });
  }
});

userRouter.get("/purchases", userAuth, async (req, res) => {
  const userId = req.user.userId

  try {
    const exists = await purchaseModel.find({
      userId: userId
    })
    let purchases = []

    for (let i = 0; i<found.length; i++){
      purchases.push(found[i].courseId)
    }

    const coursesData = await courseModel.find({
      _id: {
        $in: purchases
      }
    })
    console.log(exists)

    res.status(200).json({
      found: found,
      coursesData: coursesData
    })
  } catch(err){
    console.log("Something went wrong :", err)
  }
});

userRouter.post("logout", userAuth, async (req, res) => {
  const token = req.headers.authorization;

  try{
    if(!token){
      return res.status(400).json({
        msg: "Please provide a token"
      })
    }

    const logout = await Expire
  } catch(err){

  }
})

module.exports = {
  userRouter,
};
