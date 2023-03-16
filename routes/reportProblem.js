'use strict'

const express = require('express');
const dbModels = require('../models');
const Sequelize = require('sequelize');
const mdAuthenticattion = require('../middlewares/authenticated');
const app = express();

app.post('/', (req, res, next ) => {
    const report = dbModels.report_problem.build(req.body);
    report.save().then(
        reportSaved => {
            return res.status(200).send({
                success: true,
                message: 'Report saved',
                data: reportSaved
            });
        }
    )
    .catch(
        error =>  {
            return res.status(500).send({
                success: false,
                message: 'No se pudo guardar el usuario.',
                error: error
            });
        }
    );
});


module.exports = app;

