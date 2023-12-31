import React from 'react';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { QUERY_SINGLE_ARTICLE } from '../utils/queries';

import Auth from '../utils/auth';
import CommentForm from '../components/CommentForm';

// SingleArticle is a component that displays a single article and its comments
const SingleArticle = () => {
    const { articleId } = useParams();

    const { loading, data } = useQuery(QUERY_SINGLE_ARTICLE, {
        variables: { articleId: articleId },
    });
    const article = data?.article || {};
    if (loading) {
        return <div>Loading...</div>;
    }
    console.log(article);
    return (
        <div className="article-container border border-1">
            {Auth.loggedIn() ? (  
            <>
                <div className="single-article">         
                    <h1 style={{fontWeight: "bolder", color: "var(--marian-blue)"}}>{article.title}</h1>
                    <h5><em>Author: {article.articleAuthor}</em></h5>
                    <h3>{article.createdAt}</h3>
                    <img src={article.image}/>
                    <p className="articleText">{article.articleText}</p>
                </div>
                <div style={{backgroundColor: "rgb(245, 242, 242)"}}>
                    <div>
                        <h3 style ={{margin: "15px"}}>{article.commentCount} Comments</h3>
                    </div>
                    <div>
                        {article.comments.map((comment) => (
                            <div key={comment._id} className="card mb-3" style={{marginLeft: "15px"}}>
                                <p className="card-header" style= {{backgroundColor: "var(--marian-blue)", color: "white", fontWeight: "bold"}}>
                                    {comment.commentAuthor} commented{' '}
                                    <span style={{ fontSize: '1rem' }}>
                                        on {comment.createdAt}
                                    </span>
                                </p>
                                <div className="card-body">
                                    <p style={{fontSize: "20px"}}>{comment.commentText}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
                <CommentForm articleId={article._id} />
            </>
                
            ) : (
                <h4 className="error">Kindly log in to view this article 😊</h4>
            )}
        </div>
    );
}

export default SingleArticle;