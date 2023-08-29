import { gql } from '@apollo/client';

// Query to get all articles
export const QUERY_ARTICLES = gql`
    query allArticles {
        articles {
            _id
            title
            image
            createdAt
            articleAuthor
            commentCount
        }
    }
`;

// Query to get a single article
export const QUERY_SINGLE_ARTICLE = gql`
    query singleArticle($articleId: ID!) {
        article(articleId: $articleId) {
            _id
            title
            image
            createdAt
            articleAuthor
            articleText
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
// Query to get all articles by a single user
export const QUERY_MY_ARTICLES = gql`
query Query($email: String!) {
    user(email: $email) {
      articles {
        _id
        title
        image
        articleText
        articleAuthor
        createdAt
        commentCount
      }
    }
  }
`;
// Query to get a single article by ID
export const QUERY_PROFILE_ARTICLE = gql`
    query profileArticle($articleId: ID!) {
        article(articleId: $articleId) {
            _id
            title
            image
            createdAt
            articleAuthor
            articleText
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