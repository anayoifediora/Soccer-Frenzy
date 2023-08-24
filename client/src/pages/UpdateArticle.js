import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

import { UPDATE_ARTICLE } from "../utils/mutations";

import Auth from "../utils/auth";

// q: What's wrong with the whole code below?
// a: The code below is not working because the articleId is not being passed to the updateArticle mutation.
//    The articleId is being passed to the UpdateForm component via the useParams hook, but it is not being
//    passed to the updateArticle mutation. The articleId is needed to update the article in the database.
// q: How can you fix it?
// a: I fixed it by passing the articleId to the updateArticle mutation.

const UpdateForm = () => {
    const { articleId } = useParams();
    console.log(articleId);
    
    const [article, setArticle] = useState({ articleText: "", title: "" } );
    const [userProfile, setUserProfile] = useState(null);
    useEffect(() => {
        const profile = Auth.getProfile().data;
        setUserProfile(profile);
    }, []);

    const [updateArticle, { error }] = useMutation(UPDATE_ARTICLE);

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            const { data } = await updateArticle({
                variables: { articleId: articleId, articleText: article.articleText },
            });
            console.log(data);
            setArticle({ articleText: "", title: "" });
        } catch (err) {
            console.error(err);
        }
        window.location.reload("/profile");
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
            setArticle({...article, [name]: value});
        
    }
    
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
