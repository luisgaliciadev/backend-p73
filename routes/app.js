'use strict'

const express = require('express');
const fetch = require('node-fetch');


// Imports
const mdAuthenticattion = require('../middlewares/authenticated');
const funtions = require('../utils/funtions');

// sockets
const {io} = require('../app');
require('../sockets/socket');
// const clientsList = io.sockets;

const app = express();

// Test
app.get('/', (req, res, next ) => {
    return res.status(200).send({
       success: true,
       message: 'Server request successful.',
       data: {}
    })
});

app.get('/main', (req, res, next ) => {
    const language = req.headers["x-localization"];
    const dataLanguage = funtions.languages(req.headers["x-localization"]);
    res.status(200).send({
       success: true,
       message: dataLanguage.serverOnline,
       language
    });
});

app.get('/test/:test',  async (req, res, next ) => {
    try {
        const test = await funtions.testFuntion(req.params.test);
        return res.status(200).send({
            success: true,
            message: 'Test successful'
        });
    }
    catch (error) {
        return res.status(500).send({
            success: false,
            message: 'Test error'
        });
    }
});

app.get('/testApi/countries',  async (req, res, next ) => {
    const body = { };
    const headers = {
        'Content-Type': 'application/json'
    }
    fetch("https://api-alfa.youetix.com/api/v1/paises/habilitados",
        {
            method: 'GET',
            // body: JSON.stringify(body),
            headers
        })
        .then((response) => {
            return response.json();
        }).then((resApi) => { 
            return res.status(200).send({
                resApi
            });
        })
        .catch( error => {
            return res.status(500).send({
                success: false,
                error
            });
        });
});


app.get('/socket',  async (req, res, next ) => {
    const text = req.params.text;
    // io.emit('message-received', {'message-received': text});
    io.emit('testSocket', {testSocket: 'Test Socket Successfully'});
    res.status(200).send({
        success: true,
        message: 'Test Socket Successfully',
        data: true
     })
});



module.exports = app;