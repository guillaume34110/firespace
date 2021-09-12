import {  userId } from "../EcoMap"
import { indexPos, levelName, test } from "../Header"
import { playerStats, casesSave } from "../Strategie"
import firebase from '../../firebase/firebaseConfig'
import {  stats } from "./LevelStats"
import { checkStats } from "./Victory"

export const levelPush = [false]

const message = () => {
    const newStat = document.createElement("h2")

    newStat.className = 'felicitation'
    newStat.innerHTML = `Félicitation ton niveau est publié`
    document.querySelector('.score-div').appendChild(newStat)
}
const newScore = () => {
    stats()
    test[1]=false
    checkStats()
}
export const push = () => {
    levelPush[0] = false
    if (test[0] === true) {
        levelPush[0] = true
        const nameLevel = levelName
        const map = firebase.database().ref(`users/` + userId + '/map')
    

        const folder = { name: nameLevel, cases: casesSave, scoring: [{ userId: userId, name: playerStats.name, time: playerStats.time, life: playerStats.life, score: playerStats.score }] }
        let newPrint
        map.get().then((snapshot) => {
            newPrint = snapshot.val();


            if (newPrint !== null && newPrint !== undefined) {
                newPrint[indexPos] = folder
                //if (newPrint.length > 105) {
                //  newPrint.splice(105, (newPrint.length - 105))
                // }
               
                map.set(newPrint)

            } else {
                newPrint = []
                newPrint[0] = folder
                map.set(newPrint)
            }
        })
        const listMap = firebase.database().ref(`users/IndexLevel/`)
        const newItem = { userId, nameLevel }
        let newList
        listMap.get().then((snapshot) => {
            newList = snapshot.val();
            const bufferList = []


            if (newList !== null && newList !== undefined) {
                for (let i = 0; i < newList.length; i++) {
                    bufferList[i] = newList[i]
                }
                newList = bufferList
                let replace = false
                let indexSave = 0
                for (let i = 0; i < newList.length; i++) {
                    if (newList[i].userId === userId && newList[i].nameLevel === nameLevel) {
                        replace = true
                        indexSave = i
                    }
                }
                if (replace === true) {
                    newList[indexSave] = newItem
                }
                if (replace === false) {
                   
                    newList.push(newItem)
                }

                listMap.set(newList)
                message()
                newScore()


            } else {
                newList = []
                newList[0] = newItem
                listMap.set(newList)
                message()
                newScore()

            }
        })

    }
}