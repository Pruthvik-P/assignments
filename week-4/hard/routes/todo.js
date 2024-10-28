const { Router } = require("express");
const adminMiddleware = require("../middleware/user");
const router = Router();

// todo Routes
router.post('/createtodo',async (req, res) => {
    // Implement todo creation logic
    const { title, description } = req.body;

    try{
        if(!title || !description){
            return res.status(400).json({ message: "Title and description are required" });
        }

        const todo = new Todo({
            title,
            description,
            userId: req.user.id
        })
        if(!todo){
            res.status(400).json({ message: "Todo not created"});
        }

        todo.save();
        res.json({
            Todos: todo
        })
    } catch(err){
        res.status(403).json({
            msg: "Something went wrong"
        })
    }
});

router.put('/update/:id', adminMiddleware,async (req, res) => {
    // Implement update todo  logic
    const {id} = req.params;
    const { title, description } = req.body;
    try{
        const update = await Todo.findByIdAndUpdate(id, {title, description},{new: true});

        if(!update){
            return res.status(400).json({ message: "Todo not updated" });
        }
        res.status(200).json({
            message: "Todo updated successfully"
        })
    } catch(err){
        res.status(403).json({
            msg: "Something went wrong"
        })
}});

router.delete('/deleteall', adminMiddleware,async (req, res) => {
    // Implement delete todo logic
    try{
        await Todo.deleteMany({ userId: req.user.id });
        res.status(200).json({
            message: "All todos deleted successfully"
        })
    }catch(err){
        res.status(500).json({
            error: "Something went wrong"
        })
    }
});

router.delete('/deleteone/:id', adminMiddleware,async (req, res) => {
    // Implement delete todo by id logic
    const { id } = req.params;

    try{
        const todo = await Todo.findByIdAndDelete(id);
        if(!todo){
            res.status(400).json("todo do not exist");
        }
        res.status(200).json({
            message: "Todo deleted successfully"
        })
    } catch(err){
        res.status(500).json({
            error: "Something went wrong"
        })
    }
});


router.get('/alltodo', adminMiddleware,async (req, res) => {
    // Implement fetching all todo logic
    try{
        const todo = await Todo.find({ userId: req.user.userID });
        if(!todo){
            res.status(400).json({ message: "No todo found" });
        }
        res.status(200).json({
            alltodos: todo
        })
    } catch(err){
        res.status(500).json({
            error: "Something went wrong"
        })
    }

});

router.get('/todo/:id', adminMiddleware,async (req, res) => {
    // Implement fetching todo by id logic
    const { id } = req.params;
    try{
        const todo = await Todo.findById(id)
        if(!todo){
            res.status(400).json({ message: "todo does not exists" });
        } 
        res.status(200).json({
            todo
        })
    } catch(err){
        res.status(500).json({
            error: "Something went wrong"
        })
    }
});

module.exports = router;