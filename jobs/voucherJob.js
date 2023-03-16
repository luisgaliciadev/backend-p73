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


exports.voucherJob = async () => {

    let dateNow = moment().format('YYYY-MM-DD HH:mm:ss');

   const Op = Sequelize.Op;

   const routeApi = config.production.etixPay.url;

   const voucherOptions = {
      where: {
          voucherSTATUS: {
              [Op.eq]: 'UNUSED'
          },
          voucherDATEENDING: {
            [Op.lt]: dateNow
          }
      }
  };

   let vouchers = await dbModels.voucher.findAll(voucherOptions);

   let body = new FormData();
   
    vouchers.forEach(async element => {
    
        element.voucherSTATUS = "DISABLED";

        dbModels.voucher.update(element.toJSON(), {where: {id: element.id}});
        
         });
   
};