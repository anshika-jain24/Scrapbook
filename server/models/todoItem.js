import mongoose from 'mongoose';

const todoSchema = mongoose.Schema({
    title: String,
    createdAt: {
        type: Date,
        default: new Date()
    }
});

const todoItem = mongoose.model('TodoItem', todoSchema);

export default todoItem;