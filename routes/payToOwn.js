'use strict'

const express = require('express');
const dbModels = require('../models');
const Sequelize = require('sequelize');
const mdAuthenticattion = require('../middlewares/authenticated');
const funtions = require('../utils/funtions');
const moment = require('moment');
const Op = Sequelize.Op;
const app = express();
const qrcode =  require('qrcode');
const uuid = require("uuid");


app.get('/get-info/:uniqueID', mdAuthenticattion.checkToken, async (req, res, next ) => {
    
    const uniqueID = req.params.uniqueID;
  
    const dataLanguage = funtions.languages(req.headers["x-localization"]);
   

    const options = {
        where: {
            id: uniqueID,
        },
        include: [{ model: dbModels.profile},{ model: dbModels.voucher,
            include: [{ model: dbModels.voucher_image}]}]
    };
    
   await dbModels.unique.findOne(options).then(
       payToOwnInfo => {
           return res.status(200).send({
               success: true,
               message: dataLanguage.saved,
               data: payToOwnInfo 
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