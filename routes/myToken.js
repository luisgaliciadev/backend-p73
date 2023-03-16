'use strict'

const express = require('express');
const dbModels = require('../models');
const Sequelize = require('sequelize');
const mdAuthenticattion = require('../middlewares/authenticated');
const funtions = require('../utils/funtions');

const app = express();

app.post('/create', mdAuthenticattion.checkToken, async (req, res, next ) => {
    const dataLanguage = funtions.languages(req.headers["x-localization"]);

    const info = req.body

        let tokens_user = await dbModels.my_token.findOne({ where: { userID: info.userID, uniqueID: info.uniqueID } });

        if(tokens_user){
            tokens_user.mytokenQUANTITYAVAIBLE = parseInt(tokens_user.mytokenQUANTITYAVAIBLE) + parseInt(info.mytokenQUANTITYAVAIBLE);
            tokens_user.mytokenQUANTITYBUY = info.mytokenQUANTITYBUY;
            tokens_user.mytokenPRICEBUY = info.mytokenPRICEBUY;
            dbModels.my_token.update(tokens_user.toJSON(), {where: {id: tokens_user.id}});

            return res.status(200).send({
                success: true,
                message: dataLanguage.saved,
                data: tokens_user 
             });
        }
        
        const tokenBuild = dbModels.my_token.build(info);
    
        tokenBuild.save().then(
            tokenSaved=> {
                return res.status(200).send({
                    success: true,
                    message: dataLanguage.saved,
                    data: tokenSaved 
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

