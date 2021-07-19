import { NextPage } from 'next'
import Head from 'next/head'
import { useState, ChangeEvent, FormEvent } from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'

import styles from './Login.module.scss'
import 'react-toastify/dist/ReactToastify.css';

const Login: NextPage = () => {
    
    const [login, setLogin] = useState({
        identifier: "",
        password: ""
    })

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {value, name} = e.target

        setLogin({
            ...login,
            [name]: value
        })
    }

    const loginSubmit = async (e: FormEvent) => {
        e.preventDefault()

        try {

            if (!login.identifier || !login.password) {
                return toast('Please fill all inputs.', { type: "error" })
            }
    
            const {data} = await axios.post('http://localhost:1337/auth/local/', login)
            sessionStorage.setItem('token', data.jwt)
            
        } catch (err) {
            toast('Invalid Email / Password.', { type: "error", draggable: true })
        }
        
    }

    return (
        <div className={styles.container}>
            <Head>
                <title> TMDEV | Login </title>
            </Head>

            <form onSubmit={loginSubmit} className={styles.form}>
                <div className={styles.loginform}>
                    <h1> Login </h1>
                    <label htmlFor="email"> Email Address </label>
                    <input type="email" name="identifier" value={login.identifier} onChange={handleChange} />
                    <label htmlFor="password"> Password </label>
                    <input type="password" name="password" value={login.password} onChange={handleChange} />
                    <button> Login </button>
                </div>
            </form>

            <ToastContainer/>
        </div>
    )
}

export default Login