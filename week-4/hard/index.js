const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const userRoutes = require("./routes/user");
const todoRoutes = require("./routes/todo");

const app = express();
const port = process.env.PORT;

app.use(express.json());

app.use("/user", userRoutes);
app.use("/todo", todoRoutes);

//  start writing your routes here

app.listen(port, ()=> console.log(`server is running at http://localhost:${port}`));

