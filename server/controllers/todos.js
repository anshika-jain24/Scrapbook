import todoItem from "../models/todoItem.js";

export const getTodos = async (req, res) => {
   try {
    const todoItems= await todoItem.find();

    console.log(todoItems[0].title);

    res.status(200).json(todoItems);

   } catch (error) {
       res.status(404).json({ message: error.message });
   }
}

export const addTodo = async ( req, res) => {
    const todo=req.body;
    const newTodo= new todoItem(todo);

    try {
        await newTodo.save();

        res.status(201).json(newTodo);

    } catch (error) {
        res.status(409).json({ message: error.message});
    }
}