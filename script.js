const mouse = { x: 0, y: 0 };
const circle = { x: 0, y: 0 };
const previousPosition = { x: 0, y: 0 };
const speed = 0.2;
const threshold = 10;
const hoverScale = 3;

let currentScale = 0;
let currentAngle = 0;
let interacting = false;
let isCursorMoving = false;

let isPlayingTrackAnimation = false;
let trackAnimationEndTimeout = null;

let isDragging = false;

let previousScroll = 0;
let wheelEventEndTimeout = null;
let nextPercentage = 0;
let isWheeling = false;

let isOpeningNavMenu = false;

const circleElement = document.getElementById('cursor');
const borderElement = document.getElementById('cursor-border');
const track = document.getElementById('image-track');
const body = document.querySelector('body');
const main = document.querySelector('main');
const navBar = document.querySelector('.nav-bar');
const navLinks = navBar.querySelector('.nav-links');
const menuButton = document.querySelector('.nav-menu-button');
const overlayNavMenu = document.querySelector('.overlay-nav-menu');
const iconDashes = menuButton.querySelectorAll('.nav-menu-icon span');
const lyricsList = ["Summer cicadas, the ends of the sky the faded song, while it was still melted in my ears. Your voice echoes, around the nooks of summer swimming through town like a fish.", "I draw a morning with a formless song and I\'ll go beyond the shallow, shallow summer days. I see your palms, they are not cold to me, in the dawn sky and the dawn fireflies.", "Wait, please understand it\'s nothing, so please don\'t laugh at my dream. The tears, the tears went away with the sea train. Begone, if you\'ll end up going away. Please don\'t let me stop right here, please cry, laugh, SOS, I, you, I. I cried myself out with the final train, drowning in that sky.", "We go pit-a-pat pit-a-pat, to know what lies in our hearts. Even still, I\'ll only just be admiring flowers. You have, alas, alas, alas, alas, gone to live far away, as I write in trembling words, the morning ends. The paper ends, though I\'m filled with things I want to say, I\'m sorry that nothing comes out. It\'s just my strange song about having become just a poisonous bug.", "Tomorrow, poetry and vows will shoot past the indigo. Shouting of today, when you don\'t want to be here, I realized that I can\'t talk about my dreams. Oh, shallow summer, end for me. Morning glories, torii gates, impatiens, bus stops, I was walking through the town after sunrise, today, again.", "Petals float in the air, like a pair of sandals, dancing. If you go away completely, vanishing into thin air, I\'ll still be right here fluttering, fluttering about just standing here alone, on the day of your funeral. Hanging my head, all alone, just that and nothing more.", "Words won\'t come out, just like they don\'t, my voice was definitely resounding. Even now, I hate it; Something like hate— Too close words don\'t reach— Aah, it hurts, a painful condition; Both songs and colors are of 68 nights. Yes, we\'ll say farewell with this, I send to you. Resounding throughout the night sky, a transparent elegy."];
const quoteSection = document.querySelector('.quote');

if (quoteSection !== null){
    const chosenLyrics = lyricsList[Math.floor(Math.random() * lyricsList.length)];
    quoteSection.textContent = chosenLyrics;
}

