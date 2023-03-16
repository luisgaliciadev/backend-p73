'use strict'

const express = require('express');
const dbModels = require('../models');
const Sequelize = require('sequelize');
const mdAuthenticattion = require('../middlewares/authenticated');
const app = express();

app.get('/users', mdAuthenticattion.checkToken, async (req, res, next ) => {
    const options = {
        include: [
            { model: dbModels.Type_user}
        ],
        limit: 5,
        offset: 0
    };
    // const users = await dbModels.User.findAll(options);
    // if (!users) {
    //     return res.status(500).send({
    //         success: true,
    //         message: 'error',
    //         // users
    //      });
    // } else {
    //     return res.status(200).send({
    //         success: true,
    //         message: 'Usuarios consultados correctamente.',
    //         users
    //     });
    // } 
    dbModels.User.findAll(options).then(
        users => {
            return res.status(200).send({
                success: true,
                message: 'Usuarios consultados correctamente-.',
                users
             });
        }
    )
    .catch(
        error => {
            return res.status(500).send({
                success: false,
                message: 'No se pudo consultar el listado de usuarios.',
                error: error
             });
        }
    );
});

app.get('/:id', (req, res, next ) => {
    const idUser = req.params.id
    dbModels.User.findByPk(idUser).then(
        user => {
            return res.status(200).send({
                success: true,
                message: 'Usuario consultado correctamente.',
                user
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

app.get('/usersBySearch/:search', (req, res, next ) => {
    const search = req.params.search;
    const Op = Sequelize.Op;
    const options = {
        where: {
            name: {
              [Op.like]: `%${search}%`
            }
        },
        limit: 5,
        offset: 0
    };
    dbModels.User.findAll(options).then(
        user => {
            return res.status(200).send({
                success: true,
                message: 'Usuario consultado correctamente.',
                user
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

app.post('/', (req, res, next ) => {
    const user = dbModels.User.build(req.body);
    user.save().then(
        userSaved => {
            return res.status(200).send({
                success: true,
                message: 'usuario guardado correctamente.',
                userSaved
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

app.post('/update', async (req, res, next ) => {
    const user = req.body;
    const usuario = await dbModels.User.findOne({where: {id: 1}});
    dbModels.User.update(user, {where: {id: 65666}}).then(
        userUpdated => {
            res.status(200).send({
                success: true,
                message: 'usuario actualizado correctamente.',
                userUpdated
            });
        }
    )
    .catch(
        error =>  {
            res.status(500).send({
                success: false,
                message: 'No se pudo guardar el usuario.',
                error: error
            });
        }
    );
});

module.exports = app;

