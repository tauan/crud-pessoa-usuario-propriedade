const db = require('../database/config')
const agora = require('../utils/timestamp')

const list = (req, resp) => {
    const sql = "SELECT * FROM pessoa"

    db.query(sql, (err, results) => {
        if(err) 
            return resp.json({success: false, errorMessage: "Erro ao executar a query: "+err.sqlMessage})
        return resp.json(results)
    })
}

const select = (req, resp) => {
    const { id } = req.params
    const sql = `SELECT * FROM pessoa WHERE id=${id}`

    if(id)
        db.query(sql, (err, results) => {
            if(err) 
                return resp.json({success: false})
            return resp.json(results)
        })
}

const create = (req, resp) => {
    const { nome, sobrenome, cpf, perfil } = req.body
    const sql = `INSERT INTO pessoa(nome, sobrenome, cpf, perfil, criado_em, atualizado_em) values('${nome}', '${sobrenome}', '${cpf}', '${perfil}', '${agora}', '${agora}')`
    
    let validator = true

    !nome ? validator = false : ""
    !sobrenome ? validator = false : ""
    !cpf ? validator = false : ""
    !perfil ? validator = false : ""  
    
    if(validator) {
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
    const { nome, sobrenome, cpf, perfil } = req.body
    const sql = `UPDATE pessoa SET nome='${nome}', sobrenome='${sobrenome}', cpf='${cpf}', perfil='${perfil}', atualizado_em='${agora}'  WHERE id=${id} `

    let validator = true
    
    !id ? validator = false : ""
    !nome ? validator = false : ""
    !sobrenome ? validator = false : ""
    !cpf ? validator = false : ""
    !perfil ? validator = false : "" 

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
    const sql = `DELETE FROM pessoa WHERE id=${id}`

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
    const sql = `UPDATE pessoa SET atualizado_em='${agora}', desativado_em=NULL  WHERE id=${id} `

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
    const sql = `UPDATE pessoa SET atualizado_em='${agora}', desativado_em='${agora}'  WHERE id=${id} `

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