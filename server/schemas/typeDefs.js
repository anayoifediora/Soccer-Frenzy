const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID
        username: String
        email: String
        password: String
        articles: [Article]
        comments: [Comment]
        followers: [User]!
        followerCount: Int
    }

    type Article {
        _id: ID
        title: String
        image: String
        articleText: String
        articleAuthor: String
        createdAt: String
        comments: [Comment]!
        commentCount: Int
    }

    type Comment {
        _id: ID
        commentText: String
        commentAuthor: String
        createdAt: String
    }

    type Auth {
        token: ID!
        user: User
    }

    type Query {
        me: User
        users: [User]
        user(username: String!): User
        articles(username: String): [Article]
        article(articleId: ID): Article
        comments(articleId: ID): [Comment]
        commentsByUser(username: String!): [Comment]
    }

    type Mutation {
        addUser(username: String!, email: String!, password: String!): Auth
        login(email: String!, password: String!): Auth
        addArticle(title: String!, image: String, articleText: String!, articleAuthor: String!): Article
        addComment(articleId: ID!, commentText: String!, commentAuthor: String!): Article
        addFollower(userId: ID, followerId: ID): User
        removeFollower(userId: ID, followerId: ID!): User
        removeArticle(articleId: ID!): Article
        removeComment(articleId: ID!, commentId: ID!): Article
        updateArticle(articleId: ID!, articleText: String!): Article
    }
`;

module.exports = typeDefs;

