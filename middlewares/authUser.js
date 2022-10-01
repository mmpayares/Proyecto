'use strict'
const jwt = require('jsonwebtoken');

let Sessions = require('../models/sessions');


const middlewares = {
    userProtectUrl: function(req, res, next){

        const token = req.headers['access-token'];

        if(token){

            jwt.verify(token, 'hpNZS6dWZXG2ga6gdZogbTCHpch4vfYne1sbIow2nxrWzXOzlu', (err, decoded) => {
                if(err){
                    return res.status(403).json({message: 'Token inválida'});
                }else{
                    req.decoded = decoded;
                    
                    Sessions.findOne({user_id: req.decoded.user_id, jwt: token}).exec((err,session)=>{
                        if(err) return req.status(500).send({message: "Error al devolver los datos."});
                        if(!session) return res.status(404).send({message:"Los datos de autenticación no son válidos." });
                    });

                    
                    next();
                }
            });

        }else{
            res.status(403).send({
                message: "Token no valida."
            });
        }
    } 
};
module.exports = middlewares;