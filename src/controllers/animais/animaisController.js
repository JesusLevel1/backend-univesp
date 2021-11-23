'use strict';
const { error } = require('console');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const animaisData = require('../../data/animais');


const getAnimais = async (req, res, next) => {
    try{
        const pageNumber = req.query.pageNumber || 1
        const rowsPage = req.query.rowsPage || 9

        const animais = await animaisData.getAnimais(pageNumber, rowsPage)

        if (animais.length < 1 || animais.length === 0){
            return res.status(400).send( { message: 'Fim da página' } )
        }

        return res.status(200).send( {
            total: animais.length,
            data: animais.map(({
                IdAnimal,
                IdDoador,
                NomeAnimal,
                Sexo,
                Idade,
                Porte,
                ImagemAnimal,
                IdEspecie,
                BitCastrado,
                bitVacinado,
                bitVermifugado,
                DescricaoAnimal,
                bitDoado
            }) => { 
                return { 
                    IdAnimal,
                    IdDoador,
                    NomeAnimal,
                    Sexo,
                    Idade,
                    Porte,
                    ImagemAnimal,
                    IdEspecie,
                    BitCastrado,
                    bitVacinado,
                    bitVermifugado,
                    DescricaoAnimal,
                    bitDoado
                }
            })
        });
    }catch (error){
        res.status(500).send( error.message )
    }
}

const getAnimal = async (req, res, next ) => {
    try{
        const idAnimal = req.params.IdAnimal;

        const getAnimal = await animaisData.getAnimal(idAnimal)

        return res.status(200).send({ 
            data: {
                Animal: {
                    nomeAnimal: getAnimal[0].NomeAnimal,
                    Sexo: getAnimal[0].Sexo,
                    idade: getAnimal[0].Idade,
                    Porte: getAnimal[0].Porte,
                    bitCastrado: getAnimal[0].bitCastrado,
                    bitVacinado: getAnimal[0].bitVacinado,
                    bitVermifugado: getAnimal[0].bitVermifugado,
                    DescricaoAnimal: getAnimal[0].DescricaoAnimal
                },
                Usuario: {
                    Nome: getAnimal[0].Nome,
                    NomeInstit: getAnimal[0].NomeInstit,
                    IdUsuario: getAnimal[0].IdUsuario
                }
            }, 
        })
    }catch (error){
        return error.message
    }
}

//CADASTRO ANIMAIS
const cadastroAnimais = async (req,res,next) => {
    try{
        const data = req.body

        const token = req.headers.authorization.split(' ')[1];
        const decode = jwt.verify(token, process.env.JWT_KEY);
        const IdDoador = decode.IdUsuario

        if (!data.NomeAnimal||!data.Sexo||!data.Porte||!data.IdEspecie){
            return res.status(400).send({message: 'Preencha todos os paramêtros: NomeAnimal, Sexo, Porte, Senha, IdEspecie'})
        }
        
        await animaisData.cadastroAnimais(IdDoador, data)
        
        return res.status(200).send({
            message: 'Cadastrado com sucesso',
        });

    }catch(error){
        return error.message
    }
}


module.exports = {
    cadastroAnimais,
    getAnimais,
    getAnimal
}