import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { Link } from "react-router-dom";

import { ADD_ARTICLE } from "../../utils/mutations";

import Auth from "../../utils/auth";

const ArticleForm = () => {
    const [articleText, setText] = useState("");

    const [addArticle, { error }] = useMutation(ADD_ARTICLE);

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
            const { data } = await addArticle({
                variables: {
                    articleText,
                    articleAuthor: Auth.getProfile().data.username,
                },
            });

            setText("");
        } catch (err) {
            console.error(err);
        }
    }

    const handleChange = (event) => {
        const { name, value } = event.target;

        if (name === "articleText") {
            setText(value);
        }
    }

    return (
        <div>
            <h3>Post your article!</h3>

            {Auth.loggedIn() ? (
                <>
                    <p>
                        Posting as: {Auth.getProfile().data.username}
                    </p>
                    <form onSubmit={handleFormSubmit}>
                        <div>
                            <textarea
                                name="articleText"
                                placeholder="Here's a new article..."
                                value={articleText}
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
