import React from 'react'
import { useRef, useState } from 'react';
import { useAuth } from '../context/AuthContext'
import { Link } from "react-router-dom"

export default function ForgotPassword() {
    const emailRef = useRef()

    const { resetPassword } = useAuth()
    const [error, setError] = useState('')
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)

    async function handleSubmit(e) {
        e.preventDefault()


        try {
            setMessage('')
            setError("")
            setLoading(true)
            await resetPassword(emailRef.current.value)
            setMessage('an email was send')

        } catch {
            setError('failed to reset password')
        }
        setLoading(false)
    }

    return (

        <div className="main-log loggin-background">
            <div className="blue-card">
                <div  className ="log-card">
                    <h2 className="text-center mb-4">remise a zéro du mot de passe</h2>
                    {message && <div variant="success">{message}</div>}
                    {error && <div variant="danger">{error}</div>}
                    <form  onSubmit={handleSubmit}>
                        <div >
                        <label for="email">Email</label>
                        <input id="email" type="email" ref={emailRef} required />
                        </div>
                        <button className="btn" disabled={loading} type="submit">remise a zéro du mot de passe</button>
                    </form></div>
                    <div className="w-100 text-center mt-3">
                        <Link style={{color:'#f7f7f7cb'}} to="/login">identifiez vous</Link>
                    </div>
                
            <div className="w-100 text-center mt-2">
                il vous faut un compte?  <Link style={{color:'#f7f7f7cb'}} to="/signup">crée un acompte</Link>
            </div>
             </div>
           
        </div>
    );
}
