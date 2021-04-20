const db = require('../database/config')
const agora = require('../utils/timestamp')
const crypto = require('crypto')

const list = (req, resp) => {
    const sql = "SELECT * FROM usuario"

    db.query(sql, (err, results) => {
        if(err) 
            return resp.json({success: false, errorMessage: "Erro ao executar a query: "+err.sqlMessage})
        return resp.json(results)
    })
}

const select = (req, resp) => {
    const { id } = req.params
    const sql = `SELECT * FROM usuario WHERE id=${id}`

    if(id)
        db.query(sql, (err, results) => {
            if(err) 
                return resp.json({success: false})
            return resp.json(results)
        })
}

const create = (req, resp) => {
    const hashSenha = crypto.createHash("sha256")
    const { login, senha, pessoa_id } = req.body
    
    //validação basica que verifica atraves de um operador ternario se os valores dos atributos retornam vazios, logo nem fazemos requisições ao banco.
    let validator = true

    !login ? validator = false : ""
    !senha ? validator = false : ""
    !pessoa_id ? validator = false : ""
    
    if(validator) {
        hashSenha.update(senha)
        const sql = `INSERT INTO usuario (login, senha, criado_em, atualizado_em, pessoa_id) values('${login}', '${hashSenha.digest("hex")}', '${agora}', '${agora}', '${pessoa_id}')`

        db.query(sql, (err, results) => {
            if(err) 
                return resp.json({success: false, errorMessage: "Erro ao executar a query: "+err.sqlMessage})
            return resp.json({success: true, response: results})
        })
    } else {
        return resp.json({success: false, errorMessage: "Todos os campos são obrigatorios"})
    }
}

const update = (req, resp) => {
    const { id } = req.params
    const { login, senha } = req.body
    const sql = `UPDATE usuario SET login='${login}', senha='${senha}', atualizado_em='${agora}'  WHERE id=${id} `

    let validator = true

    !id ? validator = false : ""
    !login ? validator = false : ""
    !senha ? validator = false : ""

    if(validator) {
        db.query(sql, (err, results) => {
            if(err)
                return resp.json({success: false, errorMessage: "Erro ao executar a query: "+err.sqlMessage})
            return resp.json({success: true, response: results })
        })
    } else {
        return resp.json({success: false, errorMessage: "Todos os campos são obrigatorios"})
    }
}

const drop = (req, resp) => {
    const { id } = req.params
    const sql = `DELETE FROM usuario WHERE id=${id}`

    if(id) {
        db.query(sql, (err, results) => {
            if(err)
                return resp.json({success: false, errorMessage: "Erro ao executar a query: "+err.sqlMessage})
            return resp.json({success: true, response: results })
        })
    } else {
        return resp.json({success: false, errorMessage: "obrigatorio um id valido"})
    }
}

const active = (req, resp) => {
    const { id } = req.params
    const sql = `UPDATE usuario SET atualizado_em='${agora}', desativado_em=NULL  WHERE id=${id} `

    if(id) {
        db.query(sql, (err, results) => {
            if(err)
                return resp.json({success: false, errorMessage: "Erro ao executar a query: "+err.sqlMessage})
            return resp.json({success: true, response: results })
        })
    } else {
        return resp.json({success: false, errorMessage: "obrigatorio um id valido"})
    }
}

const desactive = (req, resp) => {
    const { id } = req.params
    const sql = `UPDATE usuario SET atualizado_em='${agora}', desativado_em='${agora}'  WHERE id=${id} `

    if(id) {
        db.query(sql, (err, results) => {
            if(err)
                return resp.json({success: false, errorMessage: "Erro ao executar a query: "+err.sqlMessage})
            return resp.json({success: true, response: results })
        })
    } else {
        return resp.json({success: false, errorMessage: "obrigatorio um id valido"})
    }
}

module.exports = { list, select, create, update, drop, desactive, active }