


export let enemiCases =[]
export const EnemiDefence = () => {

    const map = firebase.database().ref(`users/` + Euid + '/map')
    map.on('value', (snapshot) => {
        let previousList = snapshot.val();
            enemicases = previousList
    })
}

