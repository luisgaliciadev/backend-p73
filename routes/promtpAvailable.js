'use strict'

const express = require('express');
const dbModels = require('../models');
const Sequelize = require('sequelize');
const moment = require('moment');
const mdAuthenticattion = require('../middlewares/authenticated');
const app = express();


app.post('/add',mdAuthenticattion.checkToken,async (req, res, next ) => {
    
    let languageCode = req.headers["x-localization"];

    const userID = req.body.user.main_user_id;
        
    let promtpAvailableInfo = req.body;
    promtpAvailableInfo.userID = userID;
    let dateNow = moment();
    promtpAvailableInfo.promtp_availableUNTIL = dateNow.add(90, 'days').calendar(); 
    const promtpAvailableBuild = dbModels.promtp_available.build(promtpAvailableInfo);
    promtpAvailableBuild.save().then(
            promtpAvailable => {
                return res.status(200).send({
                    success: true,
                    message: 'promtp plan Success',
                    data: promtpAvailable
                 });
            }
    )
    .catch(
            error =>  {
                return res.status(500).send({
                    success: false,
                    message: 'The promtp error.',
                    error: error
                 });
            }
    );
      
});

app.post('/balance-promtp',mdAuthenticattion.checkToken,async (req, res, next ) => {
    
    let languageCode = req.headers["x-localization"];

    const userID = req.body.user.main_user_id;

    const dateNow = moment();

    const Op = Sequelize.Op;
    
    const options = {
        where: {
            userID: {
              [Op.eq]: userID
            },
            promtp_availableUNTIL: {
                [Op.gte]: dateNow
              }
        }
    };
        
    await dbModels.promtp_available.findAll(options).then(
            promtpAvailable => {

                let countPromtpAvailable = 0;
                promtpAvailable.forEach(element => {
                    countPromtpAvailable = countPromtpAvailable + element.promtp_availableQUANTITY
                });
                return res.status(200).send({
                    success: true,
                    message: 'promtp Count',
                    data: countPromtpAvailable
                 });
            }
    )
    .catch(
            error =>  {
                return res.status(500).send({
                    success: false,
                    message: 'The promtp error.',
                    error: error
                 });
            }
    );
      
});

app.post('/used-balance-promtp',mdAuthenticattion.checkToken,async (req, res, next ) => {
    
    let languageCode = req.headers["x-localization"];

    const userID = req.body.user.main_user_id;

    const dateNow = moment();

    const Op = Sequelize.Op;
    
    const options = {
        where: {
            userID: {
              [Op.eq]: userID
            },
            promtp_availableUNTIL: {
                [Op.gte]: dateNow
            },
            promtp_availableQUANTITY: {
                [Op.gt]: 0
            }
        }
    };
        
    await dbModels.promtp_available.findOne(options).then(
            promtpAvailable => {
                
                promtpAvailable.promtp_availableQUANTITY = promtpAvailable.promtp_availableQUANTITY - 1;
                const promtpAvailableInfo = promtpAvailable;
                dbModels.promtp_available.update(promtpAvailable.toJSON(), {where: {id: promtpAvailable.id}});
                let promtpUsed = {};
                promtpUsed.promtp_usedQUANTITY = 1;
                promtpUsed.promtp_availableID = promtpAvailableInfo.id;
                const promtpUsedBuild = dbModels.promtp_used.build(promtpUsed);
                
                promtpUsedBuild.save();

                return res.status(200).send({
                    success: true,
                    message: 'promtp Count',
                    data: promtpUsed
                 });
            }
    )
    .catch(
            error =>  {
                return res.status(500).send({
                    success: false,
                    message: 'The promtp error.',
                    error: error
                 });
            }
    );
      
});


module.exports = app;