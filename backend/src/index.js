const express = require("express")
const cors = require('cors')
const http = require('http')

const routes = require('./routes.js')

const app = express()
const server = http.Server(app) // Não há necessidade de ser feita desta forma, apenas esta aqui para futuras integrações com socketIO onde se faz necessario esta disposição do code

app.use(cors())
app.use(express.json())
app.use(routes)


server.listen(3333)