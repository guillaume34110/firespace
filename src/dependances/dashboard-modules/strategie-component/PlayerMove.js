import { playerSprite, playerStats, startGame } from '../Strategie'
import { windowSize } from './WindowControl'
export let clavier = [0]
export let spaceBar = 0
let left = 0
let right = 0
export let top = [0]
export let bottom = [0]
export let enter = 0
let mousePos = { x: 0, y: 0 }
export const shipPos = { x: 0, y: 0, mX: 0, mY: 0 }


export const playerStop = (e) => {

    if (e.keyCode === 38) top[0] = 0
    if (e.keyCode === 40) bottom[0] = 0
    if (e.keyCode === 39) right = 0
    if (e.keyCode === 37) left = 0
    if (e.keyCode === 32) spaceBar = 0
    if (e.keyCode === 13) enter = 0
}
export const playerStart = (e) => {

    if (e.repeat) return;
    if (e.keyCode === 38) {
        top[0] = 1
        startGame[0] = true
        if (clavier[0] === 0) {
            top[0] = 1
            bottom[0] = 0
            left = 0
            right = 0
        }
        clavier[0] = 1
    }
    if (e.keyCode === 40) {
        bottom[0] = 1
        startGame[0] = true
        if (clavier[0] === 0) {
            top[0] = 0
            bottom[0] = 1
            left = 0
            right = 0
        }
        clavier[0] = 1
    }
    if (e.keyCode === 39) {
        right = 1
        startGame[0] = true
        if (clavier[0] === 0) {
            top[0] = 0
            bottom[0] = 0
            left = 0
            right = 1
        }
        clavier[0] = 1
    }
    if (e.keyCode === 37) {
        left = 1
        startGame[0] = true
        if (clavier[0] === 0) {
            top[0] = 0
            bottom[0] = 0
            left = 1
            right = 0
        }
        clavier[0] = 1
    }
    if (e.keyCode === 32) spaceBar = 1
    if (e.keyCode === 13) enter = 1
}
const playerLimit = (x, y) => {
   
    const wHeight = window.innerHeight
    const wWidth = window.innerWidth
    const heightLimit = playerSprite.hRef/1.5
    const lowLimit = (wHeight/windowSize.h) - (playerSprite.hRef*1.5)
    const leftLimit = 0
    const rightLimit = (wWidth/windowSize.w) - (playerSprite.wRef *1.5)
    if (x !== -100 && y !== -100) {
        if (x <= leftLimit) {
            x = leftLimit
            playerStats.x = x
            left = 0
        }
        if (x >= rightLimit) {
            x = rightLimit
            playerStats.x = x
            right = 0
        }
        if (y <= heightLimit) {
            y = heightLimit
            playerStats.y = y
            top[0] = 0
        }
        if (y >= lowLimit) {
            y = lowLimit
            playerStats.y = y
            bottom[0] = 0
        }
    }
}
export const playerMove = () => {
    if (top[0] === 0 && bottom[0] === 0 && left === 0 && right === 0) clavier[0] = 0
    const bluePoint = document.querySelector('.blue-point')
    if (bluePoint !== undefined && bluePoint !== null) {
        bluePoint.style.left = `${mousePos.x}px`
        bluePoint.style.top = `${mousePos.y}px`

    }
    if (playerStats.win === true || playerStats.dead === true) {
        const bluePoint = document.querySelector('.blue-point')

        if (bluePoint !== null && bluePoint !== undefined) bluePoint.remove()
    }
    if (playerStats.dead === false && playerStats.win === false) {
        if (clavier[0] === 0) mouseAnim()

        const player = document.querySelector('.player-baliste')
        if (player !== null) {

            let x = playerStats.x
            let y = playerStats.y
            if (clavier[0] === 1) {
                shipPos.mX = x
                shipPos.mY = y
            }

            if (left === 1) {
                x -= playerStats.speedX
                playerStats.x = x
                if (clavier[0] === 1) shipPos.mX = x

            }
            if (right === 1) {
                x += playerStats.speedX
                playerStats.x = x
                if (clavier[0] === 1) shipPos.mX = x
            }
            if (top[0] === 1) {
                y -= playerStats.speedY
                playerStats.y = y
                if (clavier[0] === 1) shipPos.mY = y
            }
            if (bottom[0] === 1) {
                y += playerStats.speedY
                playerStats.y = y
                shipPos.y = y
                if (clavier[0] === 1) shipPos.mY = y
            }
            playerLimit(x, y)
        }
    }
}

