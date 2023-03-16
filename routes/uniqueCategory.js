'use strict'

const express = require('express');
const dbModels = require('../models');
const Sequelize = require('sequelize');
const mdAuthenticattion = require('../middlewares/authenticated');
const funtions = require('../utils/funtions');

const app = express();

app.get('/get-list', async (req, res, next ) => {
    const dataLanguage = funtions.languages(req.headers["x-localization"]);


    const uniqueCategories = await dbModels.category_art.findAll();

    return res.status(200).send({
        success: true,
        message: "List Categories Uniques",
        data: uniqueCategories 
    });
});


app.post('/creation-relation-unique', mdAuthenticattion.checkToken, async (req, res, next ) => {
    const dataLanguage = funtions.languages(req.headers["x-localization"]);

    const uniqueID = req.body.uniqueID;

  
    const categoriesUnique = await dbModels.category_unique_relation.findAll({where: {uniqueID: uniqueID}});
    if (categoriesUnique) {
        dbModels.category_unique_relation.destroy({where: {uniqueID: uniqueID}});
    }

    const uniqueCategories = req.body.uniqueCategories;

    let infoRelationUnique = {};

    for(let i=0; i < uniqueCategories.length; i++){
        infoRelationUnique.uniqueID = uniqueID;
        infoRelationUnique.categoryID = uniqueCategories[i].id; 
        const uniqueRelationCategory = dbModels.category_unique_relation.build(infoRelationUnique);
        uniqueRelationCategory.save();   
    }

    return res.status(200).send({
        success: true,
        message: dataLanguage.saved,
        data: true 
    });
});

app.get('/list-relation-unique/:id', mdAuthenticattion.checkToken, async (req, res, next ) => {
    const dataLanguage = funtions.languages(req.headers["x-localization"]);
    const uniqueID = req.params.id;
    await dbModels.category_unique_relation.findAll({where: {uniqueID: uniqueID}}).then(
        categories => {
            return res.status(200).send({
                success: true,
                message: 'List categories unique',
                data: categories
             });
        }
    )
    .catch(
        error => {
            return res.status(500).send({
                success: false,
                message: 'Error get list categories unique.',
                error: error
             });
        }
    )
});


module.exports = app;

