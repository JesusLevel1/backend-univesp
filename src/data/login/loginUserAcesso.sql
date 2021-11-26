SELECT 
    IdUsuario,
    Nome,
    DataNasc,
    EmailAcesso,
    Senha,
    Numero,
    Bairro,
    Cidade,
    Complemento,
    imagem,
    BitInstit,
    BitAtivo
FROM T_Usuario
WHERE EmailAcesso = @EmailAcesso AND Senha = @Senha AND BitAtivo = 1