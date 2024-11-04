const { Router } = require("express");
const courseRouter = Router();
const { courseModel } = require("../db/database");

courseRouter.post("/purchase", (req, res) => {
  res.json({
    msg: "Course purchase endpoint",
  });
});

courseRouter.get("/preview", (req, res) => {
  res.json({
    msg: "Course preview endpoint",
  });
});

module.exports = {
  courseRouter,
};
