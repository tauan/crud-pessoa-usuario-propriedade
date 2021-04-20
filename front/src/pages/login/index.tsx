import React, { useContext, useState, useEffect } from 'react'
import Cookies from 'js-cookie'
import api from '../../services/api'
import styles from '../../styles/login.module.css'
import {AuthContext} from '../../contexts/AuthContext'

import {useRouter} from 'next/router'

const Login = () => {
    const { setLoged } = useContext(AuthContext)
    const [login, setLogin] = useState('')
    const [senha, setSenha] = useState('')
    const [erro, setErro] = useState(false)
    const [autenticando, setAutenticando] = useState(false)

    const router = useRouter()

    useEffect(() => {
        const cookies = Cookies.get("loged")
        if(cookies) {
            setLoged(true)
            router.push('/')
        }
    },[])

    const deleteCookies = () => {
        Cookies.remove("loged")
        Cookies.remove("user")
    }

    const submitLogin = async (e) => {
        e.preventDefault()
        setAutenticando(true)

        if(login && senha) {
            const response = await api.post("/login", {
                login,
                senha
            })
            setAutenticando(false)
            if(Array.isArray(response.data) && response.data.length === 1) {
                Cookies.set("loged", true)
                Cookies.set("user", response.data[0])
                setErro(false)
                setLoged(true)
                router.push('/')
                
            } else {
                setErro(true)
            }
        }
    }

    return (
        <div id={styles.app}>
            <div className="container">
                <header id={styles.header}>
                    <span>Login</span>
                </header>
            </div>
            <div className="container">
                <div className="container">
                    <div className={styles.flexRow}>
                        <div className={styles.left}>
                            <img src="./fazenda.png" alt="Imagem de uma fazenda"/>
                        </div>
                        <div className={styles.right}>
                            <p>AO SE CONECTAR, VOCÊ APROVEITA DE TODAS AS NOSSAS TECNOLOGIAS.</p>
                            <form className={styles.form} onSubmit={submitLogin} >
                                {autenticando && <div className={styles.authMessage}>Autenticando dados ...</div>}
                                {erro && <div className={styles.errorMessage}>Erro ao executar o login, cheque seus dados.</div>}
                                <input type="text" placeholder="Insira seu login" value={login} onChange={(e) => {setLogin(e.target.value)}} required />
                                <input type="password" placeholder="Insira sua senha" value={senha} onChange={(e) => {setSenha(e.target.value)}} required />
                                <input type="submit" value="Login" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login