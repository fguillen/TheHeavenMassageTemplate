const ANIMATION_TIME = 3000
const ANIMATION_WAIT_MIN = 2000
const ANIMATION_WAIT_MAX = 10000

function animationPlay(element) {
    console.log("animationPlay");
    if (element.getAttribute("src") != element.getAttribute("data-animated-version")) {
        console.log("animationPlay Really: " + element.getAttribute("data-animated-version"));
        element.setAttribute("src", element.getAttribute("data-animated-version"));
    }
}

function animationPause(element) {
    console.log("animationPause");
    if (element.getAttribute("src") != element.getAttribute("data-static-version")) {
        element.setAttribute("src", element.getAttribute("data-static-version"));
    }
}

function animateForAWhile(element, time = ANIMATION_TIME) {
    if (element.getAttribute("src") != element.getAttribute("data-animated-version")) {
        animationPlay(element);

        setTimeout(() => {
            animationPause(element);
        }, time);
    }
}

function animateRandomly(element) {
    var waitTime = Math.random() * (ANIMATION_WAIT_MAX - ANIMATION_WAIT_MIN) + ANIMATION_WAIT_MIN;

    setTimeout(() => {
        animateForAWhile(element);
        animateRandomly(element);
    }, waitTime);
}

function activateAnimations() {
    var elements = document.getElementsByClassName("animated-image");

    for (const element of elements) {
        element.addEventListener("mouseover", (event) => {
            console.log("mouseover");
            animateForAWhile(element);
        });
        animateRandomly(element);
    };
}


document.addEventListener("DOMContentLoaded", function () {
    activateAnimations();
});
