import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default ({ postId }) => {
    const [comments, setComments] = useState([])

    const fetchComments = async () => {
        if (postId) {
            const resp = await axios(`http://localhost:4001/posts/${postId}/comments`);
            console.log(resp);
            if (resp.data) {
                setComments(resp.data)
            }
        }
    }

    useEffect(() => {
        fetchComments();
    }, [postId]);

    console.log(comments);

    const renderComments = comments.map(c => {
        return (
            <li key={c.id}>{c.content}</li>
        )
    });

    return (
        <ul>
            {renderComments}
        </ul>
    )
}