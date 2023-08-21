import React from 'react';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { QUERY_SINGLE_ARTICLE } from '../utils/queries';

const SingleArticle = () => {
    const { articleId } = useParams();

    const { loading, data } = useQuery(QUERY_SINGLE_ARTICLE, {
        variables: { articleId: articleId },
    });
    const article = data?.article || {};
    if (loading) {
        return <div>Loading...</div>;
    }
    return (
        <div>
            <h1>{article.title}</h1>
            <h5>Author: {article.articleAuthor}</h5>
            <h3>{article.createdAt}</h3>
            <img src={article.image} alt="place photo here" />
            <p>{article.articleText}</p>
            <p>{article.comments}</p>
        </div>
    );
}

export default SingleArticle;