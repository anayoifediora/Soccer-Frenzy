const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID
        username: String
        email: String
        password: String
        articles: [Article]!
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
        article(articleId: ID!): Article
        comments(articleId: ID!): [Comment]
    }
`;

module.exports = typeDefs;

