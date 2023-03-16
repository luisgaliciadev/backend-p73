'use strict'

const express = require('express');
const dbModels = require('../models');
const Sequelize = require('sequelize');
const mdAuthenticattion = require('../middlewares/authenticated');
const funtions = require('../utils/funtions');
const Op = Sequelize.Op;

const app = express();

app.post('/create', mdAuthenticattion.checkToken, async (req, res, next ) => {
    const dataLanguage = funtions.languages(req.headers["x-localization"]);

    const info = req.body;

        const transaction = dbModels.transaction.build(info);
    
        transaction.save().then(
            transactionSaved=> {
                return res.status(200).send({
                    success: true,
                    message: dataLanguage.saved,
                    data: transactionSaved
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


app.get('/my-list/:userID', mdAuthenticattion.checkToken, async (req, res, next ) => {
    const dataLanguage = funtions.languages(req.headers["x-localization"]);

    const userID = req.params.userID;

    const options = {
        where: {
            userID: {
                [Op.eq]:userID
            },
        },
        order: [['id', 'DESC']]
    };
    
    await dbModels.transaction.findAll(options).then(
        transactions=> {
                return res.status(200).send({
                    success: true,
                    message: dataLanguage.saved,
                    data: transactions 
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

app.get('/list-of-profile/:profileID', mdAuthenticattion.checkToken, async (req, res, next ) => {
    const dataLanguage = funtions.languages(req.headers["x-localization"]);

    const profileID = req.params.profileID;

    const options = {
        where: {
            id: profileID,
        },
        include: [{ model: dbModels.profile_observation,
            include: [{ model: dbModels.profile}]}]
    };
    
    await dbModels.profile.findAll(options).then(
            profiles=> {
                return res.status(200).send({
                    success: true,
                    message: dataLanguage.saved,
                    data: profiles 
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




module.exports = app;

