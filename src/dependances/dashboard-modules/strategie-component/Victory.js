import { slotArray } from './DrawMap'
import { enemiesWeapon, playerSprite, playerStats } from '../Strategie'
import { stats, scoringF } from './LevelStats'
import { windowPosition, windowSetPosition, windowSize } from './WindowControl'
import { timeStop } from './Time'
import { push } from './PushNewLevel'
import { enter, shipPos } from './PlayerMove'
import { test } from '../Header'
import { top, bottom } from './PlayerMove'
import { enemiesShoot } from './Spaceman'


let keycounter = 0
let keyPosition = 0
export const statsToken = [false]
export const checkToken = [false]

const animEnd = () => {
    document.querySelector('.map').classList.remove('no-cursor')
    const creation = document.querySelector('.new-creation-btn')
    const newBattle = document.querySelector('.new-battle')
    const retry = document.querySelector('.retri-btn')
    if (bottom[0] === 1 || keycounter > 0 || top[0] === 1) {
        if (keycounter === 0) {
            if (bottom[0] === 1) keyPosition++
            if (top[0] === 1) keyPosition--
            if (keyPosition === 0) keyPosition = 3
            if (keyPosition === 4) keyPosition = 1
            if (keyPosition === 1) {
                newBattle.classList.remove('active-end')
                creation.classList.remove('active-end')
                retry.classList.add('active-end')
            }
            if (keyPosition === 2) {
                newBattle.classList.add('active-end')
                creation.classList.remove('active-end')
                retry.classList.remove('active-end')
            }
            if (keyPosition === 3) {
                newBattle.classList.remove('active-end')
                creation.classList.add('active-end')
                retry.classList.remove('active-end')
            }

        }
        keycounter++
        if (keycounter === 10) {
            keycounter = 0
        }
    }
    if (enter === 1) {
        if (keyPosition === 1) {
            retry.classList.remove('active-end')
            retry.click()
            return
        }
        if (keyPosition === 2) {
            newBattle.classList.remove('active-end')
            newBattle.click()
            return
        }
        if (keyPosition === 3) {
            creation.classList.remove('active-end')
            creation.click()
            return
        }
    }
    const player = document.querySelector('.player-baliste')
    if (player !== null && playerStats.dead !== true) {
        const rightLimit = window.innerWidth

        let x = playerStats.x
        if (x > 0 && x < rightLimit) {

            x += playerStats.speedX
            shipPos.x = x
            playerStats.x = x
        }
        if (x >= rightLimit) {
            player.remove()
            playerStats.win = true
            endScreen()
        }
        if (x < 0) endScreen()
    } else { endScreen() }
}
const endShipAnim = () => {
    const selmap = document.querySelector('.d-anim')
    let rnd
    rnd = Math.floor(Math.random() * 5) + 1
    selmap.classList.add('end')
    if (rnd === 1) selmap.classList.add('baliste-end')
    if (rnd === 2) selmap.classList.add('vedette-end')
    if (rnd === 3) selmap.classList.add('croiseur-end')
    if (rnd === 4) selmap.classList.add('transport-end')
    if (rnd === 5) selmap.classList.add('spaceman-end')

    if (window.innerWidth > 500) {
        selmap.style.left = `${(window.innerWidth - 880) / 2}px`
        selmap.style.top = `${(window.innerHeight - 500) / 2}px`
    }
    windowSize.w = 0
    windowSize.h = 0
}
export const victory = () => {
    let victoryToken = true
    for (let i = 0; i < slotArray.length; i++) {
        if (slotArray[i].className === 'planet') {
            victoryToken = false

        }
    }
    if (playerStats.dead === true || (victoryToken === true && playerStats.win === true)) {
        for (let i = 0; i < slotArray.length; i++) {
            slotArray[i].remove()
            console.log('victory')
            if (slotArray[i] !== undefined) slotArray.splice(i, 1)

        }
        for (let i = 0; i < enemiesShoot.length; i++) {
            enemiesShoot[i].remove()
            if (enemiesShoot[i] !== undefined) enemiesShoot.splice(i, 1)

        }
        timeStop[0] = true
        animEnd()
    }
}
export const checkStats = () => {
    const scoreDiv = document.querySelector('.score-div')
    scoreDiv.classList.remove('hidden')
    if (scoringF !== undefined) {

        for (let i = 0; i < scoringF.length; i++) {
            const cW = scoringF[i]
            windowSetPosition(50, (50 + (i * 30)))
            let x = windowPosition.x
            let y = windowPosition.y
            cW.className = 'stat-list'
            createStat(cW, x, y)
        }

    }
}


const createStat = (cW, x, y) => {
    if (test[1] !== true) {
        const newStat = document.createElement("div")

        newStat.className = cW.className
        newStat.innerHTML = `utilisateur : ${cW.name},score : ${cW.score},life : ${cW.life} ,time: ${cW.time}`
        document.querySelector('.score-div').appendChild(newStat)
    }
}
const gameOver = () => {
    const scoreDiv = document.querySelector('.score-div')
    scoreDiv.classList.remove('hidden')
    const newStat = document.createElement("div")
    newStat.className = "game-over"
    newStat.innerHTML = `<h2>Tu as perdu essaye encore<h2>`
    document.querySelector('.score-div').appendChild(newStat)
}




const checkBtn = () => {
    top[0] = 0
    bottom[0] = 0
    const endBtn = document.querySelectorAll('.end-btn')
    for (let i = 0; i < endBtn.length; i++) {
        endBtn[i].classList.remove('hidden')

    }
}

const endScreen = () => {

    if (statsToken[0] === false && playerStats.dead !== true) {
        keyPosition = 0
        stats()
        push()
        checkBtn()
        endShipAnim()
        statsToken[0] = true
    }
    if (checkToken[0] === false && playerStats.dead !== true) {
        keyPosition = 0
        checkStats()
        checkToken[0] = true
    }
    if (playerStats.dead === true && statsToken[0] === false) {
        keyPosition = 0
        checkBtn()
        gameOver()
        endShipAnim()
        statsToken[0] = true
    }



}