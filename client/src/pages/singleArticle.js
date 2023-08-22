import React from 'react';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { QUERY_SINGLE_ARTICLE } from '../utils/queries';

import Auth from '../utils/auth';

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
            {Auth.loggedIn() ? (  
            <>
                <div>         
                    <h1>{article.title}</h1>
                    <h5>Author: {article.articleAuthor}</h5>
                    <h3>{article.createdAt}</h3>
                    <img src={article.image} alt="place photo here" />
                    <p className="articleText">{article.articleText}</p>
                    <p>{article.comments}</p>
                </div>
                <div>
                    <h3>Comments</h3>
                    <form>
                        <textarea
                            placeholder="Leave a comment here"
                            className="form-input col-12 col-md-9"
                        ></textarea>
                        <button className="btn btn-primary col-12 col-md-3" type="submit">
                            Submit
                        </button>
                    </form>
                </div>
            </>
                
            ) : (
                <h4>Kindly log in to view this article 😊</h4>
            )}
        </div>
    );
}

export default SingleArticle;