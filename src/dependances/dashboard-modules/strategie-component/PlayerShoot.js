import {shootArray,playerSprite,basicLaser, playerStats} from '../Strategie'
import {spaceBar} from './PlayerMove'
import { windowSize } from './WindowControl'

let shootToken = true
let shootSpeed = 0

const createShoot = (cW, x, y) => {

    const newShot = document.createElement("div")
   /// newShot.src = cW.src
    newShot.height =cW.h
    newShot.width = cW.w
    newShot.h =cW.h
    newShot.w = cW.w
    newShot.hRef =cW.hRef
    newShot.wRef = cW.wRef
    newShot.x = x
    newShot.y = y 
    newShot.className = cW.className
    newShot.style.top = `${y * windowSize.h}px`
    newShot.style.left = `${x * windowSize.w}px`
    newShot.style.transformOrigin = 'center'
    newShot.style.transform = `scale(${windowSize.w}, ${windowSize.h}) `
    newShot.speedX = cW.speedX
    const draw  = document.querySelector('.map')
    if(draw!==null && draw!==undefined)draw.appendChild(newShot)   
    shootArray.push(newShot)   
}


export const playerShoot = () => {
    
    if ( shootToken === true 
        && playerStats.dead === false
        && playerStats.win === false) {
        let x = playerStats.x - basicLaser.speedX
        let y = playerStats.y
        //if (window.innerHeight > 500)
         y +=  (((playerSprite.hRef/2)-(basicLaser.hRef/2))/windowSize.h)
       //if (window.innerHeight < 500) y += (playerSprite.hRef/2) + (basicLaser.hRef/2)
        x += (( playerSprite.wRef - (basicLaser.wRef/2))/windowSize.w)
        const cW = basicLaser
        createShoot(cW,x,y)
        shootToken = false
        shootSpeed = 0
    } else if (spaceBar === 0 && shootToken === false) {
        
        shootSpeed++
        if (shootSpeed >= 10) {
            shootToken = true
            shootSpeed = 0
        }
    } else if (spaceBar === 1 && shootToken === false) {
        shootSpeed++
        if (shootSpeed >= 10) {
            shootToken = true
            shootSpeed = 0
        }
    }
}
export const shootAnim = () => {

    const wWidth = window.innerWidth
    const rightLimit = wWidth - basicLaser.wRef
    for (let i = 0; i < shootArray.length; i++) {
        let x = shootArray[i].x
        let y = shootArray[i].y
        x += shootArray[i].speedX
        shootArray[i].x = x
        x = x * windowSize.w 
        
        shootArray[i].style.left = `${x}px`
     
        if (x > rightLimit) {
            shootArray[i].remove()
            shootArray.splice(i,1)
        }
    }
}
