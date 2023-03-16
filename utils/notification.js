'use strict';

const express = require('express');

var fileUpload = require('express-fileupload');
var fs = require('fs');

// mssql
var bodyParser = require('body-parser');
var http = require('http');
var path = require('path');
const dbModels = require('../models');
const config = require('../config/apps.json');
const webPush = require('web-push');
const {io} = require('../app');
require('../sockets/socket');

var app = express();

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

app.use(fileUpload());

module.exports = {
    createNotification: function(notification) {
        return new Promise( async(resolve, reject) => {
            const infoNotification = notification;
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
                return resolve({
                    success: true,
                    message: 'Notification create successfully',
                    data: notificationSaved
                });
            }
            )
            .catch(
                error =>  {
                    return reject({
                        success: false,
                        message: 'Notification create error',
                        error: error
                    });
                }
            );                   
        }); 
    },

    sendNotification: function(infoNotification) {
        return new Promise( async (resolve, reject) => {
            const userID = infoNotification.userID
            const notificationID = infoNotification.notificationID
            const subscriptionAPP = infoNotification.subscriptionAPP
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
                    //    data: {
                    //     dateOfArrival: Date.now(),
                    //     primaryKey: 1
                    //    },
                    actions: [
                        {
                            action: "explore",
                            title: "Close"
                        }
                    ]        
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
                        console.log('No enviada')
                    }
                );
            });
            io.emit('notification', notification);

            if (notification) {
                return resolve({
                    success: true,
                    message: 'Notification send successfully',
                    data: notification
                });
            } else {
                return reject({
                    success: false,
                    message: 'Notification send error',
                    error: 'Notification send error'
                });
            }
        }); 
    }
 }