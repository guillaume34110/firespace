import { casesRef } from "../EcoMap"
import { basicLaser, enemiesWeapon, playerSprite, playerStats, shootArray } from "../Strategie"
import { slotArray } from "./DrawMap"
import { playerShoot } from "./PlayerShoot"
import { enemiesShoot } from "./Spaceman"
import { ship } from "./SpawnShip"


export const windowSize = { w: 0, h: 0 }
export const windowPosition = { x: 0, y: 0 }

export const windowSetPosition = (positionX, positionY) => {
    windowPosition.x = positionX
    windowPosition.y = positionY
    //if (window.innerWidth > 1280) windowPosition.x = (window.innerWidth - 1280) / 2 + positionX
    //if (window.innerWidth <= 1280) windowPosition.x = positionX
    //if (window.innerHeight <= 760) windowPosition.y = positionY 
    //if (window.innerHeight > 760) windowPosition.y = (window.innerHeight - 720) / 2 + positionY

}

export const windowResize = () => {
const body = document.body
const height = body.clientHeight;
const width = body.clientWidth;
    if (((window.innerHeight) / 720) !== windowSize.h || ((window.innerWidth) / 1280) !== windowSize.w) {
        windowSize.h = ((window.innerHeight) / 720)
        windowSize.w = ((window.innerWidth) / 1280)   
        for (let i = 0; i < casesRef.length; i++) {
            casesRef[i].w = windowSize.w * casesRef[i].wRef
            casesRef[i].h = windowSize.h * casesRef[i].hRef
        }
        for (let i = 0; i < ship.length; i++) {
            ship[i].w = windowSize.w * ship[i].wRef
            ship[i].h = windowSize.h * ship[i].hRef
        }

        if (slotArray !== null && slotArray !== undefined) {
            for (let i = 0; i < slotArray.length; i++) {
                if (slotArray[i] !== null && slotArray[i] !== undefined) {
                    slotArray[i].w = windowSize.w * slotArray[i].wRef
                    slotArray[i].h = windowSize.h * slotArray[i].hRef
                }
            }
        }
        if (enemiesShoot !== null && enemiesShoot !== undefined) {
            for (let i = 0; i < enemiesShoot.length; i++) {
                if (enemiesShoot[i] !== null && enemiesShoot[i] !== undefined) {
                    enemiesShoot[i].w = windowSize.w * enemiesShoot[i].wRef
                    enemiesShoot[i].h = windowSize.h * enemiesShoot[i].hRef
                }
            }
        }
        if (shootArray !== null && shootArray !== undefined) {
            for (let i = 0; i < shootArray.length; i++) {
                if (shootArray[i] !== null && shootArray[i] !== undefined) {
                    shootArray[i].w = windowSize.w * shootArray[i].wRef
                    shootArray[i].h = windowSize.h * shootArray[i].hRef
                }
            }
        }
        playerSprite.w = windowSize.w * playerSprite.wRef
        playerSprite.h = windowSize.h * playerSprite.hRef
    
     

        basicLaser.w = windowSize.w * basicLaser.wRef
        basicLaser.h = windowSize.h * basicLaser.hRef

        enemiesWeapon.w = windowSize.w * enemiesWeapon.wRef
        enemiesWeapon.h = windowSize.h * enemiesWeapon.hRef

        const player = document.querySelector('.player-baliste')
        if (player !== null){
            player.style.transform = `scale(${windowSize.w} ,${windowSize.h}) rotate(90deg)`
            const playerX = parseInt(player.style.left)
            const playerY = parseInt(player.style.top)
           
        
        }
        const planet = document.querySelector('.planet')
        if (planet !== null) planet.style.transform = `scale(${windowSize.w}, ${windowSize.h}) `

        const balisteEnd = document.querySelector('.baliste-end')
        if (balisteEnd !== null) balisteEnd.style.transform = `scale(${windowSize.w}, ${windowSize.h}) `

        const vedetteEnd = document.querySelector('.vedette-end')
        if (vedetteEnd !== null) vedetteEnd.style.transform = `scale(${windowSize.w}, ${windowSize.h}) `

        const croiseurEnd = document.querySelector('.croiseur-end')
        if (croiseurEnd !== null) croiseurEnd.style.transform = `scale(${windowSize.w}, ${windowSize.h}) `

        const transportEnd = document.querySelector('.transport-end')
        if (transportEnd !== null) transportEnd.style.transform = `scale(${windowSize.w}, ${windowSize.h}) `

        const spacemanEnd = document.querySelector('.spaceman-end')
        if (spacemanEnd !== null) spacemanEnd.style.transform = `scale(${windowSize.w}, ${windowSize.h}) `

        const spaceman = document.querySelectorAll('.spaceman')
        if (spaceman !== null && spaceman !== undefined) {
            for (let i = 0; i < spaceman.length; i++) {
                spaceman[i].style.transform = `scale(${-windowSize.w}, ${windowSize.h}) `
            }
        }
        const vedette = document.querySelectorAll('.vedette')
        if (vedette !== null && vedette !== undefined) {
            for (let i = 0; i < vedette.length; i++) {
                vedette[i].style.transform = `scale(${windowSize.w}, ${windowSize.h}) rotate(270deg)`
            }
        }
        const transport = document.querySelectorAll('.transport')
        if (transport !== null && transport !== undefined) {
            for (let i = 0; i < transport.length; i++) {
                transport[i].style.transform = `scale(${windowSize.w}, ${windowSize.h}) rotate(270deg)`
            }
        }
        const croiseur = document.querySelectorAll('.croiseur')
        if (croiseur !== null && croiseur !== undefined) {
            for (let i = 0; i < croiseur.length; i++) {
                croiseur[i].style.transform = `scale(${windowSize.w}, ${windowSize.h}) rotate(270deg)`
            }
        }
        const vortexJaune = document.querySelectorAll('.vortex-jaune')
        if (vortexJaune !== null && vortexJaune !== undefined) {
            for (let i = 0; i < vortexJaune.length; i++) {
                vortexJaune[i].style.transform = `scale(${windowSize.w}, ${windowSize.h}) `
            }
        }
        const vortexVert = document.querySelectorAll('.vortex-vert')
        if (vortexVert !== null &&  vortexVert !== undefined) {
            for (let i = 0; i < vortexVert.length; i++) {
                vortexVert[i].style.transform = `scale(${windowSize.w}, ${windowSize.h}) `
            }
        }
        const vortexRouge = document.querySelectorAll('.vortex-rouge')
        if (vortexRouge !== null && vortexRouge !== undefined) {
            for (let i = 0; i < vortexRouge.length; i++) {
                vortexRouge[i].style.transform = `scale(${windowSize.w}, ${windowSize.h}) `
            }
        }
        const bullet = document.querySelectorAll('.bullet')
        if (bullet !== null &&  bullet !== undefined) {
            for (let i = 0; i < bullet.length; i++) {
                bullet[i].style.transform = `scale(${windowSize.w}, ${windowSize.h}) `
            }
        }
        const laserSprite = document.querySelectorAll('.laser-sprite')
        if (laserSprite !== null &&  laserSprite !== undefined) {
            for (let i = 0; i < laserSprite.length; i++) {
                laserSprite[i].style.transform = `scale(${windowSize.w}, ${windowSize.h}) `
            }
        }
        const asteroid = document.querySelectorAll('.asteroid')
        if (asteroid !== null && asteroid !== undefined) {
            for (let i = 0; i < asteroid.length; i++) {
                asteroid[i].style.transform = `scale(${windowSize.w}, ${windowSize.h}) `
            }
        }
        const anim3d = document.querySelector('.d-anim')
        if ( anim3d.classList.contains('end') === true   ){ 
            anim3d.style.left = `${(window.innerWidth - 880 ) /2}px`
            anim3d.style.top  = `${(window.innerHeight - 500 ) /2}px`
            
        }

    }
}
