import { playerStats } from "../Strategie"

export let timeStart
export let minute
export let second
export let milisec
export const timeStop = [false]
export let timeStartToken = [false]
 export let stopTimer = [false]

export const startTime = () => {
    if (timeStartToken[0] === false){
    timeStart = new Date()
   timeStartToken[0] = true
    }
}

export const currentTime = () => {
    if (stopTimer[0] === false) {
        let timeNow = new Date()
        timeNow -= timeStart
        timeNow = new Date(timeNow)
        minute = timeNow.getMinutes()
        second = timeNow.getSeconds()
        milisec = timeNow.getMilliseconds()
        if (minute < 10) {
            minute = "0" + minute
        }
        if (second < 10) {
            second = "0" + second
        }
        if (milisec < 10) {
            milisec = "00" + milisec
        }
        else if (milisec < 100) {
            milisec = "0" + milisec
        }
        if (timeStop[0] === true) {
            timeStop[0] = false
            stopTimer[0] = true
            playerStats.time = Math.round(minute + second + milisec)
        }
    }
}
