import React, { useEffect } from 'react';
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_COMMENT } from '../../utils/mutations';
import Auth from '../../utils/auth';

const CommentForm = ({ articleId }) => {
    const [comment, setComment] = useState({ commentText: '', commentAuthor: '' });
    const [userProfile, setUserProfile] = useState(null);


    useEffect(() => {
        const profile = Auth.getProfile().data;
        setUserProfile(profile);
    }, []);

    const [addComment, { error }] = useMutation(ADD_COMMENT);
    
    const handleChange = (event) => {
        const { name, value } = event.target;
        setComment({ ...comment, [name]: value });
        
    };

    const handleFormSubmit = async event => {
        event.preventDefault();
        try {
            const { data, error } = await addComment({
                variables: { 
                    ...comment, 
                    commentAuthor: userProfile.username,
                    articleId }
            });
            console.log(data, error);
            setComment({ commentText: '', commentAuthor: '' });

        } catch (e) {
            console.error(e);
        }
        window.location.reload(`/articles/${articleId}`);
    };
    return (
        <div style={{marginTop: "15px", marginBottom: "30px", borderStyle: "double", width: "50%"}}>
            <div style={{display: "flex"}}>
                <h4 style={{margin: "10px"}}>Comment</h4>
            </div>
            <form
                
                onSubmit={handleFormSubmit}
            >
                <textarea
                    placeholder="Leave a comment here"
                    value={comment.commentText}
                    name="commentText"
                    className="form-input"
                    style={{ height: '50px', margin: "10px", width: "95%" }}
                    onChange={handleChange}
                ></textarea>
                <button className="btn btn-primary" type="submit" style={{margin: "10px"}}>
                    Submit
                </button>
                {error && <span className="ml-2">Something went wrong...</span>}
            </form>
        </div>
    );
}

export default CommentForm;