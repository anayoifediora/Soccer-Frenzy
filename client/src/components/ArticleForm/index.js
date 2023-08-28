import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { Link } from "react-router-dom";

import { ADD_ARTICLE } from "../../utils/mutations";

import Auth from "../../utils/auth";

const ArticleForm = () => {
    
    const [article, setArticle] = useState({ articleText: "", title: "" } );
    const [userProfile, setUserProfile] = useState(null);
    useEffect(() => {
        const profile = Auth.getProfile().data;
        setUserProfile(profile);
    }, []);

    const [addArticle, { error }] = useMutation(ADD_ARTICLE);

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
            const { data, error } = await addArticle({
                variables: {
                    ...article,
                    articleAuthor: userProfile.username,
                },
            });
            console.log(data, error);
            setArticle({articleText: "", title: ""});
        } catch (err) {
            console.error(err);
        }
        
        window.location.reload("/profile");
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
            setArticle({...article, [name]: value});
        
    }
    
    return (
        <main className="flex-row justify-center mb-4">
            <div className="col-12 col-lg-10" id="article-form">
                <div className="card">
                    <h4 className="card-header p-2" style={{backgroundColor: "var(--marian-blue)", color: "var(--light-cyan)"}}>Post your article</h4>
                    <div className="card-body">
                        {Auth.loggedIn() && userProfile ? (
                            <>
                                <p>
                                    Posting as: {userProfile.username}
                                </p>
                                <form onSubmit={handleFormSubmit}>
                                    <div className="mb-3">
                                        <label htmlFor="title" className="form-label">Title:</label>
                                        <input
                                        className="form-input"
                                        value={article.title}
                                        name="title"
                                        onChange={handleChange}>
                                        </input>
                                    </div>
                                    <div className="mb-3">
                                        <textarea
                                            className="form-input"
                                            name="articleText"
                                            placeholder="Write your article here..."
                                            value={article.articleText}
                                            onChange={handleChange}
                                            style={{ height: "200px" }}
                                        ></textarea>
                                    </div>
                                    <div className="mb-3">
                                        <input type="file" />
                                        <button>Upload</button>
                                    </div>


                                    <div>
                                        <button className="btn btn-block btn-primary"
                                                style={{ cursor: 'pointer', 
                                                        fontSize: '1.2rem',
                                                        fontWeight: 'bold', 
                                                        color: "var(--light-cyan)", 
                                                        backgroundColor: "var(--marian-blue)" }}
                                                type="submit"
                                        >
                                        Submit
                                        </button>
                                    </div>
                                </form>
                            </>
                        ) : (
                            <p>
                                You need to be logged in to share your articles. Please{" "}
                                <Link to="/login">login</Link> or{" "}
                                <Link to="/signup">signup</Link>.
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
};

export default ArticleForm;
