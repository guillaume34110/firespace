import React from 'react';


import LatNavBar from './dashboard-modules/LatNavBar';

import Reglages from './dashboard-modules/Reglages';

 const DReglages = () => {
    
  
    const navbarDeploy = () => {

        const eco = document.querySelector('.eco-card')
        const nav = document.querySelector('.nav-card')
        const close = document.querySelector('.close-nav')
        if (eco.classList.contains('hidden') === false) {
            close.classList.add('unhidde')
            nav.classList.add('unhidde')
            eco.classList.add('hidden')
            nav.classList.add('w-100p')
            nav.classList.add('h-100p')
        }
    }
  
    return (
        <div className="main-dash">
            <div className='card-dash'>
                 <div onClick = {navbarDeploy} className="navbar-button "><p>Navigation</p></div>
            
                <div className="row h-100 w-100 space-between flex-center">
                <LatNavBar />
                <Reglages />
               <div></div>
                </div>
               
           
            </div>
        </div>

    );
};

export default DReglages