import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
        token
        user {
            _id
            username
        }
        }
    }
`;

export const ADD_USER = gql`
mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_ARTICLE = gql`
mutation addArticle($title: String!, $articleText: String!, $articleAuthor: String!) {
    addArticle(title: $title, articleText: $articleText, articleAuthor: $articleAuthor) {
      _id
      createdAt
      title
      articleText
      articleAuthor
      comments {
        _id
        commentText
      }
    }
  }
`; 

export const ADD_COMMENT = gql`
mutation addComment($articleId: ID!, $commentText: String!, $commentAuthor: String!) {
    addComment(articleId: $articleId, commentText: $commentText, commentAuthor: $commentAuthor) {
      _id
      commentCount
      comments {
        _id
        commentText
        commentAuthor
        createdAt
      }
    } 
  }
`;

export const REMOVE_ARTICLE = gql`
mutation removeArticle($articleId: ID!) {
    removeArticle(articleId: $articleId) {
      _id
      title
      articleText
      articleAuthor
      createdAt
      comments {
        _id
        commentText
        commentAuthor
        createdAt
      }
    }
  }
`;