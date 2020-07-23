import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CommentCreate from './CommentCreate';
import CommentsList from './CommentsList';

export default () => {
    const [posts, setPosts] = useState({});

    const fetchPosts = async () => {
        const resp = await axios.get("http://localhost:4000/post");
        if (resp) {
            setPosts(resp.data);
        }
    }
    console.log(posts);

    useEffect(() => {
        fetchPosts();
    }, []);

    const renderedList = Object.values(posts).map(p => {
        return (
            <div className="card"
                style={{ width: '30%', marginBottom: '5px' }}
                key={p.id}
            >
                <div className="card-body">
                    <h3>{p.title}</h3>
                    <CommentsList postId={p.id} />
                    <hr />
                    <CommentCreate postId={p.id} />
                </div>
            </div>);
    })

    return (
        <>
            <h1>List of Posts</h1>
            <div className="d-flex flex-row flex-wrap justify-content-between">
                {renderedList}
            </div>
        </>
    )
}