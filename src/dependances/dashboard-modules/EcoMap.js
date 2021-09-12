import React, { useEffect, useState } from 'react';
import arrow from '../assets/img/arrow.png';
import close from '../assets/img/close.png'
import empty from '../assets/img/planettes/empty.png'
import firebase from '../firebase/firebaseConfig'
import { useAuth } from '../context/AuthContext'
import { dropItem, folder, indexPos,  oldmap, reload, test } from '../dashboard-modules/Header'
import { returnMap } from './Strategie';
import { levelPush } from './strategie-component/PushNewLevel';

export let userId
let bufferIndexPos = 0
export let mapName = ''
export const casesRef = [
    { x:0,y:0 ,src: empty,wRef:60,hRef:60, w: 60, h: 60, className: 'empty', speed: 0, life: 0 },
    { x:0,y:0 ,src: empty,wRef:60,hRef:60, w: 60, h: 60, className: 'planet', speed: 0, life: 20, score: 200 },
    { x:0,y:0 ,src: empty,wRef:60,hRef:60, w: 60, h: 60, className: 'asteroid', speed: 0, life: 15, score: 30 },
    { x:0,y:0 ,src: empty,wRef:60,hRef:60, w: 60, h: 60, className: 'spaceman', speed: 0, life: 6, fireRate: 50, damage: 1, score: 60 },
    { x:0,y:0 ,src: empty,wRef:60,hRef:60, w: 60, h: 60, className: 'vortex vortex-vert', id: "vedette", speed: 0, life: 5, fireRate: 6, key: 1, score: 50 },
    { x:0,y:0 ,src: empty,wRef:60,hRef:60, w: 60, h: 60, className: 'vortex vortex-jaune', id: "croiseur", speed: 0, life: 5, fireRate: 6, key: 0, score: 50 },
    { x:0,y:0 ,src: empty,wRef:60,hRef:60, w: 60, h: 60, className: 'vortex vortex-rouge', id: "transport", speed: 0, life: 5, fireRate: 6, key: 2, score: 50 },
    { x:0,y:0 ,src: empty,wRef:60,hRef:60, w: 60, h: 60, className: 'player-baliste', id: "player", speed: 10, life: 5 }
]
 const info = [0]
