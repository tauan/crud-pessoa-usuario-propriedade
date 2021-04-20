import React, {useContext, useEffect, useState} from 'react'
import {useRouter} from 'next/router'
import styles from  '../../styles/home.module.css'

import api from '../../services/api'

import Template from '../../components/template'
import MainMenu from '../../components/menu'
import Card from '../../components/card'

const Home = () => {
    const [pessoas, setPessoas] = useState([])
    const [propriedades, setPropriedades] = useState([])
    const [tecnicos, setTecnicos] = useState([])
    const [produtores, setProdutores] = useState([])

    useEffect(() => { 
        getPessoas()
        getPropriedades()
    },[])

    useEffect(() => {
        const produtor = []
        const tecnico = []
        if( Array.isArray(pessoas) && pessoas.length > 0) {
            pessoas.forEach(item => {
                item.perfil === 'produtor' ? produtor.push(item) : ""
                item.perfil === 'tecnico' ? tecnico.push(item) : ""
            })
            setProdutores(produtor)
            setTecnicos(tecnico)
        }
    }, [pessoas])

    const getPessoas = async () => {
        const response = await api.get("/pessoa")
        setPessoas(response.data)
    }

    const getPropriedades = async () => {
        const response = await api.get("/propriedade")
        setPropriedades(response.data)
    }

    return(
            <Template>
                <p>Painel / Pagina inicial</p>
                <div className={styles.cards}>
                    <Card imageUrl="/tecnico.png" descricao="Técnicos cadastrados" count={tecnicos.length} styles={styles}  />
                    <Card imageUrl="/produtor.png" descricao="Produtores cadastrados" count={produtores.length} styles={styles}  />
                    <Card imageUrl="/propriedade.png" descricao="Propriedades cadastradas" count={propriedades.length} styles={styles}  />
                </div>
            </Template>     
        )
}

export default Home