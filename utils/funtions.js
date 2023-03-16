'use strict';

const express = require('express');

var fileUpload = require('express-fileupload');
var fs = require('fs');

// mssql
var bodyParser = require('body-parser');
var http = require('http');
var path = require('path');
const dbModels = require('../models');

var app = express();

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

app.use(fileUpload());

module.exports = {
    testFuntion: function(test) {
        return new Promise((resolve, reject) => {
            if (test == '1') {
                return resolve('Test successful');
            } else {
                return reject('Test error');
            } 
        }); 
    },
    
    languages: function(language) {
        let configLanguage;
        switch (language) {
            case 'it':
                configLanguage = require(`../assets/i18n/it.json`);
                break;
            case 'es':
                configLanguage = require(`../assets/i18n/es.json`);
                break;
            case 'en':
                configLanguage = require(`../assets/i18n/en.json`);
                break;
            case 'ro':
                configLanguage = require(`../assets/i18n/ro.json`);
                break;
            default:
                configLanguage = require(`../assets/i18n/en.json`);
                break;
            
        }
        return configLanguage;
    },

    uploadImg: function (fileImage, id){
            const arrayFileName = fileImage.name.split('.');
            const extFile = arrayFileName[arrayFileName.length - 1];
           
            // if (tipo === 'starting') {
            const extValida = ['png', 'PNG', 'jpeg', 'JPEG','jpg', 'JPG'];
            // }
    
            if (extValida.indexOf(extFile) < 0) {
                res.status(400).send({
                    ok: false,
                    message: 'Extensión de archivo no valida.' + 'extFile: ' + extFile
                });
            } else {
                // File Name
                const fileName = `${arrayFileName[0]}-${id}-${new Date().getMilliseconds()}.${extFile}`;
    
                // Tempotal path
                const path = `./uploads/profile/${fileName}`;
                file.mv(path, err => {
                    if(err){
                        res.status(500).send({
                            success: false,
                            message: 'Error al intentar guardar el archivo.',
                            error: err
                        });
                    } else {
                        const path = `/profile/${fileName}`;
                        return path;
                    }
                });
            }
    },
    sortJSON(data, key, orden) {
        return data.sort(function (a, b) {
            var x = parseFloat(a[key]),
            y = parseFloat(b[key]);     
            if (orden === 'asc') {
                return ((x < y) ? -1 : ((x > y) ? 1 : 0));
            }
            if (orden === 'desc') {
                return ((x > y) ? -1 : ((x < y) ? 1 : 0));
            }
        });
    }
 }