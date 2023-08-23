import React from 'react';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { QUERY_SINGLE_ARTICLE } from '../utils/queries';

import Auth from '../utils/auth';
import CommentForm from '../components/CommentForm';

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
        <div className="article-container">
            {Auth.loggedIn() ? (  
            <>
                <div className="single-article">         
                    <h1>{article.title}</h1>
                    <h5><em>Author: {article.articleAuthor}</em></h5>
                    <h3>{article.createdAt}</h3>
                    <img src={article.image} alt="place photo here" />
                    <p className="articleText">{article.articleText}</p>
                    <p>{article.comments}</p>
                </div>
                <CommentForm articleId={article._id} />
            </>
                
            ) : (
                <h4>Kindly log in to view this article 😊</h4>
            )}
        </div>
    );
}

export default SingleArticle;