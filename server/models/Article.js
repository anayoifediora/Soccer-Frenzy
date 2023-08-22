const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateformat');

// Create the Article schema
const articleSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    image: {
        type: String,
        required: false,
        default: "https://cdn.punchng.com/wp-content/uploads/2023/07/28131406/WhatsApp-Image-2023-07-28-at-4.51.22-AM-e1690546446284.jpeg",
        match:[/\.(png|svg|jpg|jpeg|gif)$/]
    },
    articleText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 2800,
        trim: true,
    },
    articleAuthor: {
        type: String,
        required: true,
        trim: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
    },
    comments: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Comment',
        },
    ],
},
{
    toJSON: {
        virtuals: true,
    },
    id: false,
});

// Create a virtual called commentCount that retrieves the length of the article's comments array field on query.
articleSchema.virtual('commentCount')
.get(function () {
    return this.comments.length;
});

// Create the Article model using the ArticleSchema
const Article = model('Article', articleSchema);

// Export the Article model
module.exports = Article;