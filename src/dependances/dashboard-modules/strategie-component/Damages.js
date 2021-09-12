import { shootArray, basicLaser, playerStats, playerSprite } from '../Strategie'
import { hitboxMatch, hit } from './Hitbox'
import { slotArray } from './DrawMap'
import { cases} from '../EcoMap'
import { enemiesShoot } from './Spaceman'
import { playerRepulse } from './PlayerMove'
import { windowSize } from './WindowControl'

export let damageAnim = false
let animCount = 0
let animTime = 0
const animSlotDamage = []
let slotCount = 1

export const damageEnemies = () => { //degats tir player sur enemies fixes
    enemiesShootDamage()
    palyerColision()
    for (let i = 0; i < slotArray.length; i++) {
        let slotX = slotArray[i].x
        let slotWidth = slotArray[i].wRef 
        let slotY = slotArray[i].y
        let slotHeight = slotArray[i].hRef 
        for (let j = 0; j < shootArray.length; j++) {
            let laserX = shootArray[j].x
            laserX += shootArray[j].wRef/2 
            let laserWidth = shootArray[j].wRef
            let laserY = shootArray[j].y
            laserY -= shootArray[j].hRef/2 //epaisseur laser 
            let laserHeight = shootArray[j].h
            hitboxMatch(slotX, laserX, slotY, laserY, slotWidth, laserWidth, slotHeight, laserHeight)
            if (hit[0] === 1) {
                hit[0] = 0
                shootArray[j].remove()
                if (shootArray[j] !== undefined) shootArray.splice(j, 1)
                slotArray[i].life -= 1
                let animSlotToken = false
                for (let k = 0; k< animSlotDamage.length ; k++){
                    if (animSlotDamage[k] === slotArray[i]){
                        animSlotToken = true
                    }
                }
                if (animSlotToken === false)animSlotDamage.push(slotArray[i])
              
                if (slotArray[i].life <= 0) {
                    playerStats.score += slotArray[i].score
                    if (slotArray[i].className === 'planet') playerStats.win = true
                    cases[parseInt(slotArray[i].id)] = 0
                    slotArray[i].remove()
                    if (slotArray[i] !== undefined) slotArray.splice(i, 1)

                }
            }
        }
    }
}
const enemiesShootDamage = () => { //degats tir player vers enemies volants
    for (let i = 0; i < enemiesShoot.length; i++) {
        if (enemiesShoot[i].id === 'ship') {
            let slotX = enemiesShoot[i].x
            let slotWidth = enemiesShoot[i].wRef
            let slotY = enemiesShoot[i].y
            let slotHeight = enemiesShoot[i].hRef
            for (let j = 0; j < shootArray.length; j++) {
                let laserX = shootArray[j].x
                //laserX += shootArray[j].w/2 
                let laserWidth = shootArray[j].wRef
                let laserY = shootArray[j].y
                //laserY -= shootArray[j].h/2 //epaisseur laser 
                let laserHeight = shootArray[j].hRef
                hitboxMatch(slotX, laserX, slotY, laserY, slotWidth, laserWidth, slotHeight, laserHeight)
                if (hit[0] === 1) {
                    hit[0] = 0
                    shootArray[j].remove()
                    if (shootArray[j] !== undefined) shootArray.splice(j, 1)
                    enemiesShoot[i].life -= 1
                    let animSlotToken = false
                for (let k = 0; k< animSlotDamage.length ; k++){
                    if (animSlotDamage[k] === enemiesShoot[i]){
                        animSlotToken = true
                    }
                }
                if (animSlotToken === false)animSlotDamage.push(enemiesShoot[i])
                    if (enemiesShoot[i].life <= 0) {
                        playerStats.score += enemiesShoot[i].score
                        cases[parseInt(enemiesShoot[i].id)] = 0
                        enemiesShoot[i].remove()
                        if (enemiesShoot[i] !== undefined) enemiesShoot.splice(i, 1)
                    }
                }
            }
        }
    }
}



