import React, { useRef, useState } from 'react';
import { useAuth } from '../context/AuthContext'
import {  useHistory } from "react-router-dom"
import FirstConection from '../dashboard-modules/FirstConection';
export default function UpdateProfile() {

    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const { currentUser, updatePassword, updateEmail } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    function handleSubmit(e) {
        e.preventDefault()

        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError('les mots de passes ne correspondent pas')
        }

        const promises = []
        setLoading(true)
        setError("")
        if (emailRef.current.value !== currentUser.email) {
            promises.push(updateEmail(emailRef.current.value))
        }
        if (passwordRef.current.value ) {
            promises.push(updatePassword(passwordRef.current.value))
        }

        Promise.all(promises)
        .then(() => {
            history.push("/")
        })
        .catch(() => {
            setError('erreur lors de la création')
        })
        .finally(() => {
            setLoading(false)
        
        })
    }
    return (

       
           
                <div  className ="log-card flex-center column">
                    <h2 className="text-center mb-4">mettre a jour le profil</h2>

                    {error && <div variant="danger">{error}</div>}
                    <form className="column" onSubmit={handleSubmit}>
                    <div className="column update-card">
                            <label type="email">Email</label>
                            <input id="email" type="email" ref={emailRef} required
                                defaultValue={currentUser.email} />

                        </div>
                        <div className="column update-card">
                            <label type="password" >mot de passe (minimum 6 caractéres)</label>
                            <input  id="password" type="password" ref={passwordRef}
                                placeholder="leave blank to keep the same" />

                        </div>
                        <div className="column update-card">
                            <label type="password-confirm" >confirmation mot de passe</label>
                            <input id="password-confirm" type="password" ref={passwordConfirmRef}
                                placeholder="leave blank to keep the same" />
                        </div>
                        <div className="column update-card">
                        <button className="select" disabled={loading} type="submit">mettre a jour mot de passe / email</button>
                        </div>
                        <div className="column update-card">
                        <FirstConection />
                        </div>
                    </form>
                

            </div>
            
        
    );
};

