'use script';

const express = require ('express');
const login = require('../middleware/login');
const router = express.Router();

const loginControll = require ('../controllers/auth/loginController')
const animaisControll = require ('../controllers/animais/animaisController')

/*ROTA DE LOGIN*/
router.post('/login', loginControll.postLogin)
router.post('/cadastroUsuario', loginControll.cadastroUsuario)

/* ROTA DE CADASTRO DE ANIMAIS */
router.post('/cadastroAnimais', login.required, animaisControll.cadastroAnimais)
router.get('/listAnimais', animaisControll.getAnimais) 
router.get('/petProfile/:IdAnimal', animaisControll.getAnimal)

module.exports = {
    routes: router
}