export const playerDamage = () => {// degats tir ennemies sur player

    const player = document.querySelector('.player-baliste')
    if (player !== null) {
        
        let slotX = playerStats.x
        let slotWidth = playerSprite.wRef 
        let slotY = playerStats.y
        let slotHeight = playerSprite.hRef 
        for (let j = 0; j < enemiesShoot.length; j++) {
            let laserX = enemiesShoot[j].x
            //laserX += enemiesShoot[j].w
            let laserWidth = enemiesShoot[j].wRef
            let laserY = enemiesShoot[j].y
          //  laserY -= 5 //epaisseur laser 
            let laserHeight = enemiesShoot[j].hRef
            hitboxMatch(slotX, laserX, slotY, laserY, slotWidth, laserWidth, slotHeight, laserHeight)
            if (hit[0] === 1) {
                hit[0] = 0
                enemiesShoot[j].remove()
                if (enemiesShoot[j] !== undefined) enemiesShoot.splice(j, 1)
                playerStats.life -= 1
                damageAnim = true
                if (playerStats.life <= 0) {
                    playerStats.x = 0
                    playerStats.y = 0
                    player.classList.add('hidden')
                    playerStats.dead = true
                    player.remove()
                    
                }
            }
        }
    }


}

const palyerColision = () => {// degats enemies fixes sur player + colision
    const player = document.querySelector('.player-baliste')
    if (player !== null) {
        let playerX = playerStats.x
        let playerWidth = playerSprite.wRef * windowSize.w
        let playerY = playerStats.y
        let playerHeight = playerSprite.hRef * windowSize.h
        for (let j = 0; j < slotArray.length; j++) {
            let ennemieX = slotArray[j].x
            let ennemieWidth = slotArray[j].wRef * windowSize.w
            let ennemieY = slotArray[j].y
            let ennemieHeight = slotArray[j].hRef * windowSize.h  
            hitboxMatch(playerX, ennemieX, playerY, ennemieY, playerWidth, ennemieWidth, playerHeight, ennemieHeight)
            if (hit[0] === 1) {
                hit[0] = 0
                slotArray[j].life -= 1
                if (slotArray[j].life <= 0) {
                    if (slotArray[j].className === 'planet') playerStats.win = true
                    slotArray[j].remove()
                    if (slotArray[j] !== undefined) slotArray.splice(j, 1)
                }
                playerStats.life -= 1
                damageAnim = true
                playerRepulse()
                if (playerStats.life <= 0) {
                    playerStats.dead = true
                    player.remove()
                }
            }
        }
    }
}



export const enemisDamgesAnim = () => {
   
    if (slotCount === 2) {
        for (let i = 0; i < animSlotDamage.length; i++) {
            animSlotDamage[i].timer += 1
            let x = (animSlotDamage[i].x + 5)* windowSize.w
            animSlotDamage[i].style.left = `${x}px`
           
            
        }
    }
    if (slotCount === 4) {
        slotCount = 1
        
        for (let i = 0; i < animSlotDamage.length; i++) {
            if (animSlotDamage[i].timer !== 0 ){
            animSlotDamage[i].timer += 1
            let x = (animSlotDamage[i].x - 5) * windowSize.w
            animSlotDamage[i].style.left = `${x}px`
            }
            if (animSlotDamage[i].timer >= 6) {
                animSlotDamage[i].timer = 0
                animSlotDamage.splice(i, 1)
            }

        }

 
    }
    slotCount++
}

    export const playerDamageAnim = () => {
       
        const player = document.querySelector('.player-baliste')
        animCount++
        animTime++
        if (player !== null && player !== undefined) {
            if (animCount === 5) player.classList.add('hidden')
            if (animCount === 10) {
                player.classList.remove('hidden')
                animCount = 0
                if (animTime > 80) {
                    animTime = 0
                    damageAnim = false
                }
            }
        }
    }