const { Router } = require('express')
const PessoaController = require('./controllers/PessoaController')
const UsuarioController = require('./controllers/UsuarioController')
const PropriedadeController = require('./controllers/PropriedadeController')
const AuthController = require('./controllers/AuthController')

const routes = Router()

routes.get("/", (req, resp) => { return resp.json({message: "Index :D"}) })

routes.get("/pessoa", PessoaController.list)
routes.get("/pessoa/:id", PessoaController.select)
routes.post("/pessoa", PessoaController.create)
routes.put("/pessoa/:id", PessoaController.update)
routes.put("/pessoa/habilitar/:id", PessoaController.active)
routes.put("/pessoa/desabilitar/:id", PessoaController.desactive)
routes.delete("/pessoa/:id", PessoaController.drop)

routes.get("/usuario", UsuarioController.list)
routes.get("/usuario/:id", UsuarioController.select)
routes.post("/usuario", UsuarioController.create)
routes.put("/usuario/:id", UsuarioController.update)
routes.put("/usuario/habilitar/:id", UsuarioController.active)
routes.put("/usuario/desabilitar/:id", UsuarioController.desactive)
routes.delete("/usuario/:id", UsuarioController.drop)

routes.get("/propriedade", PropriedadeController.list)
routes.get("/propriedade/:id", PropriedadeController.select)
routes.post("/propriedade", PropriedadeController.create)
routes.put("/propriedade/:id", PropriedadeController.update)
routes.put("/propriedade/habilitar/:id", PropriedadeController.active)
routes.put("/propriedade/desabilitar/:id", PropriedadeController.desactive)
routes.delete("/propriedade/:id", PropriedadeController.drop)

routes.post("/login", AuthController.login)

module.exports = routes