const { AuthenticationError } = require('apollo-server-express');
const { User, Article, Comment } = require('../models');
const { signToken } = require('../utils/auth');

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
            return User.findOne({ username })
            .populate('articles')
            .populate('followers')
            .populate({
                path: 'articles',
                populate: 'comments',
            }); 
        },
        articles: async (parent, { username }) => {
            const params = username ? { username } : {};
            return Article.find(params).populate('comments').sort({ createdAt: -1 });
        },
        article: async (parent, { articleId }) => {
            return Article.findOne({ _id: articleId }).populate('comments');
        },
        comments: async (parent, { articleId }) => {
            const params = articleId ? { articleId } : {};
            return Comment.find(params).sort({ createdAt: -1 });
        }
    },
    Mutation: {
        addUser: async (parent, {username, email, password }) => {
            const user = await User.create({ username, email, password });
            const token = signToken(user);
            return { token, user };
        },
        login: async (parent, {email, password }) => {
            const user = await User.findOne({ email });
            if (!user) {
                throw new AuthenticationError('Incorrect credentials');
            }
            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Please check your password!');
            }
            const token = signToken(user);
            return { token, user };
        },
        addArticle: async (parent, { title, image, articleText, articleAuthor }, context) => {
            const article = await Article.create({ title, image, articleText, articleAuthor });

                await User.findOneAndUpdate(
                    { username: articleAuthor },
                    { $addToSet: { articles: article._id } }
                );
            return article;
        },
        addComment: async (parent, { articleId, commentText, commentAuthor }, context) => {
            const comment = await Comment.create({ commentText, commentAuthor });
            const article = await Article.findOneAndUpdate(
                { _id: articleId },
                { $addToSet: { comments: comment._id } },
                { new: true,
                  runValidators: true }
            );
            return article;
        },
        addFollower: async (parent, { userId, followerId }, context) => {
            if (userId) {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: userId },
                    { $addToSet: { followers: followerId } },
                    { new: true }
                ).populate('followers');
                return updatedUser;
            }
            throw new AuthenticationError('You need to be logged in!');
        },
        removeFollower: async (parent, { userId, followerId }, context) => {
            return User.findOneAndUpdate(
                { _id: userId },
                { $pull: { followers: followerId } },
                { new: true }
            ).populate('followers');
        },
        removeArticle: async (parent, { articleId }, context) => {
            return Article.findOneAndDelete(
                { _id: articleId }
            );
        },
        removeComment: async (parent, { articleId, commentId }, context) => {
            const article = await Article.findOneAndUpdate(
                { _id: articleId },
                { $pull: { comments: commentId } },
                { new: true }
            );
            return article;
        },
        updateArticle: async (parent, { articleId, articleText }, context) => {
            const updatedArticle = await Article.findOneAndUpdate(
                { _id: articleId },
                { articleText },
                { new: true }
            );
            return updatedArticle;
        }
    }

};

module.exports = resolvers;