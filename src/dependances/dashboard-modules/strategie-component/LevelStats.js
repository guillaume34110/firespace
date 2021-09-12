import { userId } from '../EcoMap'
import { playerStats } from '../Strategie'
import {  test } from '../Header'
import firebase from '../../firebase/firebaseConfig'
import { levelIndexPos, levelPath } from './StartLevel'
import { checkToken } from './Victory'
export let scoringF


export const stats = () => {
   
if (levelPath !== undefined && levelPath!== null){
    
    let newScore = { userId: userId, name: playerStats.name, time: playerStats.time, life: playerStats.life, score: playerStats.score }
    if (test[0] !== true) {
        const score = firebase.database().ref(`users/` + levelPath[0].userId + '/map/' + levelIndexPos + '/scoring/')
        score.get().then((snapshot) => {
            let scoring = snapshot.val();
            if (scoring !== null) {
                scoring.push(newScore)
                score.set(scoring)
                scoringF = scoring
            } else {
                scoringF = [newScore]
            }
            checkToken[0] = false
        })
    } else {
        scoringF = [newScore]
        test[1] = true
    }
}
}