export let cases = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
export default function EcoMap() {
    
    const { currentUser } = useAuth()
    const uid = currentUser.uid
    userId = uid
    const [newMap, setNewMap] = useState(cases)
    const [popupE, setPopupE] = useState()

    const [move, setMove] = useState(0)

    const forceRender = () => {
        mouseClean()
        const force = document.querySelector('.mini-slot')
        const value = document.querySelector('.slot')
       let saveItem 
        if (force !== null  && force !== undefined) {
            
            saveItem = value.value
            dropItem[0] = 'empty'
            force.click()
            dropItem[0] = casesRef[saveItem].className
            force.click()
            dropItem[0] = ''
                }        //closePopup()
    }
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
    const pushEmpty = (e) => {
        if (cases[e.target.id] !== 7 && cases[e.target.id] !==1) {
            cases[e.target.id] = 0
            setNewMap(cases)
            setMove(move + 1)
        }

    }
    const pushPlanet = (e) => {
       
        if (cases[e.target.id] !== 7 ) {
            onlyOne(e, 1)
        cases[e.target.id] = 1
        setNewMap(cases)
        setMove(move + 1)
        }
    }
    const pushAsteroid = (e) => {
        if (cases[e.target.id] !== 7 && cases[e.target.id] !==1) {
        cases[e.target.id] = 2
        setNewMap(cases)
        setMove(move + 1)
        }
    }
    const pushSpaceman = (e) => {
        if (cases[e.target.id] !== 7 && cases[e.target.id] !==1) {
        cases[e.target.id] = 3
        setNewMap(cases)
        setMove(move + 1)
        }
    }
    const pushVedette = (e) => {
        if (cases[e.target.id] !== 7 && cases[e.target.id] !==1) {
        cases[e.target.id] = 4
        setNewMap(cases)
        setMove(move + 1)
        }
    }
    const pushCroiseur = (e) => {
        if (cases[e.target.id] !== 7 && cases[e.target.id] !==1) {
        cases[e.target.id] = 5
        setNewMap(cases)
        setMove(move + 1)
        }
    }
    const pushTransport = (e) => {
        if (cases[e.target.id] !== 7 && cases[e.target.id] !==1) {
        cases[e.target.id] = 6
        setNewMap(cases)
        setMove(move + 1)
        }
    }
    const pushPlayer = (e) => {
    
        if ( cases[e.target.id] !==1) {
            onlyOne(e, 7)
        cases[e.target.id] = 7
        setNewMap(cases)
        setMove(move + 1)
        }
    }
    const onlyOne = (e, x) => {
        const old = document.querySelector(`.${casesRef[x].className}`)
        if (old !== null && old !== undefined) {
            if (old.id !== '') {
                cases[old.id] = 0
            }
        }
    }
    const planetPopup = (e) => {

        setPopupE(e)
          
        if (dropItem[0] === 'planet') pushPlanet(e)
        else if (dropItem[0] === 'empty') pushEmpty(e)
        else if (dropItem[0] === 'asteroid') pushAsteroid(e)
        else if (dropItem[0] === 'spaceman') pushSpaceman(e)
        else if (dropItem[0] === 'vortex1') pushVedette(e)
        else if (dropItem[0] === 'vortex2') pushCroiseur(e)
        else if (dropItem[0] === 'vortex3') pushTransport(e)
        else if (dropItem[0] === 'player-baliste') pushPlayer(e)
        else if (dropItem[0] === '') {
            
            info[0] = cases[e.target.id]
            let positionX = e.target.offsetLeft;
            let positionY = e.target.offsetTop;
            const popup = document.querySelector('.popup-select');
            const arrow = document.querySelector('#arrow-p');
            const slot = document.querySelector('.slot')

            positionX += slot.offsetWidth/1.5
            positionY += slot.offsetHeight /20
            popup.style.display = 'flex';
            if (positionX > e.view.innerWidth / 1.5) {
               
                positionX -= 320
                arrow.style.left = '230px'
                arrow.style.transform = 'rotate(0deg)'
            } else {
                arrow.style.left = '5px'
                arrow.style.transform = 'rotate(180deg)'
            }

            if (positionY > e.view.innerHeight / 1.5) {
                positionY += -100
                arrow.style.top = '120px'
            } else {
                arrow.style.top = '5px'
            }

            
            popup.style.left = `${positionX}px`
            popup.style.top = `${positionY}px`
        }
    }
    
    function readMap() {

        const map = firebase.database().ref(`users/` + uid + '/map')
        map.get().then((snapshot) => {
            let previousList = snapshot.val();
            if (returnMap[0] === true && test[0]===true && levelPush[0]===false&& oldmap[0]===false) previousList.unshift(folder)
            
            if (previousList !== null) {
                if (returnMap[0] === false) previousList.push(folder)
                if (previousList[indexPos] !== null && previousList[indexPos] !== undefined) {
                    //if (previousList.length-1 < indexPos) {
                   
                    cases = previousList[indexPos].cases
                    setNewMap(cases)
                    setMove(move + 1)
                    forceRender()
                    mapName = previousList[indexPos].name
                    //}
                } else {
                   
            
                    cases = folder.cases
                    setNewMap(cases)
                    setMove(move + 1)
                    forceRender()
                    mapName = folder.name
                }
            } else {
                
              
                cases = folder.cases
                setNewMap(cases)
                setMove(move + 1)
                forceRender()
                mapName = folder.name
            }
            setNewMap(cases)
        })
    }
    const watch = () => {
        if (indexPos !== undefined) {
            if (indexPos !== bufferIndexPos || reload[0] === true) {
                setNewMap(cases)
                
                reload[0] = false
                bufferIndexPos = indexPos
                readMap()
                setNewMap(cases)
                forceRender()

            }
        } window.requestAnimationFrame(watch);
    }
    window.requestAnimationFrame(watch);

    useEffect(() => {
        readMap()
        setNewMap(cases)
        forceRender()

    }, []);


    return (
        <div className="eco-card star-background">
            <div className="row h-100 w-100 flex-center">
                <div className="map-display">
                    {cases && newMap.map((item, index) => {
                        return (
                            <li  id={index} className="slot" value={item}  key={index}>
                                <div className=" mini-slot fit"  id={index} onClick={planetPopup}><div id={index}    className={casesRef[item].className}   /></div>
                            </li>
                        )
                    })}
                </div>
                <div className="hidden popup-select">
                    <img alt =" " className="popup-arrow" id="arrow-p" src={arrow} width="24px" height="24px"></img>
                    <div className=" popup">
                        
                            <img alt =" " onClick={closePopup} className="close " src={close} height="24px" width='24px'></img>
                     
                        <div className="ml-10 column  popup-text">
                            <div>
                                <p>Nom :{casesRef[info[0]].className}</p>
                                <p>Vie :{casesRef[info[0]].life}</p>
                                <p>Points :{casesRef[info[0]].score}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
