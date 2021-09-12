
import { cases, userId } from "../EcoMap"
import { indexPos,  test } from "../Header"
import {  retryLevel } from "../Strategie"
import firebase from '../../firebase/firebaseConfig'
import { restart } from "../Strategie"


export let startToken = [false]
export let levelIndexPos = 0
export let levelPath = []
export let currentLevelName
export let currentCreatorName

const levelCreator = () => {
     const creatorName = firebase.database().ref(`users/` + userId + '/name' )
  creatorName.get().then((snapshot) => {
    currentCreatorName = snapshot.val(); 
  })
}



const levelSet = () => {

    const map = firebase.database().ref(`users/` + levelPath[0].userId + '/map')
    map.get().then((snapshot) => {
        let maps = snapshot.val();
       
        for (let i = 0; i < maps.length; i++) {
            
            if (maps[i].name === levelPath[0].nameLevel) {
                let buffer = maps[i].cases
                levelCreator()
                currentLevelName = maps[i].name
                for (let i = 0 ; i<buffer.length ; i++){
                    cases[i]=buffer[i] 
                }
            
                levelIndexPos = i
                restart[0] = true
                startToken[0] = true
            }
        }
    })
}

const randomLevel = () => {
  
    if (retryLevel[0] === false) {
        const levels = firebase.database().ref(`users/IndexLevel/`)
        let newLevels
        levels.get().then((snapshot) => {
            newLevels = snapshot.val();
           
            let rndVal = Math.round((Math.random() * (newLevels.length- 1)) )
            levelPath =[]
            levelPath.push(newLevels[rndVal])
           
            levelSet()
        })
    } else { retryLevel[0] = false ;levelSet()}
    

}


export const start = () => {



    if (test[0] === true) {
        // levelName = 
        levelPath.userId = userId
        levelIndexPos = indexPos
        startToken[0] = true
        restart[0] = true
    } else {

        randomLevel()
    }

}