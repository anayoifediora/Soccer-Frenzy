import { gql } from '@apollo/client';

// Mutation to login a user
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

// Mutation to create a user
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

// Mutation to add an article
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

// Mutation to add a comment
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

// Mutation to remove an article
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
// Mutation to remove a comment
export const UPDATE_ARTICLE = gql`
mutation Mutation($articleId: ID!, $articleText: String!) {
  updateArticle(articleId: $articleId, articleText: $articleText) {
    title
    articleText
  }
}
`;
