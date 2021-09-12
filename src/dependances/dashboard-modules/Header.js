import React, { useEffect, useState, useContext } from "react";
import { useAuth } from "../context/AuthContext";
import firebase from "../firebase/firebaseConfig";
import { useHistory } from "react-router-dom";
import {
    playerStats,
    restart,
    retryLevel,
    useToken,
    returnMap,
    casesSave,
} from "./Strategie";
import { startToken } from "./strategie-component/StartLevel";
import { levelPush } from "./strategie-component/PushNewLevel";

export let levelName = "";
export let dropItem = [""];
export let test = [false];
export let indexPos = 0;
export let newMap = [false];
export let defaultName = "";
export let reload = [false];
export let folder = {
    name: "nouveau",
    cases: [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0,
    ],
};
export let oldmap = [false];

let saveName;
let eraseName;
let previousBuff;
let nameToken = false;

export default function Header() {
    const [move, setMove] = useState(0);
    const history = useHistory();
    const [mapList, setMapList] = useState([]);

    const { currentUser } = useAuth();
    const uid = currentUser.uid;

    const process = (e) => {
        let search;
        let idFirst = "";
        const first = document.querySelector(".active-header");
        if (first !== null) {
            first.classList.remove("active-header");
            idFirst = first.id;
        } else {
            idFirst = "tantpis";
        }

        if (e.target.id !== "") {
            search = document.querySelector(`#${e.target.id}`);
        } else if (e.target.id === "") {
            search = document.querySelector(`#${e.target.parentNode.id}`);
        }
        if (idFirst !== search.id) {
            search.classList.add("active-header");
            dropItem[0] = search.id;
            const children = search.querySelectorAll(".icon");
            const erase = document.querySelectorAll("#mouse");
            for (let i = 0; i < erase.length; i++) {
                erase[i].remove();
            }
            const mouse = document.createElement("div");
            for (let i = 0; i < children.length; i++) {
                if (children[i].parentNode === search) {
                    mouse.className = children[i].className;
                    mouse.height = children[i].height + 10;
                    mouse.width = children[i].width + 10;
                    mouse.style.position = "absolute";
                    mouse.id = "mouse";
                    document.querySelector("body").appendChild(mouse);
                }
            }
        } else {
            dropItem[0] = "";
            search.classList.remove("active-header");
            document.querySelector("#mouse").remove();
        }
    };
    const closePopup = () => {
        const popup = document.querySelector(".popup-select");
        if (popup !== null) popup.style.display = "none";
    };
    const selectSlot = (e) => {
        closePopup();
        process(e);
        setMove(move + 1);
    };
    const nameCheck = () => {
        const map = firebase.database().ref(`users/` + uid + "/map/");

        map.get().then((snapshot) => {
            let previousList = snapshot.val();
            nameToken = true;
            if (previousList !== null) {
                for (let i = 0; i < previousList.length; i++) {
                    if (previousList[i].name === levelName) {
                        if (indexPos !== i) nameToken = false;
                    }
                }
            }
            if (
                levelName === "" ||
                levelName === null ||
                levelName === undefined ||
                levelName === "nouveau"
            )
                nameToken = false;
            launch();
        });
    };
    const launch = () => {
        if (nameToken === true) {
            retryLevel[0] = false;
            restart[0] = false;
            useToken[0] = false;
            test[0] = true;
            startToken[0] = false;
            playerStats.dead = false;
            playerStats.win = false;
            const alert = document.querySelector(".alert");
            if (alert.classList.contains("hidden") === false)
                alert.classList.add("hidden");
            history.push("/strategie");
        } else {
            const alert = document.querySelector(".alert");
            if (alert.classList.contains("hidden") === true)
                alert.classList.remove("hidden");
        }
    };
    const tryLevel = () => {
        mouseClean();
        nameCheck();
        saveName = levelName;
    };
    const erase = () => {
        closePopup();
        mouseClean();
        if (window.confirm("Voulez vous réelement effacer le niveeau?")) {
            const map = firebase.database().ref(`users/` + uid + "/map/");

            map.get().then((snapshot) => {
                let previousList = snapshot.val();
                if (
                    previousList !== null &&
                    previousList !== undefined &&
                    indexPos < previousList.length
                ) {
                    eraseName = previousList[indexPos].name;
                    previousList.splice(indexPos, 1);
                    map.set(previousList);
                    indexPos = 0;
                    eraseIndex();
                }
            });
        }
    };
    const eraseIndex = () => {
        const levels = firebase.database().ref(`users/IndexLevel`);
        let newLevels;
        levels.get().then((snapshot) => {
            newLevels = snapshot.val();

            for (let i = 0; i < newLevels.length; i++) {
                if (
                    newLevels[i].userId === uid &&
                    newLevels[i].nameLevel === eraseName
                ) {
                    newLevels.splice(i, 1);
                }
            }
            levels.set(newLevels);
            readMap();
        });
    };
    const mouseClean = () => {
        dropItem[0] = "";
        const buttonClear = document.querySelector(".active-header");
        if (buttonClear !== null) buttonClear.classList.remove("active-header");
        const mouseClear = document.querySelector("#mouse");
        if (mouseClear !== null) mouseClear.remove();
    };
    const selectMap = (e) => {
        closePopup();
        indexPos = parseInt(e.target.value);

        dropItem[0] = "";
        setMove(move + 1);
        if (mapList[e.target.value] !== undefined) {
            defaultName = mapList[e.target.value].name;

            if (defaultName === null) defaultName = "nom";
            levelName = defaultName;
            document.querySelector("#map-name").value = defaultName;
        }
    };
    const readMap = () => {
        const map = firebase.database().ref(`users/` + uid + "/map/");
        map.on("value", (snapshot) => {
            let previousList = snapshot.val();
            if (previousList !== null && previousList !== mapList) {
                previousBuff = previousList;
                oldmap[0] = false;
                for (let i = 0; i < previousList.length; i++) {
                    if (previousList[i].name === saveName) {
                        oldmap[0] = true;
                    }
                }
                if (
                    returnMap[0] === true &&
                    test[0] === true &&
                    levelPush[0] === false &&
                    oldmap[0] === false
                ) {
                    folder = { name: saveName, cases: casesSave };
                    previousList.unshift(folder);
                } else {
                    folder = {
                        name: "nouveau",
                        cases: [
                            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                            0, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0,
                            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                        ],
                    };
                    previousList.push(folder);
                }

                setMapList(previousList);

                // if (mapSel !== null && mapSel !== undefined && newOption !== null) mapSel.appendChild(newOption)
                if (previousList[0] !== undefined && returnMap[0] === false) {
                    defaultName = previousList[0].name;
                    levelName = defaultName;
                    indexPos = 0;
                    reload[0] = true;
                    const val = document.querySelector("#map-name");
                    if (val !== null) val.value = defaultName;
                } else if (previousList[0] !== undefined && returnMap[0] === true) {
                    defaultName = previousList[0].name;
                    levelName = defaultName;
                    indexPos = 0;
                    reload[0] = true;
                    const val = document.querySelector("#map-name");
                    if (val !== null) val.value = defaultName;
                } else {
                    const val = document.querySelector("#map-name");
                    if (val !== null) val.value = "nom";
                }
            } else if (previousList === null && previousList !== previousBuff) {
                previousList = [];
                folder = {
                    name: "nouveau",
                    cases: [
                        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7,
                        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                    ],
                };
                previousList.push(folder);
                setMapList(previousList);

                previousBuff = previousList;
                defaultName = previousList[0].name;
                levelName = defaultName;
                indexPos = 0;
                reload[0] = true;

                const val = document.querySelector("#map-name");
                if (val !== null) val.value = defaultName;
                setMove(move + 1);
            }
        });
    };
    const closeHeader = () => {
        const eco = document.querySelector(".eco-card");
        const header = document.querySelector(".header-card");
        const close = document.querySelector(".close-header");
        const mainSecond = document.querySelector(".main-second");
        close.classList.remove("unhidde");
        eco.classList.remove("hidden");
        eco.classList.add("w-100");
        mainSecond.classList.remove("hidden");
        header.classList.remove("unhidde");
        header.classList.remove("w-100m");
        header.classList.remove("h-100p");
    };
    useEffect(() => {
        window.addEventListener("mousemove", (e) => {
            const mouse = document.querySelector("#mouse");
            if (mouse !== null) {
                mouse.style.left = `${e.pageX + 5}px`;
                mouse.style.top = `${e.pageY + 5}px`;
            }
        });
        readMap();
    }, []);

    const value = {
        mapList,
    };

    return (
        <>
            <div onClick={closeHeader} className="closer close-header "></div>
            <div className="header-card column">
                <div className="  m-1 p-1 mini-header row head-column  ">
                    <div className="fields">
                        <div className="row wm-150 ">
                            <label className="flex-center" for="nom">
                                <p> nom : </p>
                            </label>
                            <input
                                type="text"
                                className="input ml-10 tuto-1"
                                id="map-name"
                                defaultValue={defaultName}
                                placeholder="Nom du niveau"
                                minlength="4"
                                maxlength="8"
                                size="10"
                                required
                                onClick={mouseClean}
                                onChange={(e) => {
                                    levelName = e.target.value;
                                }}
                            />
                        </div>
                        <div className="row  mt-2 w-30 wm-420px">
                            <label className="flex-center" for="selectioner-carte">
                                <p>selection carte :</p>{" "}
                            </label>
                            <select
                                className="map-select  ml-10"
                                onClick={mouseClean}
                                onChange={selectMap}
                                name="map"
                                id="map"
                            >
                                {mapList &&
                                    mapList.map((item, index) => {
                                        return (
                                            <option className={item.name} key={index} value={index}>
                                                {item.name}
                                            </option>
                                        );
                                    })}
                            </select>
                        </div>
                    </div>
                    <div className="row space-between w-30 wm-450px">
                        <div className="column">
                            <div
                                className=" row border flex-center m-1 p-10 btn try-btn"
                                onClick={tryLevel}
                            >
                                <p>essayer & publier</p>
                            </div>
                            <div className="hidden alert">
                                <p>nom incorect ou deja utilisé</p>
                            </div>
                        </div>
                        <div
                            className=" row border flex-center m-1 p-10 btn  erase-btn "
                            onClick={(mouseClean, erase)}
                        >
                            <p>effacer la carte</p>
                        </div>
                    </div>
                </div>

                <div className="row flex-center m-1 p-1 mini-header wrap">
                    <div
                        onClick={selectSlot}
                        className="selector row border flex-center m-1 p-1"
                        id="planet"
                    >
                        <div className="icon mini-planet" /> <p>planette </p>
                    </div>
                    <div
                        onClick={selectSlot}
                        className="selector row border flex-center m-1 p-1"
                        id="asteroid"
                    >
                        <div className="icon mini-asteroid" /> <p>asteroide</p>
                    </div>
                    <div
                        onClick={selectSlot}
                        className="selector row border flex-center m-1 p-1"
                        id="spaceman"
                    >
                        <div className="icon mini-spaceman" /> <p>spaceman</p>
                    </div>
                    <div
                        onClick={selectSlot}
                        className="selector row border flex-center m-1 p-1"
                        id="vortex1"
                    >
                        <div className="icon mini-vortexvert" /> <p>vortex vedette</p>
                    </div>
                    <div
                        onClick={selectSlot}
                        className="selector row border flex-center m-1 p-1"
                        id="vortex2"
                    >
                        <div className="icon mini-vortexjaune" /> <p>vortex croiseur</p>
                    </div>
                    <div
                        onClick={selectSlot}
                        className="selector row border flex-center m-1 p-1"
                        id="vortex3"
                    >
                        <div className="icon mini-vortexrouge" /> <p>vortex transport</p>
                    </div>
                    <div
                        onClick={selectSlot}
                        className="selector row border flex-center m-1 p-1"
                        id="player-baliste"
                    >
                        <div className="icon mini-baliste" /> <p>départ</p>
                    </div>
                    <div
                        onClick={selectSlot}
                        className="selector row border flex-center m-1 p-1"
                        id="empty"
                    >
                        <div className="icon mini-empty" width="30px" height="30px" />{" "}
                        <p>effacer</p>
                    </div>
                </div>
            </div>
        </>
    );
}
