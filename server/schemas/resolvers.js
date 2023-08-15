const { AuthenticationError } = require('apollo-server-express');
const { User, Article, Comment } = require('../models');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({ _id: context.user._id })
                .select('-__v -password')
                .populate('articles')
                .populate('followers')
                .populate('following');
                return userData;
            }
            throw new AuthenticationError('Not logged in');
        },
        users: async () => {
            return User.find().populate('articles').populate('followers');
        },
        user: async (parent, { username }) => {
            return User.findOne({ username }).populate('articles').populate('followers'); 
        },
        articles: async (parent, { username }) => {
            const params = username ? { username } : {};
            return Article.find(params).sort({ createdAt: -1 });
        },
        article: async (parent, { articleId }) => {
            return Article.findOne({ articleId }).populate('comments');
        },
        comments: async (parent, { articleId }) => {
            const params = articleId ? { articleId } : {};
            return Comment.find(params).sort({ createdAt: -1 });
        }
    }
};