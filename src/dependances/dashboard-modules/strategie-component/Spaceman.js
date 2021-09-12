import { slotArray } from "./DrawMap"
import { enemiesWeapon, playerSprite, playerStats } from "../Strategie"
import {  windowSize } from './WindowControl'

export const enemiesShoot = []

const createShoot = (cW, x, y) => {
   
    const newShot = document.createElement("div")
    
    newShot.h = cW.h
    newShot.w = cW.w
    newShot.hRef = cW.hRef
    newShot.wRef = cW.wRef
    newShot.x = x
    newShot.y = y
    newShot.className = cW.className
    newShot.style.top = `${y*windowSize.h}px`
    newShot.style.left = `${x*windowSize.w}px`
    newShot.style.position = 'absolute'
    newShot.style.transform = `scale(${windowSize.w}, ${windowSize.h}) `
    newShot.speedX = cW.speedX
    newShot.speedY = cW.speedY
    const draw =document.querySelector('.map')
    if(draw!==null &&draw!==undefined)draw.appendChild(newShot)
    enemiesShoot.push(newShot)


}
const croiseurShoot = () => {
    for (let i = 0; i < enemiesShoot.length; i++) {
        if (enemiesShoot[i].className === 'croiseur') {
            enemiesShoot[i].fireRate -= 1

            if (enemiesShoot[i].fireRate <= 0) {//firre

                const player = document.querySelector('.player-baliste')
                if (player !== null) {
                    let pX = playerStats.x
                    let pY = playerStats.y + playerSprite.hRef/2
                    const cW = enemiesWeapon[0]
                    let x = enemiesShoot[i].x
                    let y = enemiesShoot[i].y + enemiesShoot[i].hRef/2
                    let deltaX = pX - x + playerSprite.wRef;
                    let deltaY = pY - y;
                    let distance = Math.ceil(Math.sqrt((Math.pow(deltaX, 2)+Math.pow(deltaY , 2))))
                    let step = Math.ceil( distance /  enemiesWeapon[0].speed)
                    let speedX = deltaX/step
                    let speedY = deltaY/step
                    cW.speedX = speedX 
                    cW.speedY = speedY + ((-Math.random()*(enemiesWeapon[0].speed/5)) + (Math.random()*(enemiesWeapon[0].speed/5)))

                    createShoot(cW, x, y)

                    enemiesShoot[i].fireRate = 50 + Math.round(Math.random() * 100)
                }
            }
        }
    }
}


export const spacemanShoot = () => {
    enemiesShootAnim()
    croiseurShoot()
    for (let i = 0; i < slotArray.length; i++) {
        if (slotArray[i].className === 'spaceman') {
            slotArray[i].fireRate -= 1

            if (slotArray[i].fireRate <= 0) {//firre
                const player = document.querySelector('.player-baliste')
                if (player !== null) {
                    let pX = playerStats.x
                    pX += playerSprite.wRef/2
                    let pY = playerStats.y
                    pY += playerSprite.hRef/2
                    const cW = enemiesWeapon[0]
                    let x = slotArray[i].x
                    let y = slotArray[i].y +  (slotArray[i].hRef/2)
                    let deltaX = pX - x + playerSprite.wRef;
                    let deltaY = pY - y;
                    let distance = Math.ceil(Math.sqrt((Math.pow(deltaX, 2)+Math.pow(deltaY , 2))))
                    let step = Math.ceil( distance / enemiesWeapon[0].speed)
                    let speedX = deltaX/step
                    let speedY = deltaY/step
                    cW.speedX = speedX 
                    cW.speedY = speedY + ((-Math.random()*2) + (Math.random()*2))
                    createShoot(cW, x, y)

                    slotArray[i].fireRate = 150 + Math.round(Math.random() * 100)
                }
            }
        }
    }
}


const enemiesShootAnim = () => {

    const wWidth = window.innerWidth
    const wHeight = window.innerHeight 
    const rightLimit = wWidth  
    const leftLimit = 0
    const topLimit = 0
    const bottomLimit = wHeight


    for (let i = 0; i < enemiesShoot.length; i++) {
        
            let x = enemiesShoot[i].x 
            let y = enemiesShoot[i].y 
            if (enemiesShoot[i].className !== "transport") {
            x += enemiesShoot[i].speedX
            y += enemiesShoot[i].speedY
            }
            enemiesShoot[i].x = x
            enemiesShoot[i].y = y
            x = x * windowSize.w
            y = y * windowSize.h
            enemiesShoot[i].style.left = `${x}px`
            enemiesShoot[i].style.top = `${y}px`
            if (x > rightLimit - enemiesShoot[i].w || x < leftLimit + enemiesShoot[i].w || y < topLimit || y > bottomLimit) {
                enemiesShoot[i].remove()
                if (enemiesShoot[i]!== undefined)enemiesShoot.splice(i, 1)
            
        }
    }
}