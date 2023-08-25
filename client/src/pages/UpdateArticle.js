import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";


import { UPDATE_ARTICLE } from "../utils/mutations";

import Auth from "../utils/auth";

const UpdateForm = () => {
    const { articleId } = useParams();
    console.log(articleId);

    const [article, setArticle] = useState({
        articleId: articleId,
        articleText: "",
    });
    
        
    const [userProfile, setUserProfile] = useState(null);
    useEffect(() => {
        const profile = Auth.getProfile().data;
        setUserProfile(profile);
    }, []);

    const [updateArticle] = useMutation(UPDATE_ARTICLE);


    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
            const { data } = await updateArticle({
                variables: { ...article },
            });
            
            setArticle({ articleText: "" });
        } catch (err) {
            console.error(err);
        }
        window.location.assign("/profile");
    };

   
    
    return (
        <main className="flex-row justify-center mb-4">
            <div className="col-12 col-lg-10" id="article-form">
                <div className="card">
                    <h4 className="card-header p-2" style={{backgroundColor: "var(--marian-blue)", color: "var(--light-cyan)"}}>Share your article</h4>
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
                                    
                                        name="title"
                                        >
                                        </input>
                                    </div>
                                    <div className="mb-3">
                                        <textarea
                                            className="form-input"
                                            name="name"
                                            placeholder="Write your article here..."
                                            value={article.articleText}
                                            onChange={e => setArticle({...article, articleText: e.target.value})}
                                            
                                            
                                        ></textarea>
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

export default UpdateForm;
