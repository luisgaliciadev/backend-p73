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


app.post('/create', mdAuthenticattion.checkToken, async (req, res, next ) => {
    const dataLanguage = funtions.languages(req.headers["x-localization"]);
    /*
    let infoQR = {};

    let imgQR = await qrcode.toDataURL(infoQR);
    */
   let code = uuid.v1();

   let info = req.body;
   info.voucherQR = code;
   
   if(info.voucherIMAGE){
        let fileIMG = info.voucherIMAGE;
        info.voucherIMG = funtions.uploadImg(fileIMG, info.userID);
    }
    
   const voucherBuild = dbModels.voucher.build(info);
    
   voucherBuild.save().then(
       voucherSaved=> {
        if(info.additionalIMG){
            let infoAdditionalImg = {};
            let additionalBuildImg;
            info.additionalIMG.forEach(element => {
                infoAdditionalImg.voucherID = voucherSaved.id;
                infoAdditionalImg.voucher_imageLINK = element;
                infoAdditionalImg.voucher_imageLINK = funtions.uploadImg(element, voucherSaved.userID);
                additionalBuildImg = dbModels.voucher_image.build(infoAdditionalImg);
                additionalBuildImg.save();
            });
            const uuidVoucherInfo ={
                voucher_uuidCODE: code,
                voucherID: voucherSaved.id
            }
            const uuidVoucher = dbModels.voucher_uuid.build(uuidVoucherInfo);
            uuidVoucher.save();
        }
           return res.status(200).send({
               success: true,
               message: dataLanguage.saved,
               data: voucherSaved 
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



app.post('/sell-voucher', mdAuthenticattion.checkToken, async (req, res, next ) => {
    const dataLanguage = funtions.languages(req.headers["x-localization"]);
   
    let info = req.body;

    const dateNow = moment();

    let voucher = await dbModels.voucher.findByPk(info.voucherID);
    
    if(!voucher || voucher.voucherSTATUS != "UNUSED"  || dateNow > voucher.voucherDATEENDING){
        return res.status(200).send({
            success: false,
            message: "Voucher Not Available for Sale",
        });
    }
    
    voucher.voucherSTATUS = "SALE";

    if(info.voucherPRICE){
        voucher.voucherPRICE = info.voucherPRICE;
    }
    
    dbModels.voucher.update(voucher.toJSON(), {where: {id: voucher.id}}).then(
       voucherSaved=> {
           return res.status(200).send({
               success: true,
               message: dataLanguage.saved,
               data: voucher
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

app.post('/close-sell-voucher', mdAuthenticattion.checkToken, async (req, res, next ) => {
    const dataLanguage = funtions.languages(req.headers["x-localization"]);
   
    let info = req.body;

    const Op = Sequelize.Op;

    const dateNow = moment();

    let voucher = await dbModels.voucher.findByPk(info.voucherID);

    if(info.statusSELL == 'APPROVED'){
        voucher.userID = info.userID;
    }
    
    voucher.voucherSTATUS = "UNUSED";

    dbModels.voucher.update(voucher.toJSON(), {where: {id: voucher.id}}).then(
       voucherSaved=> {
           return res.status(200).send({
               success: true,
               message: dataLanguage.saved,
               data: voucher
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

app.post('/redeem-voucher', mdAuthenticattion.checkToken, async (req, res, next ) => {
    const dataLanguage = funtions.languages(req.headers["x-localization"]);
   
    let info = req.body;

    const Op = Sequelize.Op;

    const options = {
        where: {
            voucher_uuidCODE: {
                [Op.eq]: info.code
            },
        },
        include: [{ model: dbModels.voucher}]
    };

    const dateNow = moment();

    const uuidVoucher = await dbModels.voucher_uuid.findOne(options);

    if(!uuidVoucher){
        return res.status(200).send({
            success: false,
            message: "INVALID CODE",
        });
    }

    let voucher = uuidVoucher.voucher;

    if( voucher.voucherSTATUS != "UNUSED"  || dateNow > voucher.voucherDATEENDING || dateNow < voucher.voucherDATESTART){
        return res.status(200).send({
            success: false,
            message: "Voucher Not Available for Redeem",
        });
    }

    voucher.voucherSTATUS = "USED";

    dbModels.voucher.update(voucher.toJSON(), {where: {id: voucher.id}}).then(
       voucherSaved=> {
           return res.status(200).send({
               success: true,
               message: dataLanguage.saved,
               data: voucher
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

