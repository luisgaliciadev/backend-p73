'use strict'

const express = require('express');
// const fetch = require('node-fetch');
const webPush = require('web-push');
const config = require('../config/apps.json');
const dbModels = require('../models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;


// Imports
const mdAuthenticattion = require('../middlewares/authenticated');
const funtions = require('../utils/funtions');
const funtionsNotification = require('../utils/notification');

// sockets
const {io} = require('../app');
const { data } = require('cheerio/lib/api/attributes');
require('../sockets/socket');
const clientsList = io.sockets;
// console.log(clientsList)

const app = express();

webPush.setVapidDetails(
    'mailto:example@yourdomain.org',
    config.development.notificationsKey,
    config.development.notificationsPrivateKey
);


app.get('/notifications/:userID',mdAuthenticattion.checkToken,  async (req, res, next ) => {
    const userID = req.params.userID;
    dbModels.notification.findAll({ where: {USERTO: userID}, order: [['id', 'DESC']] }).then(
    notifications => {
        res.status(200).send({
            success: true,
            message: 'List notifications',
            data: notifications
        });
    }
   )
   .catch(
    error =>  {
        return res.status(500).send({
            success: false,
            message: 'List notifications error',
            error: error
        });
    });
   
});

app.post('/subscribe', mdAuthenticattion.checkToken,  async (req, res, next ) => {
    const infoSubscription = req.body;
    let oldSubscription = await dbModels.subscription_notification.findOne({ where: {subscriptionKEY: infoSubscription.subscriptionKEY, subscriptionAUTH: infoSubscription.subscriptionAUTH, userID: infoSubscription.userID,subscriptionAPP: infoSubscription.subscriptionAPP} });
    if (oldSubscription) {
        return res.status(200).send({
            success: true,
            message: 'Notification subscription is ready.',
            data: oldSubscription
        });
    } else {
        const subscription = dbModels.subscription_notification.build(infoSubscription);
        subscription.save().then(
        subscriptionSaved => {
            return res.status(200).send({
                success: true,
                message: 'Notification subscription successfully.',
                data: subscriptionSaved
            });
        }
        )
        .catch(
            error =>  {
                return res.status(500).send({
                    success: false,
                    message: 'Notification subscription error.',
                    error: error
                });
            }
        );
    }
//    let oldSubscription = await dbModels.subscription_notification.findOne({ where: {subscriptionKEY: infoSubscription.subscriptionKEY, subscriptionAUTH: infoSubscription.subscriptionAUTH, userID: infoSubscription.userID,subscriptionAPP: infoSubscription.subscriptionAPP} });
    
//     if (oldSubscription) {
//         return res.status(200).send({
//             success: true,
//             message: 'Notification subscription is ready.',
//             data: oldSubscription
//         });
//     }

//     oldSubscription = await dbModels.subscription_notification.findOne({ where: { userID: infoSubscription.userID, subscriptionAPP: infoSubscription.subscriptionAPP }});
                
//     if (oldSubscription) {
//         dbModels.subscription_notification.update(infoSubscription, {where: {id: oldSubscription.id}}).then(
//             subscriptionUpdate => {
//                 return res.status(200).send({
//                     success: true,
//                     message: 'Notification subscription update.',
//                     data: subscriptionUpdate
//                 });
//             }
//         )
//         .catch(
//             error =>  {
//                 return res.status(500).send({
//                     success: false,
//                     message: 'Notification subscription error.',
//                     error: error
//                 });
//             }
//         );
//     } else {
//         const subscription = dbModels.subscription_notification.build(infoSubscription);
//         subscription.save().then(
//          subscriptionSaved => {
//              return res.status(200).send({
//                  success: true,
//                  message: 'Notification subscription successfully.',
//                  data: subscriptionSaved
//              });
//          }
//         )
//         .catch(
//             error =>  {
//                 return res.status(500).send({
//                     success: false,
//                     message: 'Notification subscription error.',
//                     error: error
//                 });
//             }
//         );
//     }                                                                       
});

app.post('/send', mdAuthenticattion.checkToken, async (req, res, next ) => {
    const userID = req.body.userID
    const notificationID = req.body.notificationID
    const subscriptionAPP = req.body.subscriptionAPP
    const notification = await dbModels.notification.findOne({ where: {id: notificationID} })
    const subscriptions = await dbModels.subscription_notification.findAll({ where: {userID: userID, subscriptionAPP: subscriptionAPP} });
    const notificationSubscriptions = [];
    subscriptions.forEach(subscription => {
        notificationSubscriptions.push(
            {
                endpoint: subscription.subscriptionENDPOINT,
                expirationTime: null,
                keys: {
                    p256dh: subscription.subscriptionKEY,
                    auth: subscription.subscriptionAUTH
                }
            }
        ) 
    });
    const payload = {
        notification: {
            title: notification.notificationTITLE,
            body: notification.notificationMESSAGE,
            vibrate: [100, 50, 100],
            // image: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHw%3D&w=1000&q=80",
            icon: config.development.p73.url + '/api/image/icons-app/512x512-LIGHT.png',
            badge: config.development.p73.url + '/api/image/icons-app/badge.png',
            data: {
                url: 'https://app-test.protocol73.com/pages/notifications', 
                // dateOfArrival: Date.now(),
                // primaryKey: 1
                onActionClick: {
                    default: {"operation": "openWindow"}
                }
            },
            // actions: [
            //     {
            //         // click_action : "https://app-test.protocol73.com/pages/notifications",
            //         // action: "open_url",
            //         title: "Close"
            //     }
            // ]        
        }
    }
    notificationSubscriptions.forEach(subscription => {
        webPush.sendNotification(
            subscription,
            JSON.stringify(payload))
            .then( response => {
                console.log('enviada')
            })
            .catch(error => {
                // console.log(error)
                console.log('no enviada')
            }
        );
    });
    io.emit('notification', notification);
    return res.status(200).send({
        success: true,
        message: 'Notification send successfully',
        data: notification
     });
});

app.post('/send-admin', async (req, res, next ) => {
    const userID = req.body.userID
    const notificationID = req.body.notificationID
    const subscriptionAPP = req.body.subscriptionAPP
    const notification = await dbModels.notification.findOne({ where: {id: notificationID} })
    const subscriptions = await dbModels.subscription_notification.findAll({ where: {userID: userID, subscriptionAPP: subscriptionAPP} });
    const notificationSubscriptions = [];
    subscriptions.forEach(subscription => {
        notificationSubscriptions.push(
            {
                endpoint: subscription.subscriptionENDPOINT,
                expirationTime: null,
                keys: {
                    p256dh: subscription.subscriptionKEY,
                    auth: subscription.subscriptionAUTH
                }
            }
        ) 
    });
    const payload = {
        notification: {
            title: notification.notificationTITLE,
            body: notification.notificationMESSAGE,
            vibrate: [100, 50, 100],
            icon: config.development.p73.url + '/api/image/icons-app/512x512-LIGHT.png',
            badge: config.development.p73.url + '/api/image/icons-app/badge.png',
            data: {
                url: 'https://app-test.protocol73.com/pages/notifications', 
                onActionClick: {
                    default: {"operation": "openWindow"}
                }
            }, 
        }
    }
    notificationSubscriptions.forEach(subscription => {
        webPush.sendNotification(
            subscription,
            JSON.stringify(payload))
            .then( response => {
                console.log('enviada')
            })
            .catch(error => {
                console.log('no enviada')
            }
        );
    });
    io.emit('notification', notification);
    return res.status(200).send({
        success: true,
        message: 'Notification send successfully',
        data: notification
     });
});

app.post('/create', mdAuthenticattion.checkToken,  async (req, res, next ) => {
        
    const dataLanguage = funtions.languages(req.headers["x-localization"]);
    
    const infoNotification = req.body;

    if(infoNotification.notificationIMG){
        let fileIMG = infoNotification.notificationIMG;
        infoNotification.notificationIMG = funtions.uploadImg(fileIMG, infoNotification.USERTO);
    }

    if(infoNotification.notificationTWO){
        let fileIMG = infoNotification.notificationIMGTWO;
        infoNotification.notificationIMGTWO = funtions.uploadImg(fileIMG, infoNotification.USERTO);
    }
    
         const notificationBuild = dbModels.notification.build(infoNotification);
         
         notificationBuild.save().then(
            notificationSaved => {
              return res.status(200).send({
                  success: true,
                  message: dataLanguage.saved,
                  data: notificationSaved
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

app.post('/create-admin',  async (req, res, next ) => {
        
    // const dataLanguage = funtions.languages(req.headers["x-localization"]);
    
    const infoNotification = req.body;

    if(infoNotification.notificationIMG){
        let fileIMG = infoNotification.notificationIMG;
        infoNotification.notificationIMG = funtions.uploadImg(fileIMG, infoNotification.USERTO);
    }

    if(infoNotification.notificationTWO){
        let fileIMG = infoNotification.notificationIMGTWO;
        infoNotification.notificationIMGTWO = funtions.uploadImg(fileIMG, infoNotification.USERTO);
    }
    
         const notificationBuild = dbModels.notification.build(infoNotification);
         
         notificationBuild.save().then(
            notificationSaved => {
              return res.status(200).send({
                  success: true,
                  message: 'Notification saved',
                  data: notificationSaved
              });
          }
         )
         .catch(
             error =>  {
                 return res.status(500).send({
                     success: false,
                     message: 'Notification error',
                     error: error
                 });
             }
         );                                                                      
});
 


 app.post('/register-view', mdAuthenticattion.checkToken,  async (req, res, next ) => {

    const dataLanguage = funtions.languages(req.headers["x-localization"]);

    const notificationID = req.body.notificationID;

     let notificacion = await dbModels.notification.findByPk(notificationID);
    
     notificacion.notificationVIEW = true;

     
     dbModels.notification.update(notificacion.toJSON(), {where: {id: notificationID}}).then(
        notificationSaved => {
          return res.status(200).send({
              success: true,
              message: dataLanguage.saved,
              data: notificationSaved
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