export const playerRepulse = () => {

    const player = document.querySelector('.player-baliste')
    if (player !== null) {

        let x = playerStats.x
        let y = playerStats.y
        if (left === 1) {
            x += 6 * playerStats.speedX
            playerStats.x = x
            if (clavier[0] === 1) shipPos.mX = x
        }
        if (right === 1) {
            x -= 6 * playerStats.speedX
            playerStats.x = x
            if (clavier[0] === 1) shipPos.mX = x
        }

        if (top[0] === 1) {
            y += 6 * playerStats.speedY
            playerStats.y = y
            if (clavier[0] === 1) shipPos.mY = y
        }

        if (bottom[0] === 1) {
            y -= 6 * playerStats.speedY
            playerStats.y = y
            if (clavier[0] === 1) shipPos.mY = y
        }
        playerLimit(x, y)
    }
}
export const tactileControl = (e) => {
    if (startGame[0] === true) {
        const player = document.querySelector('.player-baliste')
        
        mousePos.x = e.touches[0].pageX
        mousePos.y = e.touches[0].pageY
        
        if (clavier[0] === 0) {

            const wHeight = window.innerHeight
            const wWidth = window.innerWidth
            const heightLimit = 0
            const lowLimit = wHeight 
            const leftLimit = 0
            const rightLimit = wWidth - playerSprite.wRef/2

            if ( mousePos.x < rightLimit &&  mousePos.x > leftLimit
                && mousePos.y > heightLimit && mousePos.y < lowLimit) {
                shipPos.mX = mousePos.x - playerSprite.wRef / 2;
                shipPos.mY =  mousePos.y - playerSprite.hRef / 2;

            } else {
                if (mousePos.x > rightLimit) {
                    shipPos.mX = rightLimit
                    if ( mousePos.y > heightLimit &&  mousePos.y < lowLimit) {
                        shipPos.mY =  mousePos.y - playerSprite.hRef / 2;
                    }
                }
                if (mousePos.x < leftLimit) {
                    shipPos.mX = leftLimit
                    if ( mousePos.y > heightLimit &&  mousePos.y < lowLimit) {
                        shipPos.mY =  mousePos.y - playerSprite.hRef / 2;
                    }
                }
                if ( mousePos.y < heightLimit) {
                    shipPos.mY = heightLimit
                    if (mousePos.x < rightLimit && mousePos.x > leftLimit) {
                        shipPos.mX = mousePos.x - playerSprite.wRef / 2;
                    }
                }
                if ( mousePos.y > lowLimit) {
                    shipPos.mY = lowLimit
                    if (mousePos.x < rightLimit && mousePos.x > leftLimit) {
                        shipPos.mX = mousePos.x - playerSprite.wRef / 2;
                    }
                }
               
            }
        } else {
            if (player !== null) {
                shipPos.mX = playerStats.x
                shipPos.mY = playerStats.y
            }
        }
        shipPos.mX = (shipPos.mX /windowSize.w) +5
        shipPos.mY = (shipPos.mY /windowSize.h) +5
        e.preventDefault();
    }

}



export const mouseControl = (e) => {
    if (startGame[0] === true) {
        const player = document.querySelector('.player-baliste')
        let bluePoint = document.querySelector('.blue-point')
        if (bluePoint === null || bluePoint === undefined) {
            bluePoint = document.createElement("div")
            bluePoint.className = 'blue-point'
            bluePoint.style.position = 'absolute'
            bluePoint.id = 'blue-point'
            document.querySelector('body').appendChild(bluePoint)
        }
        mousePos.x = e.pageX
        mousePos.y = e.pageY
        
        if (clavier[0] === 0) {

            const wHeight = window.innerHeight
            const wWidth = window.innerWidth
            const heightLimit = 0
            const lowLimit = wHeight
            const leftLimit = 0
            const rightLimit =  wWidth 

            if (e.pageX < rightLimit && e.pageX > leftLimit
                && e.pageY > heightLimit && e.pageY < lowLimit) {
                shipPos.mX = e.pageX - playerSprite.wRef / 2;
                shipPos.mY = e.pageY - playerSprite.hRef / 2;

            } else {
                if (e.pageX > rightLimit) {
                    shipPos.mX = rightLimit
                    if (e.pageY > heightLimit && e.pageY < lowLimit) {
                        shipPos.mY = e.pageY - playerSprite.hRef / 2;
                    }
                }
                if (e.pageX < leftLimit) {
                    shipPos.mX = leftLimit
                    if (e.pageY > heightLimit && e.pageY < lowLimit) {
                        shipPos.mY = e.pageY - playerSprite.hRef / 2;
                    }
                }
                if (e.pageY < heightLimit) {
                    shipPos.mY = heightLimit
                    if (e.pageX < rightLimit && e.pageX > leftLimit) {
                        shipPos.mX = e.pageX - playerSprite.wRef / 2;
                    }
                }
                if (e.pageY > lowLimit) {
                    shipPos.mY = lowLimit
                    if (e.pageX < rightLimit && e.pageX > leftLimit) {
                        shipPos.mX = e.pageX - playerSprite.wRef / 2;
                    }
                }
               
            }
        } else {
            if (player !== null) {
                shipPos.mX = playerStats.x
                shipPos.mY = playerStats.y
            }
        }
        shipPos.mX = (shipPos.mX /windowSize.w) +5
        shipPos.mY = (shipPos.mY /windowSize.h) +5
    }
}
const mouseAnim = () => {
    const player = document.querySelector('.player-baliste')

    if (player !== null) {
       
        let x = playerStats.x
        let y = playerStats.y

        let distanceX = shipPos.mX - x
        let distanceY = shipPos.mY - y
  
        if (distanceX > playerStats.speedX / 2) {
            left = 0
            right = 1
        }
        if (distanceX < -playerStats.speedX / 2) {
            left = 1
            right = 0
        }
        if (distanceX < playerStats.speedX / 2 && distanceX > -playerStats.speedX / 2) {
            left = 0
            right = 0
        }
        if (distanceY < playerStats.speedY / 2 && distanceY > -playerStats.speedY / 2) {
            bottom[0] = 0
            top[0] = 0
        }
        if (distanceY > playerStats.speedY / 2) {
            bottom[0] = 1
            top[0] = 0
        }
        if (distanceY < -playerStats.speedY / 2) {
            top[0] = 1
            bottom[0] = 0
        }

    }
}
export const mouseDown = () => {
    startGame[0] = true
    spaceBar = 1

}

export const mouseUp = () => {
    spaceBar = 0

}
export const animPlayer = () => {
    const player = document.querySelector('.player-baliste')
    if (player !== null && player !== undefined) {
        let x = playerStats.x * windowSize.w
        let y = playerStats.y * windowSize.h
        player.style.left = `${x}px`
        player.style.top = `${y}px`
    }
}