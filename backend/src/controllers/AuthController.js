const db = require('../database/config')
const agora = require('../utils/timestamp')
const crypto = require('crypto')

const login = (req, resp) => {
    const hashSenha = crypto.createHash("sha256")
    const {login, senha} = req.body

    if(login && senha) {
        hashSenha.update(senha)
        const sql = `select pessoa.id, pessoa.nome, pessoa.sobrenome, pessoa.cpf, pessoa.perfil, pessoa.criado_em, pessoa.atualizado_em, pessoa.desativado_em  from pessoa, usuario where usuario.login = '${login}' && usuario.senha='${hashSenha.digest("hex")}' && usuario.pessoa_id=pessoa.id` 

        db.query(sql, (err, results) => {
            if(err) 
                return resp.json({error: true, errorMessage: "Erro ao executar a query: "+err.sqlMessage})
            return resp.json(results)
        })
    } 

}

module.exports = { login }