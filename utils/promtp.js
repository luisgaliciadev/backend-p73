'use strict'

const express = require('express');
const dbModels = require('../models');
const Sequelize = require('sequelize');
const mdAuthenticattion = require('../middlewares/authenticated');
const app = express();
const promtp = dbModels.promtp;

module.exports = {
    findPromtp: async function(textPromtp){
    
    const promtp = await promtp.findOne({ where: { title: textPromtp } });  
    return promtp;
    
    /*    
    const Op = Sequelize.Op;
    const options = {
        where: {
            promtpTEXT: {
              [Op.like]: `%${text}%`
            }
        },
        limit: 5,
        offset: 0
    };
    dbModels.promtp.findAll(options).then(
        promtp => {
            return res.status(200).send({
                ok: true,
                message: 'promtp consultado correctamente.',
                promtp
            });
        }
    )
    .catch(
        error => {
            return res.status(500).send({
                ok: false,
                message: 'No se pudo consultar el usuario.',
                error: error
             });
        }
    */

    }
}