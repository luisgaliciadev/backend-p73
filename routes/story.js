'use strict'

const express = require('express');
const dbModels = require('../models');
const Sequelize = require('sequelize');
const mdAuthenticattion = require('../middlewares/authenticated');
const funtions = require('../utils/funtions');
const moment = require('moment');

const app = express();

app.post('/create',mdAuthenticattion.checkToken,async (req, res, next ) => {
    const dataLanguage = funtions.languages(req.headers["x-localization"]);
    const storyInfo = req.body;
    const day = moment().add(24, 'hours');
    const dateExp = day.format('MM/DD/YYYY hh:mm');
    storyInfo.dateExp = dateExp;
    storyInfo.linkTEXT = storyInfo.linkTEXT.toLowerCase();
    storyInfo.link = storyInfo.link.toLowerCase();
    const storyBuild = dbModels.story.build(storyInfo);
    storyBuild.save().then(
        storySaved => {
            return res.status(200).send({
                success: true,
                message: dataLanguage.saved,
                data: storySaved
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

app.get('/stories/:page',mdAuthenticattion.checkToken, async (req, res, next ) => {
    const Op = Sequelize.Op;
    const dateNow = moment();
    const options = {
        where: {
            dateExp: {
                [Op.gt]: dateNow
            }
        },
        order: [['id', 'DESC']],
        // limit: 10,
        // offset:  parseInt(req.params.page),
        include: [{ model: dbModels.profile}]
    };
    let profiles = [];
    let userStories = [];
    let stories = [];
    let i = 0;
    dbModels.story.findAll(options).then(
        storys => {
            storys.map( story => {
                profiles.push(story.profile);
            });
            let hash = {};
            profiles = profiles.filter(function(current) {
                let exists = !hash[current.id];
                hash[current.id] = true;
                return exists;
            });
            profiles.map( async profile => {
                stories = [];
                storys.map( story => {
                    if (profile.userID == story.userID) {
                        let ago = 0;
                        let agoType = 0;
                        if (dateNow.diff(moment(story.updatedAt), 'hours') === 0) {
                            ago = dateNow.diff(moment(story.updatedAt), 'minutes') + ' minutes ago'
                            agoType = 'MINUTES_AGO'
                        } else {
                            ago = dateNow.diff(moment(story.updatedAt), 'hours') + ' hours ago'
                            agoType = 'HOURS_AGO'
                        }
                        
                        stories.push({
                            id: story.id,
                            linkTEXT: story.id,
                            file: story.file,
                            link: story.link,
                            typeFileID: story.typeFileID,
                            dateExp: story.dateExp,
                            updatedAt: moment(story.updatedAt).format("MMMM Do YYYY, h:mm a"), 
                            ago,
                            agoType
                        });
                    }
                });
                userStories.push({profile, stories});
                i++;
            });
            // const dateServer = moment().utcOffset('GMT-00:00').format('MMMM Do YYYY, h:mm a');
            // const timeServer = moment(dateServer, 'MMMM Do YYYY, h:mm a').unix();
            return res.status(200).send({
                success: true,
                message: 'Stories List',
                data: userStories
            });
        }
    )
    .catch(
        error => {
            console.log(error)
            return res.status(500).send({
                success: false,
                message: 'Server error.',
                error: error
            });
        }
    )
});

 
module.exports = app;