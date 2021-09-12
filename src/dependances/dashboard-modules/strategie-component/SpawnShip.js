
import { playerStats } from "../Strategie"
import { slotArray } from "./DrawMap"
import { enemiesShoot } from './Spaceman'
import { windowSize } from "./WindowControl"


export const ship = [
    { x:0 , y:0 ,wRef:60, w: 0,hRef: 60 , h:0, className: 'croiseur', life: 2, speedY: 0, speedX: -4,speedXRef:-4, damage: 5, direction: 0, fireRate: 30 ,score : 20},
    { x:0 , y:0 ,wRef:60, w: 0,hRef:60 , h: 0, className: 'vedette', life: 2, speedY: 0, speedX: -8,speedXRef:-8, damage: 5, direction: 0, fireRate: 0 ,score : 20},
    { x:0 , y:0 ,wRef:60, w: 0,hRef:60 , h:0, className: 'transport', life: 2, speedY: 3,speedYRef:3, speedX: -8,speedXRef:-8, damage: 5, direction: 0, fireRate: 0 ,score: 20},
]

const createShip = (cW, x, y) => {

    const newShip = document.createElement("div")
    newShip.h = cW.h
    newShip.w = cW.w
    newShip.wRef = cW.wRef
    newShip.hRef = cW.hRef
    newShip.x = x
    newShip.y = y
    newShip.className = cW.className
    newShip.style.top = `${y*windowSize.h}px`
    newShip.style.left = `${x*windowSize.w}px`
    newShip.style.position = 'absolute'
    newShip.style.transform = `scale(${windowSize.w}, ${windowSize.h}) rotate(270deg)`
    newShip.id = `ship`
    newShip.life = cW.life
    newShip.speed = cW.speed
    newShip.speedX = cW.speedX
    newShip.speedY = cW.speedY
    newShip.direction = cW.direction
    newShip.fireRate = cW.fireRate
    newShip.score = cW.score
    const draw = document.querySelector('.map')
    if(draw!==null &&draw!==undefined)draw.appendChild(newShip)
    enemiesShoot.push(newShip)
}
const transportShipAnim = () => {
    const wWidth = window.innerWidth
    const wHeight = window.innerHeight
    const rightLimit = wWidth
    const leftLimit = 0
    const topLimit = 0
    const bottomLimit = wHeight

    const player = document.querySelector('.player-baliste')
    if (player !== null) {
    let pY = playerStats.y
    

    for (let i = 0; i < enemiesShoot.length; i++) {
        if (enemiesShoot[i].className === "transport") {
            let x = enemiesShoot[i].x
            let y = enemiesShoot[i].y
            let speedY = pY - y;
            
            if ( speedY >= enemiesShoot[i].speedY ){
                speedY= enemiesShoot[i].speedY
            }else if (speedY <= -enemiesShoot[i].speedY){
                speedY = -enemiesShoot[i].speedY
            }

            x += enemiesShoot[i].speedX

            enemiesShoot[i].direction += speedY / 10
            if (enemiesShoot[i].direction > enemiesShoot[i].speedY) {
                enemiesShoot[i].direction = enemiesShoot[i].speedY
            }
            if (enemiesShoot[i].direction < -enemiesShoot[i].speedY) {
                enemiesShoot[i].direction = -enemiesShoot[i].speedY
            }
            if (y > topLimit && y < bottomLimit - enemiesShoot[i].w) {
                y += enemiesShoot[i].direction
            }

            if (y <= topLimit){ y += enemiesShoot[i].speedY}
            if (y >= bottomLimit - enemiesShoot[i].w) y -= enemiesShoot[i].speedY
            enemiesShoot[i].x = x
            enemiesShoot[i].y = y
            if (x > rightLimit || x < leftLimit) {
                enemiesShoot[i].remove()
                if (enemiesShoot[i]!== undefined) enemiesShoot.splice(i, 1)
            }

        }
        }
    }
}

export const spawnShip = () => {
    transportShipAnim()

    for (let i = 0; i < slotArray.length; i++) {
        if (slotArray[i].classList.contains('vortex') === true) {
            slotArray[i].fireRate -= 1
            if (slotArray[i].fireRate <= 0) {//firre
                const cW = ship[slotArray[i].key]
                let x = slotArray[i].x
                let y = slotArray[i].y
                createShip(cW, x, y)
                slotArray[i].fireRate = 200 + Math.round(Math.random() * 100)
            }
        }
    }
}

