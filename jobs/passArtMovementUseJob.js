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


exports.passArtMovementUseJob = async () => {

  let dateNow = moment().format('YYYY-MM-DD HH:mm:ss');

   const Op = Sequelize.Op;

   const passUseOptions = {
      where: {
        user_pass_art_movement_useSTATUS: {
              [Op.eq]: 'ACTIVE'
          },
          user_pass_art_movement_useDATEUNTIL: {
            [Op.lt]: dateNow
          }
      }
  };

   let usePasses = await dbModels.user_pass_art_movement_use.findAll(passUseOptions);

   let body = new FormData();
   
   usePasses.forEach(async element => {
    
        element.user_pass_art_movement_useSTATUS = "INACTIVE";

        dbModels.user_pass_art_movement_use.update(element.toJSON(), {where: {id: element.id}});

        if(element.user_pass_art_movement_useFREEPLAN == false){
        
          let userPassPresent = await dbModels.user_pass.findOne({where: {userID: element.userID}});

          userPassPresent.user_passBALANCEARTMOVEMENT = userPassPresent.user_passBALANCEARTMOVEMENT + 1;
        
          dbModels.user_pass.update(userPassPresent.toJSON(), {where: {id: userPassPresent.id}})
        }


         });
   
};