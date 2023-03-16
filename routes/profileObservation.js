'use strict'

const express = require('express');
const dbModels = require('../models');
const Sequelize = require('sequelize');
const mdAuthenticattion = require('../middlewares/authenticated');
const funtions = require('../utils/funtions');
const Op = Sequelize.Op;

const app = express();

app.post('/change', mdAuthenticattion.checkToken, async (req, res, next ) => {
    const dataLanguage = funtions.languages(req.headers["x-localization"]);

    const userID = req.body.userID;

    const profileID = req.body.profileID;

    
    let profileObservation = await dbModels.profile_observation.findOne({where: {userID: userID, profileID: profileID}});

    if(! profileObservation){

    
    let profile_observations = await dbModels.profile_observation.findAndCountAll({where: {userID: userID}});

    const countObservations = profile_observations.count;
    
    if(countObservations >= 5){
        return res.status(200).send({
            success: false,
            message: "A reaching the limit of profiles under observation",
        });
    }


        let profileObservationInfo = {};
        profileObservationInfo.userID = userID;
        profileObservationInfo.profileID = profileID;
        profileObservationInfo.profile_observationSTATUS = true;

        const profileObservationBuild = dbModels.profile_observation.build(profileObservationInfo);
    
        profileObservationBuild.save().then(
            profileObservationSaved=> {
                return res.status(200).send({
                    success: true,
                    message: dataLanguage.saved,
                    data: profileObservationSaved 
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
           if(profileObservation.profile_observationSTATUS == true){
            profileObservation.profile_observationSTATUS = false;
           } 
           else{
            profileObservation.profile_observationSTATUS = true;
           }

           dbModels.profile_observation.update(profileObservation.toJSON(), {where: {id: profileObservation.id}}).then(
            profileSaved => {
                return res.status(200).send({
                    success: true,
                    message: dataLanguage.saved,
                    data: profileObservation
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

app.get('/my-list/:userID', mdAuthenticattion.checkToken, async (req, res, next ) => {
    const dataLanguage = funtions.languages(req.headers["x-localization"]);

    const userID = req.params.userID;

    const options = {
        where: {
            userID: {
                [Op.eq]:userID
            },
            profile_observationSTATUS: {
                [Op.eq]:true
            }
        },
        include: [{ model: dbModels.profile}]
    };
    
    await dbModels.profile_observation.findAll(options).then(
            profileObservationSaved=> {
                return res.status(200).send({
                    success: true,
                    message: dataLanguage.saved,
                    data: profileObservationSaved 
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

