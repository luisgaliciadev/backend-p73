'use strict'

const express = require('express');
const dbModels = require('../models');
const Sequelize = require('sequelize');
const mdAuthenticattion = require('../middlewares/authenticated');
const funtions = require('../utils/funtions');

const app = express();

app.post('/change', mdAuthenticattion.checkToken, async (req, res, next ) => {
    const dataLanguage = funtions.languages(req.headers["x-localization"]);

    const userID = req.body.userID;

    let uniqueLike = await dbModels.unique_like.findOne({where: {userID: userID, uniqueID: req.body.uniqueID}});

    if(! uniqueLike){

        const uniqueLikeInfo = {};
        uniqueLikeInfo.userID = userID;
        uniqueLikeInfo.uniqueID = req.body.uniqueID;
        uniqueLikeInfo.unique_likeSTATUS = true;

        const uniqueLikeBuild = dbModels.unique_like.build(uniqueLikeInfo);
    
        uniqueLikeBuild.save().then(
            uniqueLikeSaved=> {
                return res.status(200).send({
                    success: true,
                    message: dataLanguage.saved,
                    data: uniqueLikeSaved 
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
           if(uniqueLike.unique_likeSTATUS == true){
              uniqueLike.unique_likeSTATUS = false;
           } 
           else{
            uniqueLike.unique_likeSTATUS = true;
           }

           dbModels.unique_like.update(uniqueLike.toJSON(), {where: {id: uniqueLike.id}}).then(
            profileSaved => {
                return res.status(200).send({
                    success: true,
                    message: dataLanguage.saved,
                    data: uniqueLike 
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

app.post('/my-list', mdAuthenticattion.checkToken, async (req, res, next ) => {
    const dataLanguage = funtions.languages(req.headers["x-localization"]);

    const userID = req.body.userID;

    const Op = Sequelize.Op;
    
    const options = {
        where: {
            userID: {
              [Op.eq]: userID
            },
            unique_likeSTATUS: {
                [Op.eq]: true
            }
        },
        include: [{ model: dbModels.unique}]
    };

    let uniqueLikes = await dbModels.unique_like.findAll(options);

    return res.status(200).send({
        success: true,
        message: dataLanguage.saved,
        data: uniqueLikes 
});
});

module.exports = app;

