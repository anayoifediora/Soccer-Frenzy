import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLazyQuery, useQuery } from '@apollo/client';

import { QUERY_MY_ARTICLES } from '../utils/queries';
import { REMOVE_ARTICLE } from '../utils/mutations';
import { useMutation } from '@apollo/client';

import ArticleForm from '../components/ArticleForm';
import Auth from '../utils/auth';

const Profile = () => {
    // const [getArticles, { loading, data }] = useLazyQuery(QUERY_MY_ARTICLES);
    // const [articles, setArticles] = useState([]);
    // console.log(articles);

    const { loading, data } = useQuery(QUERY_MY_ARTICLES);
    const articles = data?.articles || [];
    console.log(articles);

    // useEffect(() => {
    //      getArticles();
    //     console.log("message:", data);
    // }, []);

    const [removeArticle, { error }] = useMutation(REMOVE_ARTICLE);

    const handleDeleteArticle = async (articleId) => {

        // const token = Auth.loggedIn() ? Auth.getToken() : null;
        // if (!token) {
        //     return false;
        // }
        try {
            const { data } = await removeArticle({
                variables: { articleId: articleId },
            });
            console.log(data);
        
        } catch (err) {
            console.error(err);
        }
        window.location.reload();
    };
    // useEffect(() => {
    //     console.log("fetchedData",data);
    //     setArticles(data?.articles || []);
    // }, [data]);

    return (
        <div>
            {Auth.loggedIn() ? (
            <>
                <ArticleForm/>
                <h2>My Articles</h2>
                    
                    {loading ? (
                        <div>Loading...</div>
                    ) : (                      
                            articles.map((article) => (
                                <div key={article._id} className="card m-3">
                                    <h5 className="card-header">By {article.articleAuthor} on {article.createdAt}</h5>
                                    <div className="card-body">
                                        <Link
                                            style={{ textDecoration: 'none' }}
                                            to={`/profile/${article._id}`}
                                        >
                                        <h5 className="card-title">{article.title}</h5>
                                        </Link>
                                        <img className= "img-thumbnail img-fluid m-2"src={article.image} alt="..." />
                                        <p className="card-text"> Comments: {article.commentCount}</p>
                                        <button onClick={() => handleDeleteArticle(article._id)} className="btn btn-primary"style= {{fontSize: '1.5rem', width: "20%"}}>Delete
                                        <i className="bi bi-trash"  style={{fontSize: '1.5rem'}}></i>
                                        </button>
                                    </div>
                                </div>
                            ))

                        )
                    }
            </>
            ) : (
                <h4>Kindly log in to view this page 😊</h4>
            )}
            
        </div>
    );
}

export default Profile;