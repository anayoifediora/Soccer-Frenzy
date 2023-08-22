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