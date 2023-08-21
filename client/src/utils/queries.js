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
