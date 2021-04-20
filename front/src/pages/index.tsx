import Head from 'next/head'

import { useContext } from 'react'

import HomeScreen from './home'
import LoginScreen from './login'

import {AuthContext} from '../contexts/AuthContext'

export default function Home() {
  const {loged} = useContext(AuthContext)
  return (
    <div className="container">
      <Head>
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </Head>
      {loged && <HomeScreen />}
      {!loged && <LoginScreen />}
    </div>
  )
}
