'use script';

const express = require ('express');
const login = require('../middleware/login');
const router = express.Router();
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../uploads');
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString() + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'imagem/jpg' || file.mimetype === 'imagem/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
})


const loginControll = require ('../controllers/auth/loginController')
const animaisControll = require ('../controllers/animais/animaisController');

/*ROTA DE LOGIN*/
router.post('/login', loginControll.postLogin)
router.post('/cadastroUsuario',
    upload.single('imagem'),
    loginControll.cadastroUsuario
 )

/* ROTA DE CADASTRO DE ANIMAIS */
router.post('/cadastroAnimais', login.required, animaisControll.cadastroAnimais)
router.get('/listAnimais', animaisControll.getAnimais) 
router.get('/petProfile/:IdAnimal', animaisControll.getAnimal)
router.post('/postComentario', login.required, animaisControll.postComentario)
router.get('/getComentarios/:IdAnimal', animaisControll.getComentarios)

// imagens

router.post('/upload', upload.single('imagem'))
// router.get('/getImage/:image', loginControll.getImage)

module.exports = {
    routes: router
}