var app = document.getElementById('tw-app');

var typewriter = new Typewriter(app, {
    loop: true
});

typewriter.deleteChars(3)
    .typeString('...')
    .pauseFor(1500)
    .deleteChars(3)
    .typeString('...')
    .pauseFor(1500)
    .start();

const dots = document.querySelectorAll(".dot-design");
const bgLayer = document.querySelector(".background-layer");

let currentIndex = 0;
let isScrolling = false;

function changeSlide(index) {
    if (index < 0 || index >= dots.length || index === currentIndex) return;

    currentIndex = index;

    const bg = dots[currentIndex].dataset.bg;

    bgLayer.style.opacity = "0";

    setTimeout(() => {
        bgLayer.style.backgroundImage = `url("${bg}")`;
        bgLayer.style.opacity = "1";
    }, 300);

    dots.forEach((dot) => {
        dot.classList.remove("selected");
    });

    dots[currentIndex].classList.add("selected");
}

dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
        changeSlide(index);
    });
});

window.addEventListener("wheel", (event) => {
    if (isScrolling) return;

    isScrolling = true;

    let nextIndex;

    if (event.deltaY > 0) {
        nextIndex = (currentIndex + 1) % dots.length;
    } else {
        nextIndex = (currentIndex - 1 + dots.length) % dots.length;
    }

    changeSlide(nextIndex);

    setTimeout(() => {
        isScrolling = false;
    }, 800);
});