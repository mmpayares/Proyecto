'use strict'
const express = require('express');
const api = express.Router();
const{ body } = require('express-validator');

let WelcomeController = require('../controllers/welcome');
let MaestrosController = require('../controllers/maestros');
let AuthController = require('../controllers/auth');

let userProtectUrl = require('../middlewares/authUser').userProtectUrl;

api.get('/', WelcomeController.welcome);
api.get('/maestros', MaestrosController.maestros);
api.get('/maestro/:n_lista', MaestrosController.maestro);
api.post('/maestro', userProtectUrl, [
    body('n_cuenta').not().isEmpty(),
    body('nombre').not().isEmpty(),
    body('edad').not().isEmpty(),
    body('genero').not().isEmpty(),
    body('especialidad').not().isEmpty()
], MaestrosController.crear_maestro); 

api.put('/maestro/:n_lista', [
    body('nombre').not().isEmpty(),
    body('edad').not().isEmpty(),
    body('genero').not().isEmpty(),
    body('especialidad').not().isEmpty()
], MaestrosController.update_maestro);

api.delete('/maestro/:n_lista', MaestrosController.delete_maestro);

api.post("/login", [
    body('mail').not().isEmpty(),
    body('pass').not().isEmpty()
], AuthController.login);
api.post("/logout", userProtectUrl, AuthController.logout);


module.exports = api;

