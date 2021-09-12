import { userId } from '../EcoMap'
import { playerStats } from '../Strategie';
import firebase from '../../firebase/firebaseConfig'


export const getName = () => {
    const playerName = firebase.database().ref(`users/` + userId + '/name' )
   playerName.get().then((snapshot) => {
        playerStats.name = snapshot.val(); 
    })

}