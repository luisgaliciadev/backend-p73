'use strict';

const express = require('express');
const dbModels = require('../models');
const Sequelize = require('sequelize');
const mdAuthenticattion = require('../middlewares/authenticated');
const notifications = require('../utils/notification');
const moment = require('moment');
const fetch = require('node-fetch');
const FormData = require('form-data');
const config = require('../config/apps.json');


exports.uniqueTokenOfferJob = async () => {

    let dateNow = moment().format('YYYY-MM-DD HH:mm:ss');
    
    let dateNow2 = moment();

   const Op = Sequelize.Op;

   const routeApi = config.test.etixPay.url;

   const uniqueTokenOptions = {
      where: {
        unique_token_offerDATEEND: {
            [Op.lt]: dateNow
          },
          unique_token_offerSTATUS : {
            [Op.eq]: "PENDING"
          }  
      }
  };
  
  const OffertMessage = "OFFER REJECTED";

   let uniqueTokenOfferts = await dbModels.unique_token_offer.findAll(uniqueTokenOptions);

   
   
        uniqueTokenOfferts.forEach(async element => {
    
        element.unique_token_offerSTATUS = "REFUSED";
        
        const uniqueToken = element;

        const unique = await dbModels.unique.findByPk(element.uniqueID);

        await dbModels.unique_token_offer.update(uniqueToken.toJSON(), {where: {id: uniqueToken.id}});

        body.append('transferCode', element.transactionCODE);
        body.append('observation', OffertMessage);

        let transaction = await fetch(routeApi + "/api/v2/micro-service/transactions/cancel-offert-auction",
            {
                method: 'POST',
                headers: { 
                        'accept': 'application/json',
                        'token': 'EP82QCsO#LcA^pqpelUjIs37Ny2Wmbws2xGG8^$NL#C^2w&X@nw1eSQX4Prq#2q$VibTjYXcIBRRn7aqRqynDfx7NFv07E6!IUD',
                        },
                body: body
            });
        
         //Notification

         let notificationInfo = {
            notificationTITLE: 'YOUR OFFER HAS BEEN REFUSED',
            USERTO: element.userBUY,
            USERFROM: element.userOWNER ,
            notificationMESSAGE: 'By ' +  element.unique_token_offerAMMOUNT + ' ATM',
            notificationMESSAGETWO: 'For ' +  element.unique_token_offerQUANTITYTOKEN +' tokens of this unique ' + unique.uniqueName,
            notificationLOOP: false,
            notificationVIEW: false,
            notificationNUMBERREPET: 0,
            notificationIMG: '',
            notificationIMGTWO: '',
            modelID: element.id,
            modelTYPE: 'unique_token_offer',
            notificationTYPE: 'FINANCIAL',
            notificationTYPEUSER: 'SELL',
            notificationSITUATIONAUCTION: null,
            notificationSELLTYPE: 'SELL',
            notificationCOLORTITLE: '',
            notificationCOLORMESSAGE: '',
            notificationCOLORMESSAGETWO: 'DANGER',
        }
    
        let notificationBuild =  dbModels.notification.build(notificationInfo);
    
        let notification = await notificationBuild.save();
    
        let  sendNotification = {
            userID: notification.USERTO,
            notificationID: notification.id,
            subscriptionAPP: 'P73'
        }
        notifications.sendNotification(sendNotification);
    });
   
};