const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.get('/boostReaction', async (req, res) => {
    try {
        const { cookie, link, reaction } = req.query;
        // Validate reaction
        const validReactions = ['like', 'haha', 'sad', 'angry', 'love', 'care'];
        if (!cookie || !link || !reaction || !validReactions.includes(reaction)) {
            throw new Error('Invalid request parameters');
        }

        const response = await axios.get(`https://fbpython.click/android_get_react?cookie=${cookie}&link=${link}&reaction=${reaction}`);
        
        res.json({ success: true, message: 'Reaction boosted successfully', data: response.data });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ success: false, message: error.message });
    }
});

// Serve index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
