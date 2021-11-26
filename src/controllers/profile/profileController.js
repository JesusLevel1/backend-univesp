'use strict';
const { error } = require('console');
const { response } = require('express');
const profileData = require('../../data/profile');
const animaisData = require('../../data/animais');

const getProfile = async (req, res, next) => {
    try {

        const IdUsuario = req.params.IdUsuario
        const getAnimaisDoador = await animaisData.getAnimaisDoador(IdUsuario)
        const getProfile = await profileData.getPerfil(IdUsuario)

        return res.status(200).send({
            data: getProfile.map(({
                IdUsuario, 
                Nome, 
                Celular,
                FotoUser,
                NomeInstit,
                SiteInstit,
                SobreInstit
            })  =>{
                return {
                    IdUsuario, 
                    Nome, 
                    Celular,
                    FotoUser,
                    NomeInstit,
                    SiteInstit,
                    SobreInstit,
                    Animais: getAnimaisDoador
                }
            })
        })

    }catch (error){
        return error.message
    }
}

module.exports = {
    getProfile
}