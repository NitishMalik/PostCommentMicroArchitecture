const express = require("express");
const bodyParser = require("body-parser");
const { randomBytes } = require("crypto");
const cors = require("cors");
const axios = require("axios");

const app = express();

const commentsByPost = {};

app.use(bodyParser.json());
app.use(cors());

app.get("/posts/:id/comments", (req, res) => {
    res.send(commentsByPost[req.params.id] || []);
});

app.post("/posts/:id/comments", async (req, res) => {
    const commentId = randomBytes(4).toString('hex');
    const { content } = req.body;
    const { id: postId } = req.params;

    const comments = commentsByPost[postId] || [];
    comments.push({ id: commentId, content, status: 'pending' });

    commentsByPost[postId] = comments;

    //Firing an event to event bus
    await axios.post('http://localhost:4005/events', {
        type: 'CommentCreated',
        data: {
            id: commentId,
            content,
            postId: postId,
            status: 'pending'
        }
    })

    res.status(201).send(comments);
});

app.post('/events', async (req, res) => {
    console.log('Event Receieved :', req.body.type);
    const { type, data } = req.body;
    if (type == "CommentModerated") {
        console.log(data);
        const { postId, status, id, content } = data;
        const comments = commentsByPost[postId];
        console.log("moderations status", status);
        const comment = comments.find(c => c.id === id);
        comment.status = status;

        await axios.post('http://localhost:4005/events', {
            type: 'CommentUpdated',
            data: {
                id,
                content,
                postId,
                status
            }
        });
    }

    res.send({});
})

app.listen(4001, () => {
    console.log("Comment service is running at 4001");
})