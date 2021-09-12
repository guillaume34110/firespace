import React from 'react'
import { useRef, useState } from 'react';
import { useAuth } from '../context/AuthContext'
import { Link, useHistory } from "react-router-dom"

export default function Login() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const { login } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const history = useHistory()
    async function handleSubmit(e) {
        e.preventDefault()


        try {
            setError("")
            setLoading(true)
            await login(emailRef.current.value, passwordRef.current.value)
            history.push("/loadding")
        } catch {
            setError("erreur d'authentification")
        }
        setLoading(false)
    }

    return (

        <div className="main-log loggin-background">
            <div className="blue-card">
                <div className ="log-card">
                    <h1 className="text-center mb-4">FireSpace</h1>
                    <h2 className="text-center mb-4">Identification</h2>

                    {error && <div variant="danger">{error}</div>}
                    <form onSubmit={handleSubmit}>
                    <div >
                            <label type="email">Email :</label>
                            <input id="email" type="email" ref={emailRef} required defaultValue=''/>
                        </div>
                        <div >
                            <label type="email">mot de passe :</label>
                            <input id="password" type="password" ref={passwordRef} required defaultValue=''/>
                        </div>

                        <button className="btn margin-top" disabled={loading} type="submit">identifiez vous</button>
                    </form> 
                    </div>
                    <div className="link text-center">
                        <Link style={{color:'#f7f7f7cb'}} to="/forgot-password">mot de passe oublié ?</Link>
                    </div>
               
                <div className="link text-center">
                    il vous faut un compte?  <Link style={{color:'#f7f7f7cb'}} to="/signup">enregistrez vous</Link>
                </div>
            </div>

        </div>
    );
}
