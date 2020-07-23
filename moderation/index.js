const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

app.post('/events', async (req, res) => {
    const { type, data } = req.body;
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

    res.send({});
});

app.listen(4003, () => {
    console.log("Moderation service running at 4003");
})