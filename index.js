const express = require('express');
const request = require('request');
const https = require('https');
const {config} = require('dotenv');
const app = express();
const port = 5000;

config();

app.get("/general", async function (req, res) {
    const userAgent = req.get('user-agent');
    const options = {
    host: 'newsapi.org',
    path: `/v2/top-headlines?country=in&apiKey=${process.env.API_KEY}&category=general`,
        headers: {
        'User-Agent': userAgent
        }
    }
    solve(options,res);
});

app.get("/entertainment", async function (req, res) {
    const userAgent = req.get('user-agent');
    const options = {
    host: 'newsapi.org',
    path: `/v2/top-headlines?country=in&apiKey=${process.env.API_KEY}&category=entertainment`,
        headers: {
        'User-Agent': userAgent
        }
    }
    solve(options,res);
});

app.get("/science", async function (req, res) {
    const userAgent = req.get('user-agent');
    const options = {
        host: 'newsapi.org',
        path: `/v2/top-headlines?country=in&apiKey=${process.env.API_KEY}&category=science`,
        headers: {
            'User-Agent': userAgent
        }
    }
    solve(options,res);
});

app.get("/health", async function (req, res) {
    const userAgent = req.get('user-agent');
    const options = {
    host: 'newsapi.org',
    path: `/v2/top-headlines?country=in&apiKey=${process.env.API_KEY}&category=health`,
    headers: {
        'User-Agent': userAgent
    }
    }
    solve(options,res);

})

app.get("/sports", async function (req, res) {
    const userAgent = req.get('user-agent');
    const options = {
    host: 'newsapi.org',
    path: `/v2/top-headlines?country=in&apiKey=${process.env.API_KEY}&category=sports`,
    headers: {
        'User-Agent': userAgent
    }
    }
    solve(options,res);

})

app.get("/business", async function (req, res) {
    const userAgent = req.get('user-agent');
    const options = {
    host: 'newsapi.org',
    path: `/v2/top-headlines?country=in&apiKey=${process.env.API_KEY}&category=business`,
    headers: {
        'User-Agent': userAgent
    }
    }
    solve(options,res);
});

app.get("/technology", async function (req, res) {
    const userAgent = req.get('user-agent');
    const options = {
    host: 'newsapi.org',
    path: `/v2/top-headlines?country=in&apiKey=${process.env.API_KEY}&category=technology`,
    headers: {
        'User-Agent': userAgent
    }
    }
    solve(options,res);
});

function solve(options,res) {
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
};

app.listen(port, () => console.log('listening on port ' + port));