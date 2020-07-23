import React from 'react';

export default ({ comments }) => {
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