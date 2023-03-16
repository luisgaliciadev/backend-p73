'use strict'

const express = require('express');
const dbModels = require('../models');
const Sequelize = require('sequelize');
const mdAuthenticattion = require('../middlewares/authenticated');
const funtions = require('../utils/funtions');
const Op = Sequelize.Op;
const moment = require('moment');

const app = express();

app.post('/create', mdAuthenticattion.checkToken, async (req, res, next ) => {
    const dataLanguage = funtions.languages(req.headers["x-localization"]);

    let info = req.body;
   
    // if(info.algorithm_requestIMAGESTARTING){
    //     let fileIMG = info.algorithm_requestIMAGESTARTING;
    //     info.algorithm_requestIMAGESTARTING = funtions.uploadImg(fileIMG, 1);
    // }

    info.algorithm_requestPROMTPTEXT = info.algorithm_requestPROMTPTEXT.toLocaleUpperCase();

    let firstSpace = /^ /;
    let lastSpace = / $/;
    let manySpace = /[ ]+/g;
    
    info.algorithm_requestPROMTPTEXT = info.algorithm_requestPROMTPTEXT.replace (manySpace," ");
    info.algorithm_requestPROMTPTEXT = info.algorithm_requestPROMTPTEXT.replace (firstSpace,"");
    info.algorithm_requestPROMTPTEXT = info.algorithm_requestPROMTPTEXT.replace (lastSpace,"");


    
    const algorithmRequest = dbModels.algorithm_request.build(info);
        algorithmRequest.save().then(
            algorithmRequestSaved=> {
                return res.status(200).send({
                    success: true,
                    message: dataLanguage.saved,
                    data: algorithmRequest
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

app.post('/get-list', async (req, res, next ) => {
    const dataLanguage = funtions.languages(req.headers["x-localization"]);

    let status = req.body.status;
   
    if(status){
        await dbModels.algorithm_request.findAll({where: 
            {algorithm_requestSTATUS: status}, 
            include: [{model: dbModels.promtp},{model: dbModels.unique_art_movent},{ model: dbModels.unique_element},{ model: dbModels.unique_mood}, { model: dbModels.profile}, { model: dbModels.unique}]}).then(
            algorithmRequests=> {
                return res.status(200).send({
                    success: true,
                    message: dataLanguage.saved,
                    data: algorithmRequests
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

    }
    else{
        await dbModels.algorithm_request.findAll({include: [{model: dbModels.promtp},{model: dbModels.unique_art_movent},{ model: dbModels.unique_element},{ model: dbModels.unique_mood}, { model: dbModels.profile}]}).then(
            algorithmRequests=> {
                return res.status(200).send({
                    success: true,
                    message: dataLanguage.saved,
                    data: algorithmRequests
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
    }
});

app.post('/register-executed', async (req, res, next ) => {
    const dataLanguage = funtions.languages(req.headers["x-localization"]);

    let requestID = req.body.requestID;
    let uniqueID = req.body.uniqueID;

    let algorithmRequest = await dbModels.algorithm_request.findByPk(requestID);
    
    algorithmRequest.algorithm_requestSTATUS = "EXECUTED";
    algorithmRequest.uniqueID = uniqueID;
    algorithmRequest.algorithm_requestDATEEXECUTED = moment();

    
    dbModels.algorithm_request.update(algorithmRequest.toJSON(), {where: {id: requestID}}).then(
            algorithmRequestSaved=> {
                return res.status(200).send({
                    success: true,
                    message: dataLanguage.saved,
                    data: algorithmRequest
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

