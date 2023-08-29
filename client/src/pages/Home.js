import React, { useState, useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';
import { QUERY_ARTICLES } from '../utils/queries';
import { Link } from 'react-router-dom';

// This page is the home page. It uses the QUERY_ARTICLES query to get all articles.
const Home = () => {
    const [getArticles, { loading, data }] = useLazyQuery(QUERY_ARTICLES);
    const [articles, setArticles] = useState([]);
    

    useEffect( async () => {
        await getArticles();
        console.log("message:", data);
    }, []);

    useEffect(() => {
        console.log("fetchedData",data);
        setArticles(data?.articles || []);
    }, [data]);
    
    return (
        <main>
            <h1 style={{fontSize: "50px", fontWeight:"bolder", color: "var(--marian-blue)"}}>Latest News</h1>
            {loading ? (
                <div>Loading...</div>
            ) : (
              articles.map((article, index) => (  
                <div className="card m-3" key={index}>
                    <h5 className="card-header">By {article.articleAuthor} on {article.createdAt}</h5>
                    <div className="card-body">
                        <Link
                            style={{ textDecoration: 'none' }}
                            to={`/articles/${article._id}`}
                        >
                        <h5 className="card-title">{article.title}</h5>
                        </Link>
                        <img className= "img-thumbnail img-fluid m-2"src={article.image} alt="..." />
                        {/* <p className="card-text"> Comments: {article.commentCount}</p> */}
                        <i class="bi bi-chat" style={{fontSize:"2.0rem", fontWeight: "bolder"}}><span style={{marginLeft:"5px"}}>{article.commentCount}</span></i>
                        
                    </div>
                </div>))
                )
            }


        </main>
    )
}

export default Home;