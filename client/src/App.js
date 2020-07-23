import React from 'react';
import PostCreate from './Components/PostCreate';
import PostsList from './Components/PostsList';

export default App => {
    return (
        <div className="container">
            <h1>Create Post</h1>
            <PostCreate />
            <hr />

            <PostsList />
        </div>
    )
}