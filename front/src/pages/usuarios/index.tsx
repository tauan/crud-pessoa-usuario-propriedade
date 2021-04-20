import React, {useState, useEffect} from 'react'
import Template from '../../components/template'
import styles from '../../styles/usuario.module.css'

import api from '../../services/api'

const Usuarios = () => {
    const [usuarios, setUsuarios] = useState([])

    useEffect(() => {
        getUsuarios()
    }, [])

    const novoUsuario = () => {}
    const onChangeBar = e => {}

    const getUsuarios = async () => {
        const response = await api.get("/usuario")

        if(Array.isArray(response.data) && response.data.length > 0) {
            setUsuarios(response.data)
        }
    }

    return(
        <Template>
            <p>Painel / Gerenciar usuarios</p>
             <div className={styles.navigation}>
                <div className="buttonCreate" onClick={novoUsuario}> Cadastrar nova pessoa</div>
                <input type="text" placeholder="Digite o nome da pessoa que deseja encontrar" className={styles.searchBar} onChange={onChangeBar} />   
            </div>           
        </Template>
    )
}

export default Usuarios