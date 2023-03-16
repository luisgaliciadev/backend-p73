'use strict'

const express = require('express');
const dbModels = require('../models');
const Sequelize = require('sequelize');
const mdAuthenticattion = require('../middlewares/authenticated');
const funtions = require('../utils/funtions');
const moment = require('moment');
const Op = Sequelize.Op;
const app = express();
const fetch = require('node-fetch');
const FormData = require('form-data');
const config = require('../config/apps.json');

app.post('/create', mdAuthenticattion.checkToken, async (req, res, next ) => {
    const dataLanguage = funtions.languages(req.headers["x-localization"]);

    let info = req.body;

    let dateNow = moment();

    let uniqueSell = await dbModels.unique_sell.findOne({where: {id: info.unique_sellID}});

    const routeApi = config.production.etixPay.url;

    if(uniqueSell.unique_sellDATEEXPIRE < dateNow){
        return res.status(200).send({
            success: false,
            message: 'Auction time is over',
        });
    }

    if(info.auction_offerAMMOUNT < uniqueSell.unique_sellPRICE){
        return res.status(200).send({
            success: false,
            message: 'Lower offer than current',
        });
    }
    
    const optionsAuctionOffer = {
        where: {
            unique_sellID: {
                [Op.eq]: info.unique_sellID
              },
            auction_offerSTATUS: {
                [Op.eq]: "ACTIVE"
            } 
        }
    };

    let auctionOffert = await dbModels.auction_offer.findOne(optionsAuctionOffer);

    if(auctionOffert){

        if(info.auction_offerAMMOUNT <= auctionOffert.auction_offerAMMOUNT){
            return res.status(200).send({
                success: false,
                message: 'Lower offer than current',
            });
        }
        
        auctionOffert.auction_offerSTATUS = 'FAILED';

        const body = new FormData();
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

        dbModels.auction_offer.update(auctionOffert.toJSON(), {where: {id: auctionOffert.id}});
        
       

    }
    else{
        uniqueSell.unique_sellBASEAUCTIONPRICE = uniqueSell.unique_sellPRICE;
    }   

        info.auction_offerDATE = dateNow;

        const auction_offerNew = dbModels.auction_offer.build(info);
    
        auction_offerNew.save().then(
            auction_offerSaved=> {
                uniqueSell.unique_sellPRICE = info.auction_offerAMMOUNT / uniqueSell.unique_sellQUANTITYSALE;
                dbModels.unique_sell.update(uniqueSell.toJSON(), {where: {id: info.unique_sellID}});

                return res.status(200).send({
                    success: true,
                    message: dataLanguage.saved,
                    data: auction_offerSaved 
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

