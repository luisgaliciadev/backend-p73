'use strict'

const express = require('express');
const dbModels = require('../models');
const Sequelize = require('sequelize');
const mdAuthenticattion = require('../middlewares/authenticated');
const funtions = require('../utils/funtions');

const app = express();

app.post('/session-stared', async (req, res, next ) => {
    const dataLanguage = funtions.languages(req.headers["x-localization"]);
    const sessionBuild = dbModels.session_stared.build(req.body);
    sessionBuild.save().then(
         sessionSaved => {
            return res.status(200).send({
                success: true,
                message: dataLanguage.saved,
                data: sessionSaved
            });
        }
    )
    .catch(
        error =>  {
            return res.status(500).send({
                success: false,
                message: dataLanguage.errorSaved,
                error: error
            });
        }
    );
});

app.get('/session-stared', async (req, res, next ) => {
    const dataLanguage = funtions.languages(req.headers["x-localization"]);
    const count = await dbModels.session_stared.count({});
    return res.status(200).send({
        success: true,
        message: 'Session stareds',
        data: count
    });
});

app.get('/promtp-blocked', async (req, res, next ) => {
    const dataLanguage = funtions.languages(req.headers["x-localization"]);
    const count = await dbModels.promtp.count({});
    return res.status(200).send({
        success: true,
        message: 'Promtp blockeds',
        data: count
    });
});

app.get('/registered-user', async (req, res, next ) => {
    const dataLanguage = funtions.languages(req.headers["x-localization"]);
    const count = await dbModels.profile.count({});
    return res.status(200).send({
        success: true,
        message: 'Registered users',
        data: count
    });
});

app.get('/metrics-home', async (req, res, next ) => {
    const dataLanguage = funtions.languages(req.headers["x-localization"]);
    let sessionStared = await dbModels.session_stared.count({});
    let promptBlocked = await dbModels.promtp.count({});
    let registeredUser = await dbModels.profile.count({});

    if (sessionStared < 1654) sessionStared = 1654 + sessionStared        
    if (promptBlocked < 199) promptBlocked = 199 + promptBlocked        
    if (registeredUser < 1190) registeredUser = 1190 + registeredUser  
    

    return res.status(200).send({
        success: true,
        message: 'Metrics Home',
        data: {
            sessionStared,
            promptBlocked,
            registeredUser,
            gallerysReserved: 34
        }
    });
});

module.exports = app;

