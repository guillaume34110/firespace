import { cases, casesRef } from '../EcoMap'
import { windowPosition, windowResize, windowSetPosition, windowSize } from './WindowControl'
import { playerStats, restart } from '../Strategie'
export let slotArray = []

let token = 0
let shipPrint = false

export const drawMap = () => {

    if (restart[0] === true) {
        token = 0
        shipPrint = false
        restart[0] = false
        
      
    }
    let xMap = 0
    let yMap = 0
    for (let i = 0; i < cases.length; i++) {

        if (cases[i] !== 0 && cases[i] !== 7) {
            let xPos 
            if (window.innerWidth > 900) xPos = (xMap * ( ((window.innerWidth - ((window.innerWidth / 15)/6)) / 15)) +((window.innerWidth / 15)/4) )
            if (window.innerWidth < 900) xPos = (xMap * ( ((window.innerWidth - ((window.innerWidth / 15)/2)) / 15)) +((window.innerWidth / 15)/4) )
            let yPos 
            if (window.innerHeight > 500) yPos =  (yMap * ( (window.innerHeight - (( window.innerHeight / 7)/3)) / 7)) +(( window.innerHeight / 7)/2)
            if (window.innerHeight < 500) yPos =  (yMap * ( (window.innerHeight  - ( window.innerHeight / 7)/1.5) / 7 ) + (window.innerHeight / 7)/2)
            for (let j = 0; j < slotArray.length; j++) {
                if (parseInt(slotArray[j].id) === i
                    && (xPos !== slotArray[j].posX
                        || yPos !== slotArray[j].posY)
                ) {
                    let newRef = casesRef[cases[i]]
                    newRef.life = slotArray[j].life
                    slotArray[j].remove()
                    if (slotArray[j] !== undefined) slotArray.splice(j, 1)
                    createSlot(newRef, xPos, yPos, i)
                }
            }
            if (token <= cases.length) {
                createSlot(casesRef[cases[i]],  xPos,  yPos, i)
            }
        } else if (cases[i] === 7 && shipPrint === false) {

            let xPos 
            if (window.innerWidth > 900) xPos = (xMap * ( ((window.innerWidth - ((window.innerWidth / 15)/6)) / 15)) +((window.innerWidth / 15)/4) )
            if (window.innerWidth < 900) xPos = (xMap * ( ((window.innerWidth - ((window.innerWidth / 15)/2)) / 15)) +((window.innerWidth / 15)/4) )
            let yPos 
            if (window.innerHeight > 500) yPos =  (yMap * ( (window.innerHeight - (( window.innerHeight / 7)/3)) / 7)) +(( window.innerHeight / 7)/2)
            if (window.innerHeight < 500) yPos =  (yMap * ( (window.innerHeight  - ( window.innerHeight / 7)/1.5) / 7 ) + (window.innerHeight / 7)/2)
            
            let newRef = casesRef[cases[i]]
            createSlot(newRef, xPos, yPos, i)
            shipPrint = true
       
        }
        token++
        xMap++
        if (xMap > 14) {
            xMap = 0
            yMap++
        }
    }


}
const createSlot = (cS, x, y, i) => {

    const newSlot = document.createElement("div")
  
    newSlot.h = cS.h
    newSlot.w = cS.w
    newSlot.hRef = cS.hRef
    newSlot.wRef = cS.wRef
    newSlot.x = x/(window.innerWidth/1280)
    newSlot.y = y/(window.innerHeight/720)
    newSlot.className = cS.className
    newSlot.style.transform = `scale(${windowSize.w}, ${windowSize.h}) `
    newSlot.style.position = 'absolute'
    newSlot.style.top = `${y}px`
    newSlot.style.left = `${x}px`
    newSlot.speed = cS.speed
    newSlot.id = `${i}`
    newSlot.life = cS.life
    newSlot.posX = x
    newSlot.posY = y
    newSlot.fireRate = cS.fireRate
    newSlot.key = cS.key
    newSlot.score = cS.score
    newSlot.timer = 0
    newSlot.setAttribute('draggable' , false)
    const draw  = document.querySelector('.map')
    if(draw!==null &&draw!==undefined)draw.appendChild(newSlot)
    if (cS.className !== 'player-baliste') {
        slotArray.push(newSlot)
        
        
    }else{
        playerStats.x = x/(window.innerWidth/ 1280)
        playerStats.y = y/(window.innerHeight / 720)
    }
}