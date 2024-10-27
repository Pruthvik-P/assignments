const { Router } = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = Router();
const userMiddleware = require("../middleware/user");

// User Routes
router.post('/signup',async (req, res) => {
    // Implement user signup logic
    const { username, password } = req.body;

    try{
        const userexists = await User.findOne({ username });
        if(userexists){
            return res.status(400).json({ message: "User already exists" });
        }

        const hash = await bcrypt.hash(password,10);
        console.log(hash);

        const signupSchema = new User({
            username,
            password: hash
        })
        signupSchema.save();

        res.json('User created successfully');
    } catch(err){
        res.status(500).json({ message: "Something went wrong" });
    }
    

});

router.post('/login',async (req, res) => {
     // Implement user login logic
     const { username, password } = req.body;

     try{
        const user = await User.findOne({username})
        if(!user){
            return res.status(400).json({ message: "User does not exist" });
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if(!validPassword){
            return res.status(400).json({ message: "Invalid password" });
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {expiresIn: "1h"});
        res.json({ token });
     } catch (err){
        res.status(500).json({ message: "Something went wrong" });
     }
});

router.get('/todos', userMiddleware, (req, res) => {
    // Implement logic for getting todos for a user
});

router.post('/logout', userMiddleware, (req, res) => {
    // Implement logout logic
});

module.exports = router