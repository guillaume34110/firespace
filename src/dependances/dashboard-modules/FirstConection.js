import React, { useEffect,  useState } from 'react'
import firebase from '../firebase/firebaseConfig'
import { useAuth } from '../context/AuthContext'
import {  useHistory } from "react-router-dom"
import { tutorial } from '../Dashboard'

export default function FirstConection() {
    const [userName, setUserName] = useState('')
    const { currentUser } = useAuth()
    const uid = currentUser.uid
    const history = useHistory()
    const [error, setError] = useState('')

    useEffect((uid) => {

        const name = firebase.database().ref('users/' + uid + '/name')
        name.get().then((snapshot) => {
            let previousList = snapshot.val()
            setUserName(previousList)
        })
    }, [])


    const createUserName = () => {
        const input = document.querySelector('.name-input')
        if (input !== null && input !== undefined) {
            if (input.value.length >= 4 && input.value.length <= 8) {
                setError('');
                
                const name = firebase.database().ref('users/' + uid + '/name')
                name.set(userName)
                if (history.location.pathname === '/creation') {
                    tutorial[0] = 1
                    history.push('/')
                }
            } else {
                setError("entrez un nom d'utilisateur")
            }
        }
    };


    return (
        <div >
            <div className="column">

                <p>nom d'utilisateur (4 a 8 caractéres)</p>
                <input type="text" className=" name-input " defaultValue={userName} placeholder="Nom utilisateur" minlength="4" maxlength="8" size="10" required onChange={(e) => { setUserName(e.target.value) }} />
                {error && <div variant="danger">{error}</div>}
                <p className="flex-center select m-10 " onClick={createUserName}>valider</p>
            </div>
            <div className="text-center ">
                identifiant utilisateur :  {currentUser.uid}
            </div>
        </div>
    )
}
