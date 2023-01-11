const HEARTS_ANIMATION_WAIT_TIME = 3000;

function animationPlay(element) {
    console.log("animationPlay", element.getAttribute("src"));
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

function animateForAWhile(element) {
    var animationTime = parseInt(element.getAttribute("data-animation-time"));
    if (element.getAttribute("src") != element.getAttribute("data-animated-version")) {
        animationPlay(element);

        setTimeout(() => {
            animationPause(element);
        }, animationTime);
    }
}

function animateRandomly(element) {
    var animationWait = parseInt(element.getAttribute("data-animation-wait"));
    var animationWaitMax = animationWait + (animationWait / 2.0);
    var animationWaitMin = animationWait - (animationWait / 2.0);

    var waitTime = Math.random() * (animationWaitMax - animationWaitMin) + animationWaitMin;
    console.log("Times: ", animationWaitMax, animationWaitMin, waitTime);

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

function activateHeartAnimations() {
    var hearts = document.getElementsByClassName("animated-heart");

    animateRandomHeart(hearts);
}

function animateRandomHeart(hearts) {
    var heart = hearts[Math.floor(Math.random() * hearts.length)];
    var waitingTime = (HEARTS_ANIMATION_WAIT_TIME / 2.0) + (Math.random() * HEARTS_ANIMATION_WAIT_TIME);

    animateForAWhile(heart);

    setTimeout(() => {
        animateRandomHeart(hearts)
    }, waitingTime);
}


document.addEventListener("DOMContentLoaded", function () {
    activateAnimations();
    activateHeartAnimations();
});
