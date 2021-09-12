import React from 'react';
import bullet from '../assets/img/icons/bullet.png'
import click from '../assets/img/icons/click.png'
import mouve from '../assets/img/icons/mouve.png'
import keys from '../assets/img/icons/keys.png'
import space from '../assets/img/icons/space.png'
import { playerStart, playerStop, playerMove, mouseControl, mouseDown, mouseUp, animPlayer, tactileControl } from './strategie-component/PlayerMove'
import { playerShoot, shootAnim } from './strategie-component/PlayerShoot'
import { windowSetPosition, windowResize, windowSize } from './strategie-component/WindowControl'
import { damageAnim, damageEnemies, enemisDamgesAnim, playerDamage, playerDamageAnim } from './strategie-component/Damages'
import { drawMap } from './strategie-component/DrawMap'
import { spacemanShoot } from './strategie-component/Spaceman'
import { spawnShip } from './strategie-component/SpawnShip';
import { userHub } from './strategie-component/UserHub';
import { checkToken, statsToken, victory } from './strategie-component/Victory';
import { currentTime, startTime, stopTimer, timeStartToken, timeStop } from './strategie-component/Time';
import { getName } from './strategie-component/PlayerName';
import { cases } from './EcoMap';
import { start, startToken } from './strategie-component/StartLevel'
import { useHistory } from "react-router-dom"
import { test } from './Header';
import { Hidden } from './strategie-component/Hidden';

