
import { playerStats } from "../Strategie"

import { currentCreatorName, currentLevelName } from "./StartLevel"
import { milisec, minute, second } from "./Time"
import { windowPosition, windowSetPosition } from "./WindowControl"


export const userHub = () => {
  
    const hubLevelName = document.querySelector('.level-name')
    const cretorName = document.querySelector('.level-creator')
    if (hubLevelName !== null && hubLevelName !== undefined && currentLevelName !== undefined) {
        hubLevelName.innerHTML = `niveau : ${currentLevelName}`
    }
    if (cretorName !== null && cretorName !== undefined && currentCreatorName !== undefined) {

        cretorName.innerHTML = `createur : ${currentCreatorName}`
    }


    const userLife = document.querySelector('.player-life')
    //userLife.innerHTML =`life : ${playerStats.life}`
    if (userLife !== null && userLife !== undefined) {
        for (let i = Math.round(playerStats.life) ; i < 10 ; i++){
        userLife.classList.remove(`w-${(Math.round(i + 1)) * 10}`)
        }
        userLife.classList.add(`w-${Math.round(playerStats.life ) * 10}`)
    }
    const userScore = document.querySelector('.player-score')
    if (userScore !== null && userScore !== undefined) {

        userScore.innerHTML = `score : ${playerStats.score}`
    } else { userScore.innerHTML = `score : 0` }
    const userTime = document.querySelector('.player-time')
    if (userTime !== null && userTime !== undefined) {
        if (minute !== undefined && minute !== null) {
            userTime.innerHTML = `time : ${minute}m ${second}s ${milisec}ms`
        } else { userTime.innerHTML = `time : 00m 00s 000ms` }
    }
}
