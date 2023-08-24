import { gql } from '@apollo/client';

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

export const QUERY_SINGLE_ARTICLE = gql`
    query singleArticle($articleId: ID!) {
        article(articleId: $articleId) {
            _id
            title
            image
            createdAt
            articleAuthor
            articleText
            comments {
                _id
                commentText
                commentAuthor
                createdAt
            }
        }
    }
`;
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
export const QUERY_PROFILE_ARTICLE = gql`
    query profileArticle($articleId: ID!) {
        article(articleId: $articleId) {
            _id
            title
            image
            createdAt
            articleAuthor
            articleText
            comments {
                _id
                commentText
                commentAuthor
                createdAt
            }
        }
    }
`;