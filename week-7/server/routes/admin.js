const { Router } = require("express");
const adminRouter = Router();
const { adminModel, courseModel } = require("../db/database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {JWT_ADMIN_SECRET} = require("../config/config");
const adminAuth = require("../middleware/adminAuth");

adminRouter.post("/signup", async (req, res) => {
  const { email, password, firstname, lastname } = req.body;
  if (!email || !password || !firstname || !lastname) {
    return res.status(400).json({
      msg: "Please provide an email, password, firstname, and lastname",
    });
  }
  try {
    const userExists = await adminModel.findOne({ email });
    console.log(userExists);
    if (userExists) {
      return res.status(400).json({
        msg: "User already exists",
      });
    }

    const hash = await bcrypt.hash(password, 10);

    const newUser = adminModel({
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

adminRouter.post("/signin",async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res(400).json({
      msg: "Email or Password is missing",
    });
  }

  try {
    const userExists = await adminModel.findOne({ email });
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
      JWT_ADMIN_SECRET
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

adminRouter.post("/create-course", adminAuth,(req, res) => {
  res.json({
    msg: "Create course endpoint",
  });
});

adminRouter.put("/course", adminAuth, async (req, res) => {
  const adminId = req.userId;

  const {title, description, price,imageUrl} = req.body;

  if(!title || !description || !price || !imageUrl){
    return res.status(400).json({
      msg: "Please provide title, description, price, and imageUrl",
    });
  }
  try{
    const course = courseModel.create({
      title,
      description,
      price,
      imageUrl,
      creatorId: adminId,
    })

    await course.save();
    res.status(400).json({
      msg: "Course created",
      courseId: course._id,
    })
  }catch{
    res.status(500).json({
      msg: "Internal server error" + err,
    });
  }
});

adminRouter.get("/course/bulk", (req, res) => {
  res.json({
    msg: "Bulk course endpoint",
  });
});

module.exports = {
  adminRouter,
};
