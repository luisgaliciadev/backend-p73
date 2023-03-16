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


exports.auctionNoMetJob = async () => {

   let dateNow = moment()
   let dateNow2 = moment().format('YYYY-MM-DD HH:mm:ss');

   const Op = Sequelize.Op;

   const routeApi = config.production.etixPay.url;

   const uniqueSellOptions = {
      where: {
        unique_sellSITUATION: {
              [Op.eq]: 'NO-MET'
          },
          unique_sellTYPE: {
              [Op.eq]: 'AUCTION'
          },
          unique_sellDATEEXPIRE: {
            [Op.lt]: dateNow2
          }
      },
      include: [{ model: dbModels.auction_offer,
                where:{
                    auction_offerSTATUS: {
                        [Op.eq]: 'ACTIVE',
                    }
                },
                required:false}]
  };

   let uniqueSell = await dbModels.unique_sell.findAll(uniqueSellOptions);

   let body = new FormData();
   
    uniqueSell.forEach(async element => {
    
        element.unique_sellSTATUS = 'INACTIVE';
    
        let myToken = await dbModels.my_token.findOne({where: {uniqueID: element.uniqueID, userID: element.userID}});

        element.unique_sellSITUATION = 'FAIL';
        
        let auctionOffert = element.auction_offers[0];

        myToken.mytokenSITUATION = 'PUBLIC';
        
        myToken.mytokenQUANTITYAVAIBLE = parseInt(myToken.mytokenQUANTITYAVAIBLE) + parseInt(element.unique_sellQUANTITYSALE);
        
        dbModels.my_token.update(myToken.toJSON(), {where: {id: myToken.id}})

        dbModels.unique_sell.update(element.toJSON(), {where: {id: element.id}});
        
        body.append('transferCode', auctionOffert.transactionCODE);

        let transaction = await fetch(routeApi + "/api/v2/micro-service/transactions/cancel-offert-auction",
            {
                method: 'POST',
                headers: { 
                        'accept': 'application/json',
                        'token': 'EP82QCsO#LcA^pqpelUjIs37Ny2Wmbws2xGG8^$NL#C^2w&X@nw1eSQX4Prq#2q$VibTjYXcIBRRn7aqRqynDfx7NFv07E6!IUD',
                        },
                body: body
            });
        
            auctionOffert.auction_offerSTATUS = "FAILED";
            dbModels.auction_offer.update(auctionOffert.toJSON(), {where: {id: auctionOffert.id}});


        //Notification

        let notificationInfo = {
            notificationTITLE: 'AUCTION ENDED',
            USERTO: element.userID,
            USERFROM: element.userID,
            notificationMESSAGE: 'FAILED AUCTION',
            notificationMESSAGETWO: '',
            notificationLOOP: false,
            notificationVIEW: false,
            notificationNUMBERREPET: 0,
            notificationIMG: '',
            notificationIMGTWO: '',
            modelID: element.id,
            modelTYPE: 'UNIQUE_SELL',
            notificationTYPE: 'FINANCIAL',
            notificationTYPEUSER: 'SELL',
            notificationSITUATIONAUCTION: 'FAIL',
            notificationSELLTYPE: 'AUCTION',
            notificationCOLORTITLE: '',
            notificationCOLORMESSAGE: '',
            notificationCOLORMESSAGETWO: '',
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