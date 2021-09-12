import React from 'react';
import {  useHistory } from 'react-router-dom';
import spaceback from './assets/img/map_back.gif'
import playerBaliste60p from './assets/img/icons/spritesheetBliste60p.png'
import playerBaliste30p from './assets/img/icons/spritesheetBliste30p.png'
import vortexVedette60p from './assets/img/icons/spritesheetVortexVedette60p.png'
import vortexVedette30p from './assets/img/icons/spritesheetVortexVedette30p.png'
import vedette60p from './assets/img/icons/spritesheetVedette60p.png'
import vortexCroiseur60p from './assets/img/icons/spritesheetVortexcroiseur60p.png'
import vortexCroiseur30p from './assets/img/icons/spritesheetVortexcroiseur30p.png'
import Croiseur60p from './assets/img/icons/spritesheetCroiseur60p.png'
import vortexTransport60p from './assets/img/icons/spritesheetVortexTransport60p.png'
import vortexTransport30p from './assets/img/icons/spritesheetVortexTransport30p.png'
import Transport60p from './assets/img/icons/spritesheetTransport60p.png'
import spacemant60p from './assets/img/icons/spritesheetSpaceman60p.png'
import spacemant30p from './assets/img/icons/spritesheetSpaceman30p.png'
import planet60p from './assets/img/icons/spritesheetPlanet60p.png'
import planet30p from './assets/img/icons/spritesheetPlanet30p.png'
import asteroid60p from './assets/img/icons/spriteshhetAsteroid60p.png'
import asteroid30p from './assets/img/icons/spriteshhetAsteroid30p.png'
import laser from './assets/img/icons/spriteLaser.png'
import balisteEnd from './assets/img/endscreen/spritesheetBalisteend.png'
import croiseurEnd from './assets/img/endscreen/spritesheetCroiseurEnd.png'
import vedetteEnd from './assets/img/endscreen/spritesheetVedetteEnd.png'
import transportEnd from './assets/img/endscreen/spritesheetTransportEnd.png'
import spacemanEnd from './assets/img/endscreen/spritesheetScacemanEnd.png'
import main from './assets/img/background_main.jpg'





let counter = 0
const DLoadding = () => {
    const history = useHistory()



    const messages = () => {
        const msg = document.querySelector('.load-message')
        let newCounter = (counter - 5) / 2
        if (newCounter < 0) newCounter = 0
        if (newCounter === 0) msg.innerHTML = "Chargement : initialisation des données"
        if (newCounter === 1) msg.innerHTML = "Chargement : Nettoyage des vaiseaux"
        if (newCounter === 2) msg.innerHTML = "Chargement : Verification des missiles"
        if (newCounter === 3) msg.innerHTML = "Chargement : Evacuation des planettes"
        if (newCounter === 4) msg.innerHTML = "Chargement : Thermoformage des astéroides"
        if (newCounter === 5) msg.innerHTML = "Chargement : Synthonisation des univers"
        if (newCounter === 6) msg.innerHTML = "Chargement : Application du systéme anti-triches"
        if (newCounter === 7) msg.innerHTML = "Chargement : Matrixage des donnés utilisateur"
        if (newCounter === 7) msg.innerHTML = "Chargement : Revitalisation des pixels"
        if (newCounter === 8) msg.innerHTML = "Chargement : Conexion aux diférents multivers"
        if (newCounter === 9) msg.innerHTML = "Chargement : Mise en place du systéme de clonage"
        if (newCounter === 10) msg.innerHTML = "Chargement : Lustrage des sphéres"
    }

    const loadBar = () => {
        const bar = document.querySelector('.load-progress')
        let newCounter = (counter - 4) / 2
        if (newCounter < 0) newCounter = 0
        bar.classList.remove(`w-${(newCounter - 1) * 10}`)
        bar.classList.add(`w-${newCounter * 10}`)
    }

    const loadding = () => {
        loadBar()
        messages()
      
        counter++
        if (counter === 24) history.push('/')
    }

    return (
        <div className="blue-load loggin-background">
            <div className="main-load ">
                <div className = "load-card">
                    <h2 className="load-message"> </h2>
                    <div className="load-bar"> <div className="load-progress w-0"> </div> </div>
                </div>
            </div>
            <div className="z--10">
                <img alt =" " src={spaceback} onLoad={loadding} className="star-background z--10" />
                <img alt =" " src={main} onLoad={loadding} className="main-dash z--10" />
                <img alt =" " src={playerBaliste60p} onLoad={loadding} className="player-baliste z--10" />
                <img alt =" " src={planet60p} onLoad={loadding} className="planet z--10" />
                <img alt =" " src={spacemant60p} onLoad={loadding} className="spaceman z--10" />
                <img alt =" " src={vedette60p} onLoad={loadding} className="vedette z--10" />
                <img alt =" " src={Transport60p} onLoad={loadding} className="transport z--10" />
                <img alt =" " src={Croiseur60p} onLoad={loadding} className="croiseur z--10" />
                <img alt =" " src={vortexCroiseur60p} onLoad={loadding} className="vortex-jaune z--10" />
                <img alt =" " src={vortexVedette60p} onLoad={loadding} className="vortex-vert z--10" />
                <img alt =" " src={vortexTransport60p} onLoad={loadding} className="vortex-rouge z--10" />
                <img alt =" " src={laser} onLoad={loadding} className="laser-sprite z--10" />
                <img alt =" " src={asteroid60p} onLoad={loadding} className="asteroid z--10" />
                <img alt =" " src={balisteEnd} onLoad={loadding} className="baliste-end z--10" />
                <img alt =" " src={croiseurEnd} onLoad={loadding} className="croiseur-end z--10" />
                <img alt =" " src={transportEnd} onLoad={loadding} className="transport-end z--10" />
                <img alt =" " src={vedetteEnd} onLoad={loadding} className="vedette-end z--10" />
                <img alt =" " src={spacemanEnd} onLoad={loadding} className="spaceman-end z--10" />
                <img alt =" " src={asteroid30p} onLoad={loadding} className="mini-asteroid z--10" />
                <img alt =" " src={planet30p} onLoad={loadding} className="mini-planet z--10" />
                <img alt =" " src={spacemant30p} onLoad={loadding} className="mini-spaceman z--10" />
                <img alt =" " src={vortexVedette30p} onLoad={loadding} className="mini-vortexvert z--10" />
                <img alt =" " src={vortexCroiseur30p} onLoad={loadding} className="mini-vortexjaune z--10" />
                <img alt =" " src={vortexTransport30p} onLoad={loadding} className="mini-vortexrouge z--10" />
                <img alt =" " src={playerBaliste30p} onLoad={loadding} className="mini-baliste z--10" />
            </div>
        </div>

    );
};

export default DLoadding