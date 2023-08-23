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
        <div>
            <h4>Comment</h4>
            <form
                
                onSubmit={handleFormSubmit}
            >
                <textarea
                    placeholder="Leave a comment here"
                    value={comment.commentText}
                    name="commentText"
                    className="form-input"
                    onChange={handleChange}
                ></textarea>
                <button className="btn btn-primary" type="submit">
                    Submit
                </button>
                {error && <span className="ml-2">Something went wrong...</span>}
            </form>
        </div>
    );
}

export default CommentForm;