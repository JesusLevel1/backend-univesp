select 
    U.IdUsuario,
    U.Nome,
    U.Celular,
    U.FotoUser,
	I.NomeInstit,
	I.SiteInstit,
	I.SobreInstit

from T_Usuario U
LEFT JOIN T_Instituicao I ON U.IdUsuario = I.IdUsuario
where U.IdUsuario = @IdUsuario