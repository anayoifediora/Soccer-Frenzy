import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLazyQuery } from '@apollo/client';
import { QUERY_MY_ARTICLES } from '../utils/queries';

import ArticleForm from '../components/ArticleForm';
import Auth from '../utils/auth';

const Profile = () => {
    const [getArticles, { loading, data }] = useLazyQuery(QUERY_MY_ARTICLES);
    const [articles, setArticles] = useState([]);
    console.log(articles);

    useEffect( async () => {
        await getArticles();
        console.log("message:", data);
    }, []);

    useEffect(() => {
        console.log("fetchedData",data);
        setArticles(data?.articles || []);
    }, [data]);
    return (
        <div>
            {Auth.loggedIn() ? (
            <>
                <ArticleForm/>
                <h2>My Articles</h2>
                    
                    {loading ? (
                        <div>Loading...</div>
                    ) : (
                        
                            articles.map((article, index) => (
                                <div key={index} className="card m-3">
                                    <h5 className="card-header">By {article.articleAuthor} on {article.createdAt}</h5>
                                    <div className="card-body">
                                        <Link
                                            style={{ textDecoration: 'none' }}
                                            to={`/articles/${article._id}`}
                                        >
                                        <h5 className="card-title">{article.title}</h5>
                                        </Link>
                                        <img className= "img-thumbnail img-fluid m-2"src={article.image} alt="..." />
                                        <p className="card-text"> Comments: {article.commentCount}</p>
                                        <i className="bi bi-chat-left" style={{fontSize: '2rem'}}></i>
                                    </div>
                                </div>
                            ))
                    
                    )}
            </>
            ) : (
                <h4>Kindly log in to view this page 😊</h4>
            )}
            
        </div>
    );
}

export default Profile;