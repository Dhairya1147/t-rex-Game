import { getCustomProperty, incrementCustomProperty, setCustomProperty } from "./updateCustomProperty.js"

const SPEED = 0.06
const CACTUS_INTERVAL_MIN = 700
const CACTUS_INTERVAL_MAX = 2000
const WorldElem = document.querySelector("[data-world]")

let nextCactusTime
export function setupCactus(){
    nextCactusTime = CACTUS_INTERVAL_MIN
    document.querySelectorAll("[data-cactus]").forEach(cactus => {
        cactus.remove()
    })
}

export function updateCactus(delta, speedScale){
    document.querySelectorAll("[data-cactus]").forEach(cactus => {
        incrementCustomProperty(cactus,"--left",delta * speedScale * SPEED * -1)
        if(getCustomProperty(cactus,"--left") <= -100){
            cactus.remove()
        }
    })


    if(nextCactusTime <= 0){
        creatCactus()
        nextCactusTime = 
        randomNumberBetween(CACTUS_INTERVAL_MIN,CACTUS_INTERVAL_MAX) / speedScale
    }
    nextCactusTime -= delta
}

export function getCactusRects(){
    return [...document.querySelectorAll("[data-cactus]")].map(cactus => {
        return cactus.getBoundingClientRect()
    })
}

function creatCactus(){
    const cactus = document.createElement("img")
    cactus.dataset.cactus = true
    cactus.src = "./img/cactus.png"
    cactus.classList.add("cactus")
    setCustomProperty(cactus,"--left",100)
    WorldElem.append(cactus)
}

function randomNumberBetween(min,max){
    return Math.floor(Math.random() * (max - min + 3) + min)
}