const express = require("express");
const bodyParser = require("body-parser");
const { randomBytes } = require('crypto');
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};
app.get("/post", (req, res) => {
    res.send(posts);
})

app.post("/post", async (req, res) => {
    const id = randomBytes(4).toString('hex');
    const { title } = req.body;

    posts[id] = { id, title };

    // Firing an event to event bus 
    await axios.post("http://localhost:4005/events", {
        type: "PostCreated",
        data: { id, title }
    })

    res.status(201).send(posts[id]);
});

app.post('/events', (req, res) => {
    console.log('Event Receieved :', req.body.type);

    res.send({});
})

app.listen(4000, () => {
    console.log("Post service running at 4000");
})