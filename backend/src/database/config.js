const mysql = require('mysql')

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'mydb'
})

const disconnect = () => connection.end()

const connect = () => connection.connect(err => {
    err ? console.error('Erro ao conectar, erro: ', err.stack) : console.log('Conectado ao database, id de conexão:', connection.threadId)
} )

const query = (resp, sql) => {
    connection.query(sql, (error, results, fields) => {
        console.log(results)
        if(error) 
            return resp.json({success: false, errorMessage: "Erro ao executar a query: "+error.sqlMessage})
        
        if(results) {
            if(results[0] && results[0].insertId )
                return resp.json({success: true})
            return resp.json({success: true, response: results})
        }

        fields ? console.log(fields) : ""
    })
}

module.exports = db