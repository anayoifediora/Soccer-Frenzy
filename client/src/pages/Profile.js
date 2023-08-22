import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLazyQuery } from '@apollo/client';
import { QUERY_MY_ARTICLES } from '../utils/queries';

import ArticleForm from '../components/ArticleForm';

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
        <div className="container">
        <ArticleForm/>
            <div className="row">
                <div className="col-12">
                    <h1 className="page-header">My Articles</h1>
                </div>
                {loading ? (
                    <div>Loading...</div>
                ) : (
                    <div className="col-12">
                        {articles.map((article) => (
                            <div key={article._id} className="card mb-3">
                                <h4 className="card-header bg-dark text-light p-2 m-0">
                                    <Link
                                        className="text-light"
                                        to={`/articles/${article._id}`}
                                    >
                                        {article.title}
                                    </Link>{' '}
                                    <br />
                                    <span style={{ fontSize: '1rem' }}>
                                        authored by {article.articleAuthor}
                                    </span>
                                </h4>
                                <div className="card-body bg-light p-2">
                                    <Link to={`/articles/${article._id}`}>
                                        <p>{article.articleText}</p>
                                        <p className="mb-0">
                                            Comments: {article.commentCount}
                                        </p>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Profile;