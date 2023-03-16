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


exports.planUpdateJob = async () => {

    let dateNow = moment().format('YYYY-MM-DD HH:mm:ss');
    
    let dateNow2 = moment();

   const Op = Sequelize.Op;

   const routeApi = config.production.etixPay.url;

   const profileOptions = {
      where: {
          planDATEEND: {
            [Op.lt]: dateNow
          }
      }
  };

   let profiles = await dbModels.profile.findAll(profileOptions);
   
    profiles.forEach(async element => {
    
        element.planDATEEND = null;
        element.planID = 1;

        dbModels.profile.update(element.toJSON(), {where: {id: element.id}});
        
         //Notification

         let notificationInfo = {
            notificationTITLE: 'PLAN ENDS',
            USERTO: element.userID,
            USERFROM: element.userID,
            notificationMESSAGE: 'YOU HAVE BEEN CHANGED TO THE FREE PLAN',
            notificationMESSAGETWO: '',
            notificationLOOP: false,
            notificationVIEW: false,
            notificationNUMBERREPET: 0,
            notificationIMG: '',
            notificationIMGTWO: '',
            modelID: element.id,
            modelTYPE: 'profile',
            notificationTYPE: 'ESSENTIAL',
            notificationTYPEUSER: 'BUY',
            notificationSITUATIONAUCTION: 'NONE',
            notificationSELLTYPE: 'NONE',
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