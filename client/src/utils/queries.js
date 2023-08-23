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
export const QUERY_MY_ARTICLES = gql`
    query articles($username: String) {
        articles(username: $username) {
        title
        image
        createdAt
        commentCount
        articleText
        articleAuthor
        }
    }
`;