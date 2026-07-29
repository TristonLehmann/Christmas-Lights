const startBtn = document.querySelector(".start");
const stopBtn = document.querySelector(".stop");
const frequency = document.querySelector(".frequency");
const lights = document.querySelectorAll(".light");

let isActive = false;
let flickerInterval;
let pattern = 0;

const flickerLights = () => {
    lights.forEach((light, index) => {
        const shouldBeOn = index % 2 === pattern;
        light.classList.toggle("off", !shouldBeOn);
    });

    pattern = pattern === 0 ? 1 : 0;
}

const startFlickering = () => {
    if (isActive) {
        return;
    }

    isActive = true;
    pattern = 0;

    flickerInterval = setInterval(flickerLights, 1000 / frequency.value);
}

const stopFlickering = () => {
    isActive = false;
    clearInterval(flickerInterval);

    lights.forEach(light => {
        light.classList.remove("off");
    })
}

startBtn.addEventListener("click", startFlickering);

stopBtn.addEventListener("click", stopFlickering);

frequency.addEventListener("input", () => {
    if (!isActive) {
        return;
    }

    clearInterval(flickerInterval);

    flickerInterval = setInterval(flickerLights, 1000 / frequency.value);
})