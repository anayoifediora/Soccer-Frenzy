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
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
            setArticle({...article, [name]: value});
        
    }
    
    return (
        <div>
            <h3>Post your article!</h3>

            {Auth.loggedIn() && userProfile ? (
                <>
                    <p>
                        Posting as: {userProfile.username}
                    </p>
                    <form onSubmit={handleFormSubmit}>
                        <div>
                            <input
                            className=""
                            value={article.title}
                            name="title"
                            onChange={handleChange}>
                            </input>
                            <textarea
                                name="articleText"
                                placeholder="Here's a new article..."
                                value={article.articleText}
                                onChange={handleChange}
                            ></textarea>
                        </div>

                        <div>
                            <button type="submit">
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
    );
};

export default ArticleForm;
