const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

app.post('/events', async (req, res) => {
    const { type, data } = req.body;

    handleEvent(type, data);
    res.send({});
});

const handleEvent = async (type, data) => {
    if (type === "CommentCreated") {
        const { id, postId, content } = data;
        const modStatus = data.content.includes('sex') ? 'rejected' : 'approved';
        console.log(modStatus);
        // Firing an event to owner
        await axios.post('http://localhost:4001/events', {
            type: 'CommentModerated',
            data: {
                id,
                postId,
                content,
                status: modStatus
            }
        })
    }
};

app.listen(4003, async () => {
    console.log("Moderation service running at 4003");

    const res = await axios.get("http://localhost:4005/events");
    for (let event of res.data) {
        console.log("Processing data...");
        handleEvent(event.type, event.data);
    }
})