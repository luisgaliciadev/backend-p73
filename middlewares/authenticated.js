'use strict'

const apps = require('../config/apps.json')['development'];

// Verificar token
exports.checkToken = function(req, res, next) {
    if(!req.headers.authorization){
        return res.status(403).send({
            message:'La peticion no tiene la cabecera de autenticación'
        });
    }
    const token = req.headers.authorization;
    if (token === apps.etixMarket.token || token === apps.etixPay.token || token === apps.p73.token) {
        next();
    } else {
        return res.status(401).send({
            success: false,
            message: 'Petición no Autorizada.',
            error: 'Token invalido.',
            token
        });
    }
}