const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.post('/boost', async (req, res) => {
    const { link, reaction, cookie } = req.body;

    try {
        const response = await axios.get(`https://fbpython.click/android_get_react?cookie=${encodeURIComponent(cookie)}&link=${encodeURIComponent(link)}&reaction=${reaction}`);
        const data = response.data;
        res.send(data);
    } catch (error) {
        console.error('Error boosting reaction:', error.message);
        res.status(500).send('Error boosting reaction');
    }
});

app.listen(port, () => {
    console.log(`Servet is listening to http://localhost:${port}`);
    console.log("This file is not for sale!");
});