export const startGame = [false]
let onlyOne = false
let casesToken = false
let frame = 0
export let returnMap = [false]
export let useToken = [false]
export const restart = [false]
export const retryLevel = [false]
export let casesSave = []
export const playerSprite = { wRef: 60, hRef: 60, w: 60, h: 60 }
export const shootArray = []
export const basicLaser = { x: 0, y: 0, wRef: 20, w: 20, hRef: 20, h: 20, className: 'laser laser-sprite', speedX: 20 }
export const enemiesWeapon = [{ x: 0, y: 0, wRef: 10, w: 10, hRef: 10, h: 10, className: 'bullet', speed: 10 }]
export const playerStats = { x: 0, y: 0, life: 10, score: 0, dead: false, win: false, time: 0, name: '', speedX: 10, speedY: 10 }
export default function Strategie() {

    const history = useHistory()


    const anim = () => {
        //setTimeout(function run() {

        if (startToken[0] === true) {

            drawMap()
            windowResize()
            userHub()
            animPlayer()
            if (startGame[0] === true) {

                startTime()
                Hidden()
                playerMove()

                damageEnemies()
                playerDamage()
                spacemanShoot()
                spawnShip()
                playerShoot()
                shootAnim()
                enemisDamgesAnim()
                currentTime()
                victory()
                if (damageAnim === true) playerDamageAnim()
            } else {
                document.querySelector('.click-start').classList.remove('hidden')
                document.querySelector('.map').classList.remove('no-cursor')

            }
        }


        //}, 16);
    }

    const reset = () => {

        startGame[0] = false
        statsToken[0] = false
        checkToken[0] = false
        stopTimer[0] = false
        timeStop[0] = false
        timeStartToken[0] = false
        casesToken = false
        playerStats.life = 10
        playerStats.score = 0
        playerStats.dead = false
        playerStats.win = false
        playerStats.time = 0
        playerStats.name = ''

        windowSize.w = 0
        windowSize.h = 0
        const clean = document.querySelector('.felicitation')
        if (clean !== null && clean !== undefined) clean.remove()
        const list = document.querySelectorAll('.stat-list')
        for (let i = 0; i < list.length; i++) {
            list[i].remove()
        }
        const gameO = document.querySelectorAll('.game-over')
        for (let i = 0; i < gameO.length; i++) {
            gameO[i].remove()
        }
        const endBtn = document.querySelectorAll('.end-btn')
        for (let i = 0; i < endBtn.length; i++) {
            endBtn[i].classList.add('hidden')

        }
        const scoreDiv = document.querySelector('.score-div')
        if (scoreDiv !== null && scoreDiv !== undefined) scoreDiv.classList.add('hidden')

        const cursor = document.querySelector('.map')
        if (cursor !== null) {
            cursor.classList.add('no-cursor')
        }
        const anim3d = document.querySelector('.d-anim')
        if (anim3d !== null) {
            anim3d.classList.remove('end')
            anim3d.classList.remove('baliste-end')
            anim3d.classList.remove('croiseur-end')
            anim3d.classList.remove('vedette-end')
            anim3d.classList.remove('transport-end')
            anim3d.classList.remove('spaceman-end')
        }
    }



    const reUseEffect = () => {
        if (useToken[0] === false) {
            useToken[0] = true
            start()
            reset()
            if (casesToken === false) {
                casesSave = []
                for (let i = 0; i < 105; i++) {
                    casesSave.push(cases[i])
                }
                casesToken = true
            }
            document.addEventListener('keydown', playerStart)
            document.addEventListener('mousemove', mouseControl)
            document.addEventListener('mousedown', mouseDown)
            document.addEventListener('mouseup', mouseUp)
            document.addEventListener('keyup', playerStop)
            document.addEventListener('touchstart' , tactileControl )
            document.addEventListener('touchmove' , tactileControl )
            windowSetPosition()
            getName()
            if (onlyOne === false) {
                //window.requestAnimationFrame(anim);
                setInterval(anim, 16)
                onlyOne = true
            }

        }
    }



    const newBattle = () => {
        useToken[0] = false
        test[0] = false
        retryLevel[0] = false
        startToken[0] = false
        history.push("/strategie")
    }
    const DashBoard = () => {
        if (test[0] === true) {
            returnMap[0] = true
        }
        useToken[0] = false
        retryLevel[0] = false
        startToken[0] = false
        history.push("/")
    }
    const retry = () => {
        for (let i = 0; i < 105; i++) {
            cases[i] = casesSave[i]
        }
        retryLevel[0] = true
        restart[0] = true
        useToken[0] = false
        startToken[0] = false
        const clean = document.querySelector('.felicitation')
        if (clean !== null && clean !== undefined) clean.remove()
        const list = document.querySelectorAll('.stat-list')
        if (list !== null && list !== undefined) {
            for (let i = 0; i < list.length; i++) {
                list[i].remove()
            }
        }
        history.push("/strategie")
    }

    return (
        <div>
            <div className=" game-contenair column  star-background  ">
                <div className="d-anim"></div>

                <div className="row  user-hub  space-between">
                    <div className="row fit flex-center">
                        <div className="row fit flex-center columned">
                            <p className="player-score m-5 fit"> </p>
                            <p className="player-time m-5 fit"> </p>
                        </div>
                        <div className='w-200px m-5 h-30px border '><div className="player-life  h-100"> </div></div>
                    </div>

                    <div className="row fit flex-center  columned">
                        <p className="level-creator m-5 fit"></p>
                        <p className="level-name m-5 fit"></p>
                    </div>
                    <div className="row fit flex-center">
                        <p className=" m-5 fit">F11 plein écran</p>
                        <div className="row fit flex-center  columned">
                        <div className="row"><p className=" m-5 fit"> direction : </p> <img alt=" " className="icon" src={keys} width="32px" height="32px" /><p className=" m-5 fit"> / </p><img alt=" " className="icon" src={mouve} width="32px" height="32px" /> </div>
                        <div className="row"><p className=" m-5 fit">Tir : </p><img alt=" " className="icon" src={space} height="32px" /><p className=" m-5 fit"> / </p><img alt=" " className="icon" src={click} width="32px" height="32px" /> </div>
                    </div>
                </div>
            </div>

            <div>
                <div className="map space-around column no-cursor">

                    <div>
                        <div className='click-start hidden'><h2>Appuyez sur une touche pour commencer</h2></div>
                        <div className="h-16"></div>
                        <div className="end-contenair">
                            <div className='score-div  ml-20 hidden'></div>

                        </div>

                    </div>
                    <div className=" row space-around mt-2">
                        <div className='hidden btn end-btn flex-center retri-btn' onClick={retry}>Essaye encore</div>
                        <div className='hidden btn end-btn flex-center new-battle' onClick={newBattle}>Autre niveau</div>
                        <div className='hidden btn end-btn flex-center new-creation-btn' onClick={DashBoard} onLoad={reUseEffect()}>Creation</div>
                    </div>
                </div>
            </div>
            <div></div>

        </div>

        </div >
    )
}
