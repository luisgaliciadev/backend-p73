'use strict'

const express = require('express');
const dbModels = require('../models');
const Sequelize = require('sequelize');
const moment = require('moment');
const mdAuthenticattion = require('../middlewares/authenticated');
const funtions = require('../utils/funtions');

const app = express();

app.post('/create', async (req, res, next ) => {
    const dataLanguage = funtions.languages(req.headers["x-localization"]);
    
    const registerExecution = dbModels.register_execution.build(req.body);
    registerExecution.save().then(
        registerExecutionSaved => {
            return res.status(200).send({
                success: true,
                message: dataLanguage.saved,
                data: registerExecutionSaved 
            });
        }
    )
    .catch(
        error =>  {
            console.log(error)
            return res.status(500).send({
                success: false,
                message: dataLanguage.errorSaved,
                error: error
            });
        }
    );
});

module.exports = app;