let isReducedMotion = window.matchMedia('(prefers-reduced-motion)').matches;
let isUsingLightMode = window.matchMedia('(prefers-color-scheme: light)').matches;
let isInMobileDeviceWidth = !window.matchMedia('(min-width: 772px)').matches && !window.matchMedia('(min-width: 992px)').matches;
let isInTabletWidth = !isInMobileDeviceWidth && !window.matchMedia('(min-width: 992px)').matches;
window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', () => {
    isUsingLightMode = window.matchMedia('(prefers-color-scheme: light)').matches;
    interactColor = isUsingLightMode ? "#160e0e" : "white";
});
window.matchMedia('(prefers-reduced-motion)').addEventListener('change', () => {
    isReducedMotion = window.matchMedia('(prefers-reduced-motion)').matches;
})
window.onresize = () => {
    isInMobileDeviceWidth = !window.matchMedia('(min-width: 772px)').matches && !window.matchMedia('(min-width: 992px)').matches;
    isInTabletWidth = !isInMobileDeviceWidth && !window.matchMedia('(min-width: 992px)').matches;
    if (isInMobileDeviceWidth || isInTabletWidth){
        menuButton.querySelector('.nav-menu-fill').style.background = isOpeningNavMenu ? "white" : "#160e0e";
        menuButton.querySelectorAll('span').forEach(element => {
            element.style.background = !isOpeningNavMenu ? "white" : "#160e0e";
        });
    }
}
let interactColor = isUsingLightMode ? "#160e0e" : "white";
const handleOnDown = e => {
    if (track === null || isOpeningNavMenu || isInMobileDeviceWidth){
        return;
    }
    if (!isOpeningNavMenu && !isDragging){
        isDragging = true;
    }
    track.dataset.mouseDownAt = e.clientX;
}
const handleOnUp = () => {
    if (!isDragging || isInMobileDeviceWidth){
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
    track.dataset.percentage = nextPercentage;
    isPlayingTrackAnimation = true;
}
const handleOnWheel = e => {
    if (track === null || isDragging || isOpeningNavMenu || isInMobileDeviceWidth  || isInTabletWidth){
        return;
    }

    body.style.overflowY = "hidden";
    isWheeling = true;
    var delta = e.wheelDeltaY / 2.5;
    previousScroll += delta;
    maxDelta = window.innerWidth / 2;
    const percentage = (previousScroll / maxDelta) * 100;
    
    nextPercentage = Math.max(Math.min(percentage, 0), -100);
    track.dataset.percentage = nextPercentage;
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
    if (track === null || isNaN(nextPercentage) || isInMobileDeviceWidth){
        return;
    }
    if (!isReducedMotion){
        if (!isInTabletWidth){
            track.animate({
                transform: `translate(${nextPercentage}%, -50%)`
            }, { duration: delay, fill: "forwards" });
            for (const element of track.children) {
                const interactable = element.getElementsByClassName('interactable')[0];
                interactable.animate({
                    backgroundPosition: `${100 + nextPercentage}% center`
                }, { duration: 3200, fill: "forwards" }).addEventListener("finish", () => {
                    isPlayingTrackAnimation = false;
                });
            }
        }
        else{
            track.animate({
                transform: `translate(${nextPercentage}%, -50%)`
            }, { duration: 3200, fill: "forwards" }).addEventListener("finish", () => {
                isPlayingTrackAnimation = false;
            });
        }
    }
    else{
        track.style.transform = `translate(${nextPercentage}%, -50%)`;
        isPlayingTrackAnimation = false;
    }
}

document.querySelectorAll("iframe").forEach(element => {
    element.addEventListener("mouseover", function () {
        circleElement.style.opacity = 0;
        borderElement.style.opacity = 0;
    })
    element.addEventListener("mouseleave", function () {
        circleElement.style.opacity = 1;
        borderElement.style.opacity = 1;
    })
});



body.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;


    handleOnDragMove(e);
    const interactable = e.target.closest(".interactable");
    interacting = interactable !== null;
    circleElement.dataset.type = interacting ? interactable.dataset.type : "";
});
const calculateMouseShape = () => {
    if (isInMobileDeviceWidth){
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
    if (!isReducedMotion){
        isCursorMoving = true;
    }
}
const animateCursor = (_scale, _angle) => {
    if (isInMobileDeviceWidth){
        return;
    }
    const keyframes = {
        transform: `translate(${circle.x}px, ${circle.y}px) rotate(${_angle}deg) scale(${interacting ? hoverScale : 1 + _scale}, ${interacting ? hoverScale : 1 - _scale})`,
    }

    circleElement.style.transform = `translate(${circle.x}px, ${circle.y}px) scale(${interacting ? hoverScale : 1})`;
    if (!isReducedMotion || isCursorMoving){
        borderElement.style.transform = `rotate(${_angle}deg) scale(${interacting ? hoverScale : 1 + _scale}, ${interacting ? hoverScale : 1 - _scale})`;
        borderElement.animate(keyframes, {
            duration: 800,
            fill: "forwards"
        }).addEventListener('finish', () => {
            isCursorMoving = false;
        });
    }
    else{
        if (isCursorMoving){
            return;
        }
        borderElement.style.transform = `translate(${circle.x}px, ${circle.y}px) scale(${interacting ? hoverScale : 1})`;
    }
    if (interacting) {
        borderElement.style.backgroundColor = interactColor;
    }
    else {
        borderElement.style.backgroundColor = "transparent";
    }
}
main.onmouseup = e => handleOnUp(e);
main.onmousedown = e => handleOnDown(e);
if (track !== null){
    track.onwheel = e => handleOnWheel(e);
}
body.onwheel = () => {
    if (isWheeling || isDragging || isOpeningNavMenu){
        return;
    }
    body.style.overflowY = "auto";
};
let navButton = document.querySelectorAll('.nav-link').forEach(button => {
    if (isReducedMotion || isInMobileDeviceWidth){
        return;
    }
    button.addEventListener('mousemove', (e) => {
        let x = e.offsetX;
        let y = e.offsetY;
        let buttonWidth = button.clientWidth;
        let buttonHeight = button.clientHeight;
        let translateX = (x - buttonWidth / 2) / 5;
        let translateY = (y - buttonHeight / 2) / 5;
        button.style.transform = `translateX(${translateX}px) translateY(${translateY}px)`;
    });
    button.addEventListener('mouseout', (e) => {
        button.style.transform = '';
    })
});

const navObserver = new IntersectionObserver((entries, observers) => {
    const entry = entries[0];
    if (!entry.isIntersecting){
        navLinks.style.display = 'none';
        menuButton.style.scale = 1;
    }
    else{
        navLinks.style.display = 'flex';
        menuButton.style.scale = 0;
    }
});
navObserver.observe(navBar);

menuButton.addEventListener('mousemove', (e) => {
    if (isReducedMotion || isInMobileDeviceWidth){
        return;
    }
    let x = e.offsetX;
    let y = e.offsetY;
    let buttonWidth = menuButton.clientWidth;
    let buttonHeight = menuButton.clientHeight;
    let translateX = (x - buttonWidth / 2) / 3;
    let translateY = (y - buttonHeight / 2) / 3;
    menuButton.style.transform = `translateX(${translateX}px) translateY(${translateY}px)`;
});
menuButton.addEventListener('mouseout', (e) => {
    menuButton.style.transform = '';
})
menuButton.addEventListener('click', () => {
    if (!isOpeningNavMenu){
        body.style.overflowY = "hidden";
        overlayNavMenu.style.transform = 'translateX(0%)';
        iconDashes[0].style.transformOrigin = "bottom";
        iconDashes[0].style.transform = "rotatez(45deg) translate(9px, 4px)";
        iconDashes[1].style.transformOrigin = "top";
        iconDashes[1].style.transform = "rotatez(-45deg) translate(-3px, 1px)";
        iconDashes[1].style.width = "90%";
        iconDashes[2].style.transformOrigin = "bottom";
        iconDashes[2].style.width = "50%";
        iconDashes[2].style.transform = "translate(20px, -8px) rotatez(45deg)";
    }
    else{
        overlayNavMenu.style.transform = 'translateX(100%)';
        iconDashes[0].style.transformOrigin = "";
        iconDashes[0].style.transform = "";
        iconDashes[1].style.transformOrigin = "";
        iconDashes[1].style.transform = "";
        iconDashes[2].style.transformOrigin = "";
        iconDashes[2].style.width = "";
        iconDashes[2].style.transform = "";
    }
    isOpeningNavMenu = !isOpeningNavMenu;
    if (isInMobileDeviceWidth || isInTabletWidth){
        menuButton.querySelector('.nav-menu-fill').style.transform = isOpeningNavMenu ? "translate(0, -150px)" : "";
        menuButton.querySelector('.nav-menu-fill').style.background = !isOpeningNavMenu ? "#160e0e" : "white";
        menuButton.querySelectorAll('span').forEach(element => {
            element.style.background = isOpeningNavMenu ? "#160e0e" : "white";
        });
    }
})

const mouseTick = () => {
    calculateMouseShape();
    animateCursor(currentScale, currentAngle);


    window.requestAnimationFrame(mouseTick);
}
const trackTick = () => {
    if (isPlayingTrackAnimation){
        if (isDragging){
            animateTrack(1200);
        }
        else {
            animateTrack(3200);
        }
    }
    window.requestAnimationFrame(trackTick);
}
mouseTick();
trackTick();