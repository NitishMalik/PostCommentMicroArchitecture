import React from 'react';

export default ({ comments }) => {
    const renderComments = comments.map(comment => {
        let content;
        if (comment.status === 'approved') {
            content = comment.content;
        }
        if (comment.status === 'pending') {
            content = "Awaiting review..";
        }
        if (comment.status === 'rejected') {
            content = "Rejected while moderation"
        }
        return (
            <li key={comment.id}>{content}</li>
        )
    });

    return (
        <ul>
            {renderComments}
        </ul>
    )
}