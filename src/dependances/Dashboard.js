import arrowBlack from "./assets/img/arrow-black.png";
import React, { useEffect } from "react";
import EcoMap from "./dashboard-modules/EcoMap";
import Header from "./dashboard-modules/Header";
import LatNavBar from "./dashboard-modules/LatNavBar";
import { playerStats } from "./dashboard-modules/Strategie";
import { getName } from "./dashboard-modules/strategie-component/PlayerName";

export const tutorial = [0];

const Dashboard = () => {
  const nextPopup = () => {
    if (tutorial[0] === 1) {
      tutorial[0] = 2;
      tuto2();
    } else if (tutorial[0] === 2) {
      tutorial[0] = 3;
      tuto3();
    } else if (tutorial[0] === 3) {
      tutorial[0] = 4;
      tuto4();
    } else if (tutorial[0] === 4) {
      tutorial[0] = 5;
      tuto5();
    } else if (tutorial[0] === 5) {
      tutorial[0] = 6;
      tuto6();
    } else if (tutorial[0] === 6) {
      tutorial[0] = 7;
      tuto7();
    } else if (tutorial[0] === 7) {
      tutorial[0] = 8;
      tuto8();
    } else if (tutorial[0] === 8) {
      tutorial[0] = 9;
      tuto9();
    } else if (tutorial[0] === 9) {
      tutorial[0] = 0;
      tuto10();
    }
  };
  const tuto10 = () => {
    const tutoPopup = document.querySelector(".tuto-popup");
    tutoPopup.classList.add("hidden");
  };
  const tuto9 = () => {
    const arrow = document.querySelector(".popup-arrow");
    arrow.classList.add("hidden");
    const tutoPopup = document.querySelector(".tuto-popup");
    const wY = window.innerHeight / 2;
    const wX = window.innerWidth / 2;
    tutoPopup.style.left = `${wX}px`;
    tutoPopup.style.top = `${wY}px`;

    const tutoText = document.querySelector(".tuto-text");
    tutoText.innerHTML = ` ${playerStats.name} je te souhaite une bonne expérience`;
  };
  const tuto8 = () => {
    const newPos = document.querySelector(".nav-card");
    let newPosX = newPos.offsetLeft + (window.innerWidth * 17) / 100;
    let newPosY = newPos.offsetTop;

    const arrow = document.querySelector(".popup-arrow");
    arrow.style.transform = "rotate(180deg)";
    arrow.style.left = `${newPosX}px`;
    arrow.style.top = `${newPosY}px`;
    newPosX += 25;
    const tutoPopup = document.querySelector(".tuto-popup");
    tutoPopup.style.left = `${newPosX}px`;
    tutoPopup.style.top = `${newPosY}px`;
    const tutoText = document.querySelector(".tuto-text");
    tutoText.innerHTML = `<h3> 'Creation' , la page ou nous sommes </h3>.<h3> 'Partie aléatoire' , va te permettre d'essayer de terminer les cartes des autres joueurs de maniére alétoire </h3>.<h3> 'Réglages'  te permet de modifier les paramétres relatif à ton compte</h3> `;
  };
  const tuto7 = () => {
    const newPos = document.querySelector(".erase-btn");
    let newPosX = newPos.offsetLeft;
    let newPosY = newPos.offsetTop;
    newPosY += 50;
    const arrow = document.querySelector(".popup-arrow");
    arrow.style.transform = "rotate(270deg)";
    arrow.style.left = `${newPosX}px`;
    arrow.style.top = `${newPosY}px`;
    newPosY += 25;
    newPosX -= 200;
    const tutoPopup = document.querySelector(".tuto-popup");
    tutoPopup.style.left = `${newPosX}px`;
    tutoPopup.style.top = `${newPosY}px`;
    const tutoText = document.querySelector(".tuto-text");
    tutoText.innerHTML = `<h3>Le bouton rouge sert à effacer des créations déjà publiés.<h3>`;
  };
  const tuto6 = () => {
    const newPos = document.querySelector(".try-btn");
    let newPosX = newPos.offsetLeft;
    let newPosY = newPos.offsetTop;
    newPosY += 50;
    const arrow = document.querySelector(".popup-arrow");
    arrow.style.transform = "rotate(270deg)";
    arrow.style.left = `${newPosX}px`;
    arrow.style.top = `${newPosY}px`;
    newPosY += 25;
    const tutoPopup = document.querySelector(".tuto-popup");
    tutoPopup.style.left = `${newPosX}px`;
    tutoPopup.style.top = `${newPosY}px`;
    const tutoText = document.querySelector(".tuto-text");
    tutoText.innerHTML = `<h3>L'icone verte vous permet de tester vos créations .Celles-ci se publient et se sauvegardent automatiquement si vous gagnez .Une fois sauvegarder votre carte sera publier pour tous et ajouter a votre liste de cartes.Les creations non validés ne sont pas sauvegarder pour l'instant </h3>`;
  };
  const tuto5 = () => {
    const newPos = document.querySelector("#empty");
    let newPosX = window.innerWidth / 2;
    let newPosY = newPos.offsetTop;
    newPosY += 50;
    const arrow = document.querySelector(".popup-arrow");
    arrow.style.transform = "rotate(270deg)";
    arrow.style.left = `${newPosX}px`;
    arrow.style.top = `${newPosY}px`;
    newPosY += 25;
    const tutoPopup = document.querySelector(".tuto-popup");
    tutoPopup.style.left = `${newPosX}px`;
    tutoPopup.style.top = `${newPosY}px`;
    const tutoText = document.querySelector(".tuto-text");
    tutoText.innerHTML = `<h3>les icones bleu clair te permettent de selectionner les divers élements à poser sur la carte.tu peut les poser en cliquant sur une case.pour effacer utilise l'icone effacer </h3>.`;
  };
  const tuto4 = () => {
    const newPos = document.querySelector(".map-select");
    let newPosX = newPos.offsetLeft;
    let newPosY = newPos.offsetTop;
    newPosY += 50;
    const arrow = document.querySelector(".popup-arrow");
    arrow.style.transform = "rotate(270deg)";
    arrow.style.left = `${newPosX}px`;
    arrow.style.top = `${newPosY}px`;
    newPosY += 25;
    const tutoPopup = document.querySelector(".tuto-popup");
    tutoPopup.style.left = `${newPosX}px`;
    tutoPopup.style.top = `${newPosY}px`;
    const tutoText = document.querySelector(".tuto-text");
    tutoText.innerHTML = `Ici tu peux selctionner les cartes que tu as deja faites graces à leurs noms .Tu peux aussi crée de nouvelles cartes ici en selectionnant 'nouveau'.`;
  };

  const tuto3 = () => {
    const newPos = document.querySelector("#map-name");
    let newPosX = newPos.offsetLeft;
    let newPosY = newPos.offsetTop;
    newPosY += 50;
    const arrow = document.querySelector(".popup-arrow");
    arrow.classList.remove("hidden");
    arrow.style.position = "absolute";
    arrow.style.transform = "rotate(270deg)";
    arrow.style.left = `${newPosX}px`;
    arrow.style.top = `${newPosY}px`;
    newPosY += 25;
    const tutoPopup = document.querySelector(".tuto-popup");
    tutoPopup.style.left = `${newPosX}px`;
    tutoPopup.style.top = `${newPosY}px`;
    const tutoText = document.querySelector(".tuto-text");
    tutoText.innerHTML = `Pour pouvoir valider tes cartes elles doivent toutes avoirs un nom différent entre 1 et 8 caractéres. `;
  };

  const tuto2 = () => {
    const tutoText = document.querySelector(".tuto-text");
    tutoText.innerHTML = `Tu te trouve ici sur l'éditeur de niveaux .Grace la carte et les boutons du haut tu va pouvoir crée tes propres niveaux. Les boutons de gauche servent à la navigation .  `;
  };

  const headerdeploy = () => {
    const eco = document.querySelector(".eco-card");
    const nav = document.querySelector(".nav-card");
    const header = document.querySelector(".header-card");
    const close = document.querySelector(".close-header");
    const closeNav = document.querySelector(".close-nav");
    const mainSecond = document.querySelector(".main-second");
    if (eco.classList.contains("hidden") === false) {
      close.classList.add("unhidde");
      mainSecond.classList.add("hidden");
      eco.classList.add("hidden");
      header.classList.add("unhidde");
      header.classList.add("w-100m");
      header.classList.add("h-100p");
    } else if (nav.classList.contains("unhidde") === true) {
      header.classList.add("unhidde");
      close.classList.add("unhidde");
      closeNav.classList.remove("unhidde");
      nav.classList.remove("unhidde");
      header.classList.add("w-100m");
      header.classList.add("h-100p");
      nav.classList.remove("w-100p");
      nav.classList.remove("h-85p");
      mainSecond.classList.add("hidden");
    }
  };
  const navbarDeploy = () => {
    const eco = document.querySelector(".eco-card");
    const header = document.querySelector(".header-card");
    const nav = document.querySelector(".nav-card");
    const close = document.querySelector(".close-nav");
    const closeHead = document.querySelector(".close-header");
    const mainSecond = document.querySelector(".main-second");
    if (eco.classList.contains("hidden") === false) {
      close.classList.add("unhidde");
      nav.classList.add("unhidde");
      eco.classList.add("hidden");
      mainSecond.classList.remove("hidden");
      nav.classList.add("w-100p");
      nav.classList.add("h-100p");
    } else if (header.classList.contains("unhidde") === true) {
      nav.classList.add("unhidde");
      close.classList.add("unhidde");
      closeHead.classList.remove("unhidde");
      header.classList.remove("unhidde");
      header.classList.remove("w-100m");
      header.classList.remove("h-100p");
      mainSecond.classList.remove("hidden");
      nav.classList.add("w-100p");
      nav.classList.add("h-100p");
    }
  };
  useEffect(() => {
    if (tutorial[0] === 1) {
      getName();
      const tutoPopup = document.querySelector(".tuto-popup");
      const tutoText = document.querySelector(".tuto-text");
      tutoPopup.classList.remove("hidden");
      const wY = window.innerHeight;
      const wX = window.innerWidth;

      tutoPopup.style.left = `${wX / 2}px`;
      tutoPopup.style.top = `${wY / 2}px`;
      tutoText.innerHTML = `${playerStats.name} Bienvenue à toi sur FireSpace. un jeux de creation et un jeu de tir spacial.Tu dois crée des niveaux pour que d'autres joueur puissent essayer de les refaires.Le but du jeu étant de détruire la planette présente sur le niveau `;
    }
  }, []);

  return (
    <div className="main-dash">
      <div className="card-dash">
        <img
          alt=" "
          className="popup-arrow hidden"
          src={arrowBlack}
          width="24px"
          height="24px"
        ></img>
        <div className="tuto-popup hidden">
          <h3 className="tuto-text"> </h3>
          <p className="flex-center select m-10" onClick={nextPopup}>
            ok
          </p>
        </div>
        <Header />
        <div onClick={headerdeploy} className="header-button  ">
          <p>Selection</p>
        </div>
        <div onClick={navbarDeploy} className="navbar-button ">
          <p>Navigation</p>
        </div>
        <div className="row h-80 w-100 space-between main-second">
          <LatNavBar />

          <EcoMap />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
