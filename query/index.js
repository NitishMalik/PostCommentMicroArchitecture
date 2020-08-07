const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());
app.use(cors());

//Dummy datastructure
const posts = {}
app.post('/events', (req, res) => {
    // console.log("Inside query");
    const { type, data } = req.body;
    handleEvent(type, data);
    res.send({});
});

const handleEvent = (type, data) => {
    if (type === 'PostCreated') {
        const { id, title } = data;
        posts[id] = { id, title, comments: [] };
    }
    if (type === 'CommentCreated') {
        const { id, content, postId, status } = data;
        const post = posts[postId];
        post.comments.push({ id, content, status });
    }
    if (type === "CommentUpdated") {
        const { id, postId, status, content } = data;
        const comments = posts[postId].comments;
        const comment = comments.find(c => c.id === id);
        comment.status = status;
        comment.content = content;
    }
}

app.get('/posts', (req, res) => {
    res.send(posts);
});

app.listen(4002, async () => {
    console.log("Query Service is running at 4002");

    const res = await axios.get("http://localhost:4005/events");
    for (let event of res.data) {
        console.log("Processing data...");
        handleEvent(event.type, event.data);
    }
})