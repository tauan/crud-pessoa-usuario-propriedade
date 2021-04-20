import React, {useContext, useEffect} from 'react'
import {useRouter} from 'next/router'
import styles from  '../styles/home.module.css'
import {AuthContext} from '../contexts/AuthContext'


import MainMenu from './menu'

const Template = props => {
    const {logout, loged} = useContext(AuthContext)
    const router = useRouter()

    useEffect(() => {  
        if(!loged) 
            router.push('/login')
    },[])

    return(
        <div id={styles.app}>
            <div className="container">
                <nav className={styles.nav}>
                    <span onClick={logout}>Desconectar</span>
                </nav>
            </div>    
            <div className="container">
                <div id={styles.containerGeral}>
                    <MainMenu />
                    <div id={styles.main}>
                        {props.children}
                    </div>
                </div>    
            </div>  
            
        </div>
        )
}

export default Template