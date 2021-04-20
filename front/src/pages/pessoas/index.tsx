import React, {useState, useEffect} from 'react'
import Template from '../../components/template'
import styles from '../../styles/pessoas.module.css'
import api from '../../services/api'

interface PessoaProps {
    id: Number,
    nome: String, 
    sobrenome: String,
    cpf: String,
    perfil: "administrador" | "produtor" | "tecnico"
}

const Pessoas = () => {
    const [pessoas, setPessoas] = useState([])
    const [search, setSearch] = useState('')
    const [novoUsuario, setNovoUsuario] = useState({} as PessoaProps)
    const [editando, setEditando] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    
    useEffect(()=> {
        getPessoas()
    },[])

    const openForm = () => {

    }

    const SetTabela = () => {
        const response = []
        if(pessoas && Array.isArray(pessoas) && pessoas.length > 0) {
            pessoas.filter(item => `${item.nome.toUpperCase()} ${item.sobrenome.toUpperCase()}`.includes(search.toUpperCase())).forEach(item => {
                response.push(
                <li key={item.id} onClick={()=> editPessoa(item)}>
                    <span>{item.id}</span>
                    <span>{item.nome} {item.sobrenome}</span>  
                    <span>{item.cpf}</span>  
                    <span>{item.perfil}</span>
                    <span>{item.desativado_em}</span>
                    
                </li>)
            })
            return(response)
        }else {
            return (<p>Nenhum dado a ser exibido</p>)
        }
        
    }

    const getPessoas = async () => {
        const response = await api.get("/pessoa")

        if(response.data && Array.isArray(response.data)) {
            if(response.data.length > 0) {
                setPessoas(response.data)
            } else {
                return (<p>Nenhum dado encontrado</p>)
            }
        }
    }

    const novaPessoa = () => {
        setIsOpen(true)
    }

    const onChangeBar = event => {
        setSearch(event.target.value)
    }

    const submitForm = async (e) => {
        e.preventDefault()
            
        if(novoUsuario.nome !== undefined && novoUsuario.nome !== "" && novoUsuario.sobrenome !== undefined && novoUsuario.sobrenome !== "" && novoUsuario.cpf !== undefined && novoUsuario.cpf !== "" && novoUsuario.perfil !== undefined && novoUsuario.perfil !== "") {
            
            if(!editando) { 
                const response = await api.post("/pessoa", novoUsuario)
                if(response.data.success !== undefined && response.data.success===true) {
                    getPessoas()
                    setNovoUsuario({})
                    alert("Cadastrado com sucesso.")
                    setIsOpen(false);
                } else {
                    alert("Não cadastrado")
                }
            } else {
                const response = await api.put(`/pessoa/${novoUsuario.id}`, novoUsuario)
                if(response.data && response.data.success !== undefined) {
                    getPessoas()
                    setNovoUsuario({})
                    alert("Alterado com sucesso.")
                    setEditando(false)
                    setIsOpen(false);
                }
            }
        }
        
        //console.log(novoUsuario)
    }

    const editPessoa = pessoa => {
        setEditando(true)
        setNovoUsuario(pessoa)
        setIsOpen(true)
    }

    const desactivePessoa = async id => {
        
        if(id) {
            const response = await api.put(`/pessoa/desabilitar/${id}`)
            if(response.data) {
                getPessoas()
                setNovoUsuario({})
                alert("Alterado com sucesso.")
                setEditando(false)
                setIsOpen(false);
            }
        }
    }

    const activePessoa = async id => {
        if(id) {
            const response = await api.put(`/pessoa/habilitar/${id}`)
            if(response.data) {
                getPessoas()
                setNovoUsuario({})
                alert("Ativado com sucesso.")
                setEditando(false)
                setIsOpen(false);
            }
        }
    }

    const deletePessoa = async id => {
        if(id) {
            const response = await api.delete(`/pessoa/${id}`)
            if(response.data) {
                getPessoas()
                setNovoUsuario({})
                alert("Deletado com sucesso.")
                setEditando(false)
                setIsOpen(false);
            }
        }
    }

    return(
        <Template>
            <p>Painel / Gerenciar pessoas</p>
            <div className={styles.navigation}>
                <div className="buttonCreate" onClick={novaPessoa}> Cadastrar nova pessoa</div>
                <input type="text" placeholder="Digite o nome da pessoa que deseja encontrar" className={styles.searchBar} onChange={onChangeBar} />   
            </div>
            {isOpen && (<div className={styles.registerContainer}>
                <form onSubmit={submitForm}>
                    <span>Nome: </span>
                    <input type="text" value={novoUsuario.nome !== undefined ? novoUsuario.nome: "" } onChange={(e) => {setNovoUsuario({...novoUsuario, nome: e.target.value})}} required />
                    <span>Sobrenome: </span>
                    <input type="text" value={novoUsuario.sobrenome !== undefined ? novoUsuario.sobrenome: "" } onChange={(e) => {setNovoUsuario({...novoUsuario, sobrenome: e.target.value})}} required />
                    <span>CPF: </span>
                    <input type="text" value={novoUsuario.cpf !== undefined ? novoUsuario.cpf: "" } onChange={(e) => {setNovoUsuario({...novoUsuario, cpf: e.target.value})}} required />
                    <span>Selecione o tipo de perfil</span>
                    <select onChange={(e) => {setNovoUsuario({...novoUsuario, perfil: e.target.value})}}>
                        <option value="">Selecione um tipo de perfil</option>
                        <option value="produtor">Produtor</option>
                        <option value="tecnico">Técnico</option>
                        <option value="administrador">Administrador</option>
                    </select>


                    {
                        !novoUsuario.desativado_em && <span className={styles.danger} onClick={()=> desactivePessoa(novoUsuario.id)}>Desativar pessoa</span> 
                    }
                    {
                        novoUsuario.desativado_em && <span className={styles.danger} onClick={()=> activePessoa(novoUsuario.id)}>Ativar pessoa</span> 
                    }

                    {editando && ( <span className={styles.danger} onClick={()=> deletePessoa(novoUsuario.id)}>Deletar conta</span> )}
                    


                    <input type="submit" value={editando ? "Salvar alteração" : "Cadastrar"}/>
                    <div className={styles.cancel} onClick={() => { 
        console.log(novoUsuario); setIsOpen(false); setNovoUsuario({})} }>Cancelar</div>

                </form>
            </div>)}
            <div className={styles.listagemPessoas}>
                <p>Listagem de pessoas</p> 
                <div className={styles.header}>
                    <span>ID</span> 
                    <span>Nome e sobrenome</span> 
                    <span>CPF</span> 
                    <span>Perfil</span> 
                    <span>Desativado</span>    
                </div> 
                <ul>
                    <SetTabela />
                </ul>  
            </div>               
        </Template>
    )
}

export default Pessoas