
import React, { useEffect } from 'react'
import { useHistory } from "react-router-dom"
import { dropItem, test } from './Header'
import { retryLevel, useToken } from './Strategie'

export default function LatNavBar() {
    const history = useHistory()

    useEffect(() => {
       

        if (history.location.pathname === "/strategie") {
            const activeLink = document.querySelector(".-stra");
            activeLink.classList.add("active");
        } else if (history.location.pathname === "/reglages") {
            const activeLink = document.querySelector(".-regl");
            activeLink.classList.add("active");
        } else if (history.location.pathname === "/") {
            const activeLink = document.querySelector(".-dash");
            activeLink.classList.add("active");
        }
    }, [])
    const mouseClean = () => {
        
        dropItem[0] = ''
        const buttonClear = document.querySelector('.active-header')
        if (buttonClear !== null) buttonClear.classList.remove('active-header')
        const mouseClear = document.querySelector('#mouse')
        if (mouseClear !== null) mouseClear.remove()
    }
    const closePopup = () => {
        const popup = document.querySelector('.popup-select');
        if (popup !== null) popup.style.display = 'none';
    }

    const linkStratégie = () => {
        mouseClean()
        closePopup()
        if (useToken[0] === true) useToken[0] = false
        if (test[0] === true) test[0] = false
        if (retryLevel[0] === true) retryLevel[0] = false

        history.push("/strategie")
    }

    const linkReglages = () => {
        closePopup()
        mouseClean()
        history.push("/reglages")
        
    }
    const linkDashboard = () => {
        closePopup()
        mouseClean()
        history.push("/")
    }
const closeNav = () => {
    const eco = document.querySelector('.eco-card')
    const nav = document.querySelector('.nav-card')
    const close = document.querySelector('.close-nav')
    const mainSecond = document.querySelector('.main-second')
    close.classList.remove('unhidde')
    eco.classList.remove('hidden')
    eco.classList.add('w-100')
    mainSecond.classList.remove('hidden')
    nav.classList.remove('unhidde')
    nav.classList.remove('w-100p')
    nav.classList.remove('h-100p')
}
    return (
<>
<div onClick={closeNav} className = "closer close-nav "></div>
        <div className="nav-card column">
            <div onClick={linkDashboard} className="flex-center select -dash">Création</div>
            <div onClick={linkStratégie} className="flex-center select -stra">Partie aléatoire</div>
            <div onClick={linkReglages} className="flex-center select -regl">Réglages</div>
        </div>
        </>
    )
}
