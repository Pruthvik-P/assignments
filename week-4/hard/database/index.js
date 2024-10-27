const mongoose = require('mongoose');
const MONGODB_URI = process.env.MONGODB_URI;

// Connect to MongoDB
mongoose.connect(MONGODB_URI )
.then(()=> console.log('Connected to MongoDB'))
.catch((err) => console.log('Failed to connect to MongoDB', err));

// Define schemas

const UserSchema = new mongoose.Schema({
    // Schema definition here
    userName:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
}
});

const TodoSchema = new mongoose.Schema({
    // Schema definition here
    task:{
        type: String,
        required: true
    },
    completed:{
        type: Boolean,
        default: false
    },
});

const User = mongoose.model('User', UserSchema);
const Todo = mongoose.model('Todo', TodoSchema);

module.exports = {
    User,
    Todo
}