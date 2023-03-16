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

    const profileID = req.body.profileID;

    let profileLike = await dbModels.profile_like.findOne({where: {userID: userID, profileID: profileID}});
    
    if(! profileLike){

        const profileLikeInfo = {};
        profileLikeInfo.userID = userID;
        profileLikeInfo.profileID = profileID;
        profileLikeInfo.profile_likeSTATUS = true;

        const profileLikeBuild = dbModels.profile_like.build(profileLikeInfo);
    
        profileLikeBuild.save().then(
            profileLikeSaved=> {
                return res.status(200).send({
                    success: true,
                    message: dataLanguage.saved,
                    data: profileLikeSaved 
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
           if(profileLike.profile_likeSTATUS == true){
              profileLike.profile_likeSTATUS = false;
           } 
           else{
            profileLike.profile_likeSTATUS = true;
           }

           dbModels.profile_like.update(profileLike.toJSON(), {where: {id: profileLike.id}}).then(
            profileSaved => {
                return res.status(200).send({
                    success: true,
                    message: dataLanguage.saved,
                    data: profileLike 
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



module.exports = app;

