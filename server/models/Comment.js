const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateformat');

// Create the Comment Schema
const commentSchema = new Schema({
    commentText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
    },
    commentAuthor: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
    }, 
},  
{
    toJSON: {
        virtuals: true,
    },
    id: false,
}
);

// Create the Comment model using the CommentSchema
const Comment = model('Comment', commentSchema);

// Export the Comment model
module.exports = Comment;
