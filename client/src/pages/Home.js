import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_ARTICLES } from '../utils/queries';
import { Link } from 'react-router-dom';


const Home = () => {
    const { loading, data } = useQuery(QUERY_ARTICLES);
    const articles = data?.articles || [];
    
    return (
        <main>
            <h1>Latest News</h1>
            {loading ? (
                <div>Loading...</div>
            ) : (
              articles.map((article) => (  
                <div className="card m-3">
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
                </div>))
                )
            }


        </main>
    )
}

export default Home;