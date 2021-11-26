INSERT INTO T_Usuario 
(
    Nome, 
    Celular,
    DataNasc, 
    EmailAcesso, 
    Senha, 
    Numero, 
    Bairro, 
    Cidade, 
    Complemento,
    imagem
)
VALUES
(
    @Nome, 
    @Celular,
    @DataNasc, 
    @EmailAcesso, 
    @Senha, 
    @Numero, 
    @Bairro, 
    @Cidade, 
    @Complemento,
    @imagem
)

SELECT SCOPE_IDENTITY() AS IdUsuario
