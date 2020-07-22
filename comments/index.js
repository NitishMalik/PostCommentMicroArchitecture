const express = require("express");
const bodyParser = require("body-parser");
const { randomBytes } = require("crypto");

const app = express();

const commentsByPost = {};

app.use(bodyParser.json());

app.get("/posts/:id/comments", (req, res) => {
    res.send(commentsByPost[req.params.id] || []);
});

app.post("/posts/:id/comments", (req, res) => {
    const commentId = randomBytes(4).toString('hex');
    const { content } = req.body;
    const { id: postId } = req.params;

    const comments = commentsByPost[postId] || [];
    comments.push({ id: commentId, content });

    commentsByPost[postId] = comments;

    res.status(201).send(comments);
});

app.listen(4001, () => {
    console.log("Comment service is running at 4001");
})