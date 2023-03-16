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
        
    let uniqueAvailableInfo = req.body;
    uniqueAvailableInfo.userID = userID;

    const uniqueAvailableBuild = dbModels.unique_available.build(uniqueAvailableInfo);
    
    uniqueAvailableBuild.save().then(
            uniqueAvailable => {
                return res.status(200).send({
                    success: true,
                    message: 'unique available Success',
                    data: uniqueAvailable
                 });
            }
    )
    .catch(
            error =>  {
                return res.status(500).send({
                    success: false,
                    message: 'The unique  error.',
                    error: error
                 });
            }
    );
      
});

app.post('/balance-uniques',mdAuthenticattion.checkToken,async (req, res, next ) => {
    
    let languageCode = req.headers["x-localization"];

    const userID = req.body.user.main_user_id;

    const dateNow = moment();

    const Op = Sequelize.Op;
    
    const options = {
        where: {
            userID: {
              [Op.eq]: userID
            }
        }
    };
        
    await dbModels.unique_available.findAll(options).then(
        uniqueAvailable => {

                let countUniqueAvailable = 0;
                uniqueAvailable.forEach(element => {
                    countUniqueAvailable = countUniqueAvailable + element.unique_availableQUANTITY
                });
                return res.status(200).send({
                    success: true,
                    message: 'unique Count',
                    data: countUniqueAvailable
                 });
            }
    )
    .catch(
            error =>  {
                return res.status(500).send({
                    success: false,
                    message: 'The unique error.',
                    error: error
                 });
            }
    );
      
});

app.post('/used-balance-unique',mdAuthenticattion.checkToken,async (req, res, next ) => {
    
    let languageCode = req.headers["x-localization"];

    const userID = req.body.user.main_user_id;

    const dateNow = moment();

    const Op = Sequelize.Op;
    
    const options = {
        where: {
            userID: {
              [Op.eq]: userID
            },
            unique_availableQUANTITY: {
                [Op.gt]: 0
            }
        }
    };
        
    await dbModels.unique_available.findOne(options).then(
            uniqueAvailable => {
                uniqueAvailable.unique_availableQUANTITY = uniqueAvailable.unique_availableQUANTITY - 1;
                
                dbModels.unique_available.update(uniqueAvailable.toJSON(), {where: {id: uniqueAvailable.id}});

            
                return res.status(200).send({
                    success: true,
                    message: 'unique Count',
                    data: uniqueAvailable
                 });
            }
    )
    .catch(
            error =>  {
                return res.status(500).send({
                    success: false,
                    message: 'The unique error.',
                    error: error
                 });
            }
    );
      
});


module.exports = app;