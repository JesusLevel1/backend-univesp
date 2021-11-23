'use strict';
const utils = require('../utils');
const config = require('../../config')
const sql = require('mssql');

const getAnimais = async (pageNumber, rowsPage) => {
    try{

        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('animais');
        const getAnimais = await pool.request()
            .input('pageNumber', sql.Int, pageNumber)
            .input('rowsPage', sql.Int, rowsPage)  
            .query(sqlQueries.getAnimais);
        return getAnimais.recordset;

    }catch (error){
        return error.message;
    }
}

const getAnimal = async (IdAnimal) => {
    try{

        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('animais');
        const getAnimal = await pool.request()
            .input('IdAnimal', IdAnimal)
            .query(sqlQueries.getAnimal);
        return getAnimal.recordset;

    }catch(error){  
        return error.message
    }
}

const cadastroAnimais = async (IdDoador, data) => {
    try{
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('animais');
        const cadastraAnimais = await pool.request()
            .input('IdDoador', IdDoador)
            .input('NomeAnimal', data.NomeAnimal)
            .input('Sexo', data.Sexo)
            .input('Idade', data.Idade)
            .input('Porte',  data.Porte)
            .input('ImagemAnimal',  data.ImagemAnimal)
            .input('IdEspecie',  data.IdEspecie)
            .input('BitCastrado',  data.BitCastrado)
            .input('BitVacinado', data.BitVacinado)
            .input('BitVermifugado', data.BitVermifugado)
            .input('DescricaoAnimal', data.DescricaoAnimal)
            .query(sqlQueries.cadastraAnimais);
        return cadastraAnimais.recordset;
    }catch (error){
        return error.message;
    }
}

module.exports = {
    cadastroAnimais,
    getAnimais,
    getAnimal
}