'use strict'

const express = require('express');
const dbModels = require('../models');
const Sequelize = require('sequelize');
const mdAuthenticattion = require('../middlewares/authenticated');
const app = express();



app.post('/get', mdAuthenticattion.checkToken,async (req, res, next ) => {
    
    let languageCode = req.headers["x-localization"];
    const userID = req.body.user.main_user_id;
    
    let balance = await dbModels.balance.findOne({ where: { userID: userID } });

    if(!balance){
        
        let info = {};
        info.userID = userID;
        info.balanceAmount = 0;

        const balanceBuild = dbModels.balance.build(info);
        balanceBuild.save().then(
            balance => {
                return res.status(200).send({
                    success: true,
                    message: 'The balance.',
                    data: balance
                 });
            }
        )
        .catch(
            error =>  {
                return res.status(500).send({
                    success: false,
                    message: 'The balance error.',
                    error: error
                 });
            }
        );
    }

    if(balance){
        return res.status(200).send(
        {
            success: true,
            message: 'List of balance',
            data: balance
        });
    }
      
});

app.post('/add',mdAuthenticattion.checkToken,async (req, res, next ) => {
    let languageCode = req.headers["x-localization"];

    const userID = req.body.user.main_user_id;
    
    let balance = await dbModels.balance.findOne({ where: { userID: userID } });

    let movement = req.body;

    movement.balanceID = balance.id;
    
    const movementBuild = dbModels.movement.build(movement);
   
    movementBuild.save()

    const balanceAmountTotal = parseFloat(balance.balanceAmount) + parseFloat(movement.movementAmount);

    balance.balanceAmount = balanceAmountTotal.toString();

    dbModels.balance.update(balance.toJSON(), {where: {id: balance.id}}).then(
        balanceUpdate => {
            return res.status(200).send({
                success: true,
                message: 'this balance.',
                data: balanceUpdate
             });
        }
    )
    .catch(
        error =>  {
            res.status(500).send({
                success: false,
                message: 'The balance error.',
                error: error
             });
        }
    );
    
});

app.post('/buy',mdAuthenticattion.checkToken,async (req, res, next ) => {
    let languageCode = req.headers["x-localization"];

    const userID = req.body.user.main_user_id;
    
    const balance = await dbModels.balance.findOne({ where: { userID: userID } });

    let movement = req.body;

    movement.balanceID = balance.id;
    
    const amount = parseFloat(balance.balanceAmount) - parseFloat(movement.movementAmount);

    if(amount < 0){
        res.status(200).send({
            success: false,
            message: languageCode.saved
         });
    }
    
    const movementBuild = dbModels.movement.build(movement);
   
    movementBuild.save()

    balance.balanceAmount = parseFloat(balance.balanceAmount) - parseFloat(movement.movementAmount);

    await dbModels.balance.update(balance.toJSON(), {where: {id: balance.id}}).then(
        balanceUpdate => {
            res.status(200).send({
                success: true,
                message: languageCode.updated,
                data: balanceUpdate
             });
        }
    )
    .catch(
        error =>  {
            res.status(500).send({
                success: false,
                message: languageCode.errorSaved,
                error: error
             });
        }
    );
});


module.exports = app;