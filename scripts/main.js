const mouse = { x: 0, y: 0 };
const circle = { x: 0, y: 0 };
const previousPosition = { x: 0, y: 0 };
const speed = 0.2;
const threshold = 10;
const hoverScale = 3;

let currentScale = 0;
let currentAngle = 0;
let isCursorMoving = false;

let isPlayingTrackAnimation = false;
let trackAnimationEndTimeout = null;

let isDragging = false;

let previousScroll = 0;
let wheelEventEndTimeout = null;
let nextPercentage = 0;
let isWheeling = false;

const preloader = document.querySelector('.preloader');
const cursorElement = document.getElementById('cursor');
const cursorBorderElement = document.getElementById('cursor-border');
const cursorIconElement = document.getElementById('cursor-icon');
const track = document.getElementById('image-track');
const body = document.querySelector('body');
const main = document.querySelector('main');


document.querySelectorAll('.interactable').forEach(i => {
    i.addEventListener('mouseover', () => {
        interacting = true;

        if (i.dataset.type === "") {
            cursorElement.style.display = "none";
            cursorBorderElement.style.mixBlendMode = "difference";
        }
        else {
            cursorElement.dataset.type = i.dataset.type;
            cursorIconElement.className = getCursorIconByType(i.dataset.type);
        }
    });
    i.addEventListener('mouseleave', () => {
        interacting = false;
        cursorElement.style.display = "grid";
        cursorBorderElement.style.mixBlendMode = "normal";
        cursorIconElement.className = getCursorIconByType(undefined);
    });
});

window.addEventListener('load', () => {
    preloader.animate(
        { transform: 'translateY(-100%)' },
        { duration: 900, fill: "forwards", easing: 'ease-out' });
});

const handleOnDown = e => {
    if (track === null || isOpeningNavMenu || isInMobileDeviceWidth) {
        return;
    }
    if (!isOpeningNavMenu && !isDragging) {
        isDragging = true;
    }
    track.dataset.mouseDownAt = e.clientX;
}
const handleOnUp = () => {
    if (!isDragging || isInMobileDeviceWidth) {
        return;
    }
    track.dataset.mouseDownAt = "0";
    maxDelta = window.innerWidth / 2;
    track.dataset.previousPercentage = track.dataset.percentage;
    previousScroll = (parseFloat(track.dataset.percentage) / 100) * maxDelta;
    isDragging = false;
}
const handleOnDragMove = e => {
    if (isInMobileDeviceWidth || track === null || track.dataset.mouseDownAt === "0") {
        return;
    }
    body.style.overflowY = "hidden";
    const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX;
    maxDelta = window.innerWidth / 2;
    const percentage = (mouseDelta / maxDelta) * -100;
    nextPercentageUnconstrained = parseFloat(track.dataset.previousPercentage) + percentage;
    nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);
    // console.log(`Drag: ${nextPercentage}`);
    track.dataset.percentage = nextPercentage;
    isPlayingTrackAnimation = true;
}
const handleOnWheel = e => {
    if (track === null || isDragging || isOpeningNavMenu || isInMobileDeviceWidth || isInTabletWidth) {
        return;
    }

    body.style.overflowY = "hidden";
    isWheeling = true;
    var delta = e.wheelDeltaY / 2.5;
    previousScroll += delta;
    maxDelta = window.innerWidth / 2;
    const percentage = (previousScroll / maxDelta) * 100;

    nextPercentage = Math.max(Math.min(percentage, 0), -100);
    // console.log(`Scroll: ${nextPercentage}`);
    track.dataset.percentage = nextPercentage;
    track.dataset.previousPercentage = nextPercentage;
    isPlayingTrackAnimation = true;

    //Update the previous scroll value by reversed nextPercentage
    //preventing previousScroll reachs inf
    clearTimeout(wheelEventEndTimeout);
    wheelEventEndTimeout = setTimeout(() => {
        previousScroll = (nextPercentage / 100) * maxDelta;
        handleOnUp();
        isWheeling = false;
    }, 100);
}
const animateTrack = (delay) => {
    if (track === null || isNaN(nextPercentage) || isInMobileDeviceWidth) {
        return;
    }
    if (!isReducedMotion) {
        if (!isInTabletWidth) {
            track.animate({
                transform: `translate(${nextPercentage}%, -50%)`
            }, { duration: delay, fill: "forwards" });
            for (const element of track.children) {
                const interactable = element.getElementsByClassName('interactable')[0];
                interactable.animate({
                    backgroundPosition: `${100 + nextPercentage}% center`
                }, { duration: 800, fill: "forwards" }).addEventListener("finish", () => {
                    isPlayingTrackAnimation = false;
                });
            }
        }
        else {
            track.animate({
                transform: `translate(${nextPercentage}%, -50%)`
            }, { duration: 3200, fill: "forwards" }).addEventListener("finish", () => {
                isPlayingTrackAnimation = false;
            });
        }
    }
    else {
        track.style.transform = `translate(${nextPercentage}%, -50%)`;
        isPlayingTrackAnimation = false;
    }
}

document.querySelectorAll("iframe").forEach(element => {
    element.addEventListener("mouseover", function () {
        cursorElement.style.opacity = 0;
        cursorBorderElement.style.opacity = 0;
    })
    element.addEventListener("mouseleave", function () {
        cursorElement.style.opacity = 1;
        cursorBorderElement.style.opacity = 1;
    })
});

document.querySelectorAll(".hide-cursor").forEach(element => {
    element.addEventListener("mouseover", function () {
        cursorElement.style.opacity = 0;
        cursorBorderElement.style.opacity = 0;
    })
    element.addEventListener("mouseleave", function () {
        cursorElement.style.opacity = 1;
        cursorBorderElement.style.opacity = 1;
    })
});

body.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;


    handleOnDragMove(e);
});
const calculateMouseShape = () => {
    if (isInMobileDeviceWidth) {
        return;
    }
    circle.x += (mouse.x - circle.x) * speed;
    circle.y += (mouse.y - circle.y) * speed;

    const deltaX = mouse.x - previousPosition.x;
    const deltaY = mouse.y - previousPosition.y;

    previousPosition.x = mouse.x;
    previousPosition.y = mouse.y;

    const velocity = Math.min(Math.sqrt(deltaX ** 2 + deltaY ** 2) * 6, 150);
    const scale = (velocity / 150) * 0.5;
    currentScale += (scale - currentScale) * speed;
    const angle = (velocity > threshold) && !interacting ? (Math.atan2(deltaY, deltaX) * 180) / Math.PI : currentAngle;
    if (velocity > threshold) {
        currentAngle = angle;
    }
    if (!isReducedMotion) {
        isCursorMoving = true;
    }
}
const animateCursor = (_scale, _angle) => {
    if (isInMobileDeviceWidth) {
        return;
    }
    const keyframes = {
        transform: `translate(${circle.x}px, ${circle.y}px) rotate(${_angle}deg) scale(${interacting ? hoverScale : 1 + _scale}, ${interacting ? hoverScale : 1 - _scale})`,
    }

    cursorElement.style.transform = `translate(${circle.x}px, ${circle.y}px) scale(${interacting ? hoverScale : 1})`;
    if (!isReducedMotion || isCursorMoving) {
        cursorBorderElement.style.transform = `rotate(${_angle}deg) scale(${interacting ? hoverScale : 1 + _scale}, ${interacting ? hoverScale : 1 - _scale})`;
        cursorBorderElement.animate(keyframes, {
            duration: 800,
            fill: "forwards"
        }).addEventListener('finish', () => {
            isCursorMoving = false;
        });
    }
    else {
        if (isCursorMoving) {
            return;
        }
        cursorBorderElement.style.transform = `translate(${circle.x}px, ${circle.y}px) scale(${interacting ? hoverScale : 1})`;
    }
    if (interacting) {
        cursorBorderElement.style.backgroundColor = interactColor;
    }
    else {
        cursorBorderElement.style.backgroundColor = "transparent";
    }
}
main.onmouseup = e => handleOnUp(e);
main.onmousedown = e => handleOnDown(e);
if (track !== null) {
    track.onwheel = e => handleOnWheel(e);
}
body.onwheel = () => {
    if (isWheeling || isDragging || isOpeningNavMenu) {
        return;
    }
    body.style.overflowY = "auto";
};


function mouseTick() {
    calculateMouseShape();
    animateCursor(currentScale, currentAngle);

    setTimeout(
        window.requestAnimationFrame(mouseTick),
        1000 / 120
    );

};
function trackTick() {
    if (isPlayingTrackAnimation) {
        animateTrack(800);
    }
    setTimeout(
        window.requestAnimationFrame(trackTick),
        1000 / 120
    );

}
mouseTick();
trackTick();