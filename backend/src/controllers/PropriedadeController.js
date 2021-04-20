const db = require('../database/config')
const agora = require('../utils/timestamp')

const list = (req, resp) => {
    const sql = "SELECT * FROM propriedade"

    db.query(sql, (err, results) => {
        if(err) 
            return resp.json({success: false, errorMessage: "Erro ao executar a query: "+err.sqlMessage})
        return resp.json(results)
    })
}

const select = (req, resp) => {
    const { id } = req.params
    const sql = `SELECT * FROM propriedade WHERE id=${id}`

    if(id)
        db.query(sql, (err, results) => {
            if(err) 
                return resp.json({success: false})
            return resp.json(results)
        })
}

const create = (req, resp) => {
    const { nome, produtor_id } = req.body
    
    //validação basica que verifica atraves de um operador ternario se os valores dos atributos retornam vazios, logo nem fazemos requisições ao banco.
    let validator = true

    !nome ? validator = false : ""
    !produtor_id ? validator = false : ""
    
    if(validator) {
        const sql = `INSERT INTO propriedade (nome, criado_em, atualizado_em, produtor_id) values('${nome}', '${agora}', '${agora}', '${produtor_id}')`

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
    const { nome, produtor_id } = req.body
    const sql = `UPDATE propriedade SET nome='${nome}', produtor_id='${produtor_id}', atualizado_em='${agora}'  WHERE id=${id} `

    let validator = true

    !id ? validator = false : ""
    !nome ? validator = false : ""
    !produtor_id ? validator = false : ""

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
    const sql = `DELETE FROM propriedade WHERE id=${id}`

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
    const sql = `UPDATE propriedade SET atualizado_em='${agora}', desativado_em=NULL  WHERE id=${id} `

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
    const sql = `UPDATE propriedade SET atualizado_em='${agora}', desativado_em='${agora}'  WHERE id=${id} `

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