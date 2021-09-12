import React, { useRef, useState } from 'react';
import { useAuth } from '../context/AuthContext'
import { Link, useHistory } from "react-router-dom"

const Signup = () => {
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const { signup } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const history = useHistory()
    

    async function handleSubmit(e) {
        e.preventDefault()

        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError('les mots de passes ne corespondent pas')
        }
        try {
            setError("")
            setLoading(true)
            await signup(emailRef.current.value, passwordRef.current.value)
            history.push("/creation")
            
        } catch {
            setError("erreur lors de l'inscription")
        }
        setLoading(false)
    }

    

    return (

        <div className="main-log loggin-background">
            <div className="blue-card">
                <div  className ="log-card">
                    <h2 className="text-center mb-4">inscrivez vous</h2>

                    {error && <div variant="danger">{error}</div>}
                    <form onSubmit={handleSubmit}>
                    <div >
                            <label for="email">Email</label>
                            <input id="email" type="email" ref={emailRef} required />
                        </div>
                        <div >
                            <label for="password">mot de passe(minimum 6 cararctéres)</label>
                            <input id="password" type="password" ref={passwordRef} required />
                        </div>
                        <div >
                            <label for="password-confirm">confirmation du mot de passe</label>
                            <input id="password-confirm" type="password" ref={passwordConfirmRef} required />
                        </div>
                        <button className="btn" disabled={loading} type="submit">incrivez vous</button>
                    </form>
                </div>
<div className="w-100 text-center mt-2">
                vous avez deja un compte? <Link  style={{color:'#f7f7f7cb'}} to="/login">identifiez vous</Link>
            </div>
            </div>
            
        </div>
    );
};

export default Signup;