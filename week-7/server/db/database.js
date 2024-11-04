const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const dotenv = require("dotenv");

dotenv.config();
const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("MongoDb connected"))
  .catch((err) => console.log(err));

const userSchema = mongoose.Schema({
  email: {
    type:String,
    unique: true,
  },
  password: String,
  firstname:String,
  lastname:String

});

const adminSchema = mongoose.Schema({
    email: {
        type:String,
        unique: true,
      },
      password: String,
      firstname:String,
      lastname:String
})

const courseSchema = mongoose.Schema({
  title:String,
  descriptin:String,
  price:Number,
  imageUrl: String,
  creatorId: ObjectId
});


const purchaseSchema =mongoose.Schema({
    userId: ObjectId,
    courseId: ObjectId,
})

const tokenExp = mongoose.Schema({
  token:{
    
  }
})

const userModel = mongoose.model("User", userSchema);
const adminModel = mongoose.model("Admin", adminSchema);
const courseModel = mongoose.model("Course", courseSchema);
const purchaseModel = mongoose.model("Purchase", purchaseSchema);

module.exports = {
    userModel,
    adminModel,
    courseModel,
    purchaseModel,
};