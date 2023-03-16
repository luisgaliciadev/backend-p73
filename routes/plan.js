'use strict'

const express = require('express');
const dbModels = require('../models');
const Sequelize = require('sequelize');
const mdAuthenticattion = require('../middlewares/authenticated');
const app = express();


app.get('/list-artist',async (req, res, next ) => {
    
    let languageCode = req.headers["x-localization"];
    
    const lang  = languageCode.toLocaleUpperCase();

    const language = await dbModels.language.findOne({ where: { languageCODE: lang } });

    await dbModels.plan.findAll({ where: { languageID: language.id, planTYPE: 'ARTIST' }, include: [{ model: dbModels.item}] }).then(
        plans => {
            return res.status(200).send({
                success: true,
                message: 'List of plan',
                data: plans
             });
        }
    )
    .catch(
        error => {
            return res.status(500).send({
                success: false,
                message: 'No se pudo consultar el usuario.',
                error: error
             });
        }
    )
    
});


app.get('/list-gallery',async (req, res, next ) => {
    
    let languageCode = req.headers["x-localization"];
    
    const lang  = languageCode.toLocaleUpperCase();

    const language = await dbModels.language.findOne({ where: { languageCODE: lang } });
    
    await dbModels.plan.findAll({ where: { languageID: language.id, planTYPE: 'GALLERIST' }, include: [{ model: dbModels.item}] }).then(
        plans => {
            return res.status(200).send({
                success: true,
                message: 'List of plan',
                data: plans
             });
        }
    )
    .catch(
        error => {
            return res.status(500).send({
                success: false,
                message: 'No se pudo consultar el usuario.',
                error: error
             });
        }
    )
    
});

app.get('/app-plans',async (req, res, next ) => {
    
    let languageCode = req.headers["x-localization"];
    
    const lang  = languageCode.toLocaleUpperCase();

    await dbModels.app_plan.findAll().then(
        plans => {
            return res.status(200).send({
                success: true,
                message: 'List of plan',
                data: plans
             });
        }
    )
    .catch(
        error => {
            return res.status(500).send({
                success: false,
                message: 'No se pudo consultar el usuario.',
                error: error
             });
        }
    )
});

app.get('/app-plan/:id',async (req, res, next ) => {
    
    let languageCode = req.headers["x-localization"];
    
    const lang  = languageCode.toLocaleUpperCase();

    await dbModels.app_plan.findByPk(req.params.id).then(
        plan => {
            return res.status(200).send({
                success: true,
                message: 'plan',
                data: plan
             });
        }
    )
    .catch(
        error => {
            return res.status(500).send({
                success: false,
                message: 'No se pudo consultar el usuario.',
                error: error
             });
        }
    )
});


module.exports = app;