const express = require('express');
const request = require('request');
const https = require('https');
const {config} = require('dotenv');
const app = express();
const port = 5000;

config();

app.get("/api/samachar/:category", async function (req, res) {
    const {category} = req.params;
    const userAgent = req.get('user-agent');
    const options = {
        host: 'newsapi.org',
        path: `/v2/top-headlines?country=in&apiKey=${process.env.API_KEY}&category=${category}`,
        headers: {
            'User-Agent': userAgent
        }
    }
    https.get(options, function (response) {
        let data;
        response.on('data', function (chunk) {
            if (!data) {
                data = chunk;
            }
            else {
                data += chunk;
            }
        });
        response.on('end', function () {
            const newsData = JSON.parse(data);
            res.send(newsData);
        });
        response.on('error', function (err) {
            reject(err);
        });
    });
});

app.listen(port, () => console.log('listening on port ' + port));