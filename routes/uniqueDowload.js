'use strict'

const express = require('express');
const dbModels = require('../models');
const Sequelize = require('sequelize');
const mdAuthenticattion = require('../middlewares/authenticated');
const funtions = require('../utils/funtions');

const app = express();

app.post('/register', mdAuthenticattion.checkToken, async (req, res, next ) => {
    const dataLanguage = funtions.languages(req.headers["x-localization"]);

    const userID = req.body.userID;

    const uniqueID = req.body.uniqueID;

    let unique = await dbModels.unique.findByPk(uniqueID);

        let uniqueDownloadInfo = {};
        uniqueDownloadInfo.userID = userID;
        uniqueDownloadInfo.uniqueID = uniqueID;
        uniqueDownloadInfo.unique_downloadPRICE = unique.uniquePRICEDOWNLOAD;

        const uniqueDownloadBuild = dbModels.unique_download.build(uniqueDownloadInfo);
    
        uniqueDownloadBuild.save().then(
            uniqueDownloadSaved=> {
                return res.status(200).send({
                    success: true,
                    message: dataLanguage.saved,
                    data: uniqueDownloadSaved 
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

app.post('/get-count', async (req, res, next ) => {
    const dataLanguage = funtions.languages(req.headers["x-localization"]);


    const uniqueID = req.body.uniqueID;

    await dbModels.unique_download.findAndCountAll({where: {uniqueID: uniqueID}}).then(
            uniqueDownloadSaved=> {
                return res.status(200).send({
                    success: true,
                    message: dataLanguage.saved,
                    data: uniqueDownloadSaved.count 
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

