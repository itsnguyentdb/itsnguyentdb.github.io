const menuTemplate = document.createElement('template');
menuTemplate.innerHTML = /*html*/`
<style>
    .skip-content{
        display: none;
    }
    .content {
  align-items: center;
  justify-items: center;
  left: 50%;
  margin-bottom: 3%;
}
.title > h1 {
  font-size: 15vw;
  color: white;
  text-align: center;
  margin: auto;
  width: 80%;
  padding: 10px;
  user-select: none;
}
.content .quote {
  margin: auto;
  width: 70%;
  padding: 10px;
  font-size: 1.5em;
  color: white;
  text-align: center;
  user-select: none;
}
    .nav-menu-button-warpper {
    position: fixed;
    top: 10px;
    right: 10px;
    z-index: 3002;
    transform: scale(0.6);
    }

    .nav-menu-button {
    --circle-size: 100px;
    position: relative;
    display: block;
    height: var(--circle-size);
    width: var(--circle-size);

    border: solid white 1px;
    border-radius: 100%;
    background-color: transparent;
    z-index: 3001;
    text-align: center;
    /* margin: 0 auto; */
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    overflow: hidden;
    transition: transform 400ms,
        scale 300ms
        linear(
            /* https://developer.chrome.com/docs/css-ui/css-linear-easing-function */
            /* Start to 1st bounce */ 0,
            0.004,
            0.016,
            0.035,
            0.063 9.1%,
            0.141,
            0.25,
            0.391,
            0.563,
            0.765,
            1,
            /* 1st to 2nd bounce */ 0.891,
            0.813 45.5%,
            0.785,
            0.766,
            0.754,
            0.75,
            0.754,
            0.766,
            0.785,
            0.813 63.6%,
            0.891,
            1 72.7%,
            /* 2nd to 3rd bounce */ 0.973,
            0.953,
            0.941,
            0.938,
            0.941,
            0.953,
            0.973,
            1,
            /* 3rd bounce to end */ 0.988,
            0.984,
            0.988,
            1
        );
    }
    .nav-menu-fill {
    content: "";
    position: fixed;
    background: white;
    top: 100px;
    right: -50px;
    width: 200px;
    height: 200px;
    border-radius: 50%;
    cursor: none;
    transition: 500ms cubic-bezier(0.6, -0.28, 0.735, 0.045),
        transform 200ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }

    .nav-menu-button:active {
    transform: scale(1.5);
    }
    .nav-menu-icon {
    position: relative;
    width: 80%;
    height: auto;
    margin: 0 auto;
    padding: 10px;
    display: flex;
    flex-direction: column;
    transform: translateX(2%);
    }

    .nav-menu-icon span {
    background: white;
    border-radius: 10px;
    height: 7px;
    margin: 5px 0;
    z-index: 3000;
    transition: 400ms cubic-bezier(0.68, -0.6, 0.32, 1.6);
    }
    .nav-menu-icon span:nth-of-type(1) {
    width: 50%;
    }
    .nav-menu-icon span:nth-of-type(2) {
    width: 100%;
    }
    .nav-menu-icon span:nth-of-type(3) {
    width: 75%;
    }

    .overlay-nav-menu {
    position: fixed;
    display: block;
    background-color: #160e0e;
    right: 0%;
    width: 100vw;
    height: 100%;
    z-index: 2000;
    transform: translateX(100%);
    transition: transform 300ms ease-in-out;
    }
    .overlay-nav-menu .nav-menu-warpper {
    padding-top: 20%;
    padding-left: 10%;
    }
    .overlay-nav-menu .menu-section {
    font-size: 5vmin;
    border-bottom: solid white 2px;
    color: white;
    text-transform: uppercase;
    }
    .overlay-nav-menu .nav-links {
    display: flex;
    padding-left: 10vmin;
    flex-direction: column;
    }
    .overlay-nav-menu .nav-links li {
    list-style: none;
    width: 0%;
    }
    .overlay-nav-menu .nav-links li a {
    position: relative;
    margin: 10px;
    padding: 20px;
    color: white;
    font-weight: bold;
    text-decoration: none;
    }
    .overlay-nav-menu .nav-links li a::before {
    content: "";
    position: absolute;
    }
    @media only screen and (min-width: 772px){
.nav-menu-button-warpper {
position: fixed;
top: 10px;
right: 10px;
z-index: 3002;
transform: scale(0.6);
}

.nav-menu-button {
--circle-size: 100px;
position: relative;
display: block;
height: var(--circle-size);
width: var(--circle-size);

border: solid white 1px;
border-radius: 100%;
background-color: transparent;
z-index: 3001;
text-align: center;
/* margin: 0 auto; */
align-items: center;
justify-content: space-between;
cursor: pointer;
overflow: hidden;
transition: transform 400ms,
scale 300ms
linear(
  /* https://developer.chrome.com/docs/css-ui/css-linear-easing-function */
    /* Start to 1st bounce */ 0,
  0.004,
  0.016,
  0.035,
  0.063 9.1%,
  0.141,
  0.25,
  0.391,
  0.563,
  0.765,
  1,
  /* 1st to 2nd bounce */ 0.891,
  0.813 45.5%,
  0.785,
  0.766,
  0.754,
  0.75,
  0.754,
  0.766,
  0.785,
  0.813 63.6%,
  0.891,
  1 72.7%,
  /* 2nd to 3rd bounce */ 0.973,
  0.953,
  0.941,
  0.938,
  0.941,
  0.953,
  0.973,
  1,
  /* 3rd bounce to end */ 0.988,
  0.984,
  0.988,
  1
);
}
.nav-menu-fill {
content: "";
position: fixed;
background: white;
top: 100px;
right: -50px;
width: 200px;
height: 200px;
border-radius: 50%;
cursor: none;
transition: 500ms cubic-bezier(0.6, -0.28, 0.735, 0.045),
transform 200ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.nav-menu-button:active {
transform: scale(1.5);
}
.nav-menu-icon {
position: relative;
width: 80%;
height: auto;
margin: 0 auto;
padding: 10px;
display: flex;
flex-direction: column;
z-index: 10000;
}

.nav-menu-icon span {
background: white;
border-radius: 10px;
height: 7px;
margin: 5px 0;
z-index: 3000;
transition: 400ms cubic-bezier(0.68, -0.6, 0.32, 1.6);
}
.nav-menu-icon span:nth-of-type(1) {
width: 50%;
}
.nav-menu-icon span:nth-of-type(2) {
width: 100%;
}
.nav-menu-icon span:nth-of-type(3) {
width: 75%;
}

.overlay-nav-menu {
position: fixed;
display: block;
background-color: #160e0e;
right: 0%;
width: 70%;
height: 100%;
z-index: 2000;
transform: translateX(100%);
transition: transform 300ms ease-in-out;
}
.overlay-nav-menu .nav-menu-warpper {
padding-top: 20%;
padding-left: 10%;
}
.overlay-nav-menu .menu-section {
font-size: 5vmin;
border-bottom: solid white 2px;
color: white;
text-transform: uppercase;
}
.overlay-nav-menu .nav-links {
display: flex;
padding-left: 10vmin;
flex-direction: column;
}
.overlay-nav-menu .nav-links li {
list-style: none;
width: 0%;
}
.overlay-nav-menu .nav-links li a {
position: relative;
margin: 10px;
padding: 20px;
color: white;
font-weight: bold;
text-decoration: none;
}
.overlay-nav-menu .nav-links li a::before {
content: "";
position: absolute;
}
}

@media only screen and (min-width: 992px){
nav {
top: 0;
left: 0;
height: 70px;
width: 100%;
background-color: white;
}
.nav-menu-button-warpper {
position: fixed;
top: 10px;
right: 10px;
z-index: 3002;
transform: scale(0.9);
}
nav .nav-bar {
position: relative;
height: 100%;
width: 100%;
background-color: #160e0e;
margin: 0 auto;
display: flex;
align-items: center;
justify-content: space-between;
}
.nav-bar .nav-links {
display: flex;
align-items: center;
}
.nav-bar .nav-links li {
list-style: none;
}
.nav-bar .nav-links li a {
position: relative;
padding: 10px;
}
.nav-bar .nav-links li a::before {
content: "";
position: absolute;
left: 50%;
bottom: 0;
transform: translateX(50%);
height: 6px;
width: 6px;
border-radius: 50%;
background-color: white;
opacity: 0;
transform: scale(0);
transition: transform 200ms ease-in-out, opacity 300ms ease-in-out;
}
.nav-bar .nav-links a:not([data-state=""])::before {
transform: scale(1);
opacity: 1;
}
.nav-link {
position: relative;
width: 200px;
padding: 15px 20px;
background-color: transparent;
display: flex;
justify-content: center;
align-items: center;
font-size: 1.5rem;
text-transform: uppercase;
text-decoration: none;
font-weight: 600;
letter-spacing: 0.1rem;
cursor: pointer;
transition: transform 300ms
linear(
/* https://developer.chrome.com/docs/css-ui/css-linear-easing-function */
  /* Start to 1st bounce */ 0,
0.004,
0.016,
0.035,
0.063 9.1%,
0.141,
0.25,
0.391,
0.563,
0.765,
1,
/* 1st to 2nd bounce */ 0.891,
0.813 45.5%,
0.785,
0.766,
0.754,
0.75,
0.754,
0.766,
0.785,
0.813 63.6%,
0.891,
1 72.7%,
/* 2nd to 3rd bounce */ 0.973,
0.953,
0.941,
0.938,
0.941,
0.953,
0.973,
1,
/* 3rd bounce to end */ 0.988,
0.984,
0.988,
1
);
}
.nav-link span {
position: relative;
pointer-events: none;
color: rgba(255, 255, 255, 0.25);
transition: 500ms;
}
a:not([data-state=""]) > span {
color: rgba(255, 255, 255, 1);
}
.nav-menu-button {
--circle-size: 100px;
position: relative;
display: block;
height: var(--circle-size);
width: var(--circle-size);

border: solid white 1px;
border-radius: 100%;
background-color: transparent;
z-index: 3001;
text-align: center;
/* margin: 0 auto; */
align-items: center;
justify-content: space-between;
cursor: pointer;
overflow: hidden;
transition: transform 400ms,
scale 300ms
linear(
  /* https://developer.chrome.com/docs/css-ui/css-linear-easing-function */
    /* Start to 1st bounce */ 0,
  0.004,
  0.016,
  0.035,
  0.063 9.1%,
  0.141,
  0.25,
  0.391,
  0.563,
  0.765,
  1,
  /* 1st to 2nd bounce */ 0.891,
  0.813 45.5%,
  0.785,
  0.766,
  0.754,
  0.75,
  0.754,
  0.766,
  0.785,
  0.813 63.6%,
  0.891,
  1 72.7%,
  /* 2nd to 3rd bounce */ 0.973,
  0.953,
  0.941,
  0.938,
  0.941,
  0.953,
  0.973,
  1,
  /* 3rd bounce to end */ 0.988,
  0.984,
  0.988,
  1
);
}
.nav-menu-fill {
display: block;
content: "";
position: fixed;
background: white;
top: 100px;
right: -50px;
width: 0;
height: 0;
border-radius: 50%;
cursor: none;
transition: transform 400ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
.nav-menu-button:hover .nav-menu-fill {
width: 200px;
height: 200px;
transform: translate(0, -150px);
}
.nav-menu-button:active {
transform: scale(1);
}
.nav-menu-icon {
position: relative;
width: 80%;
height: auto;
margin: 0 auto;
padding: 10px;
display: flex;
flex-direction: column;
}

.nav-menu-icon span {
background: white;
border-radius: 10px;
height: 7px;
margin: 5px 0;
z-index: 3000;
transition: 400ms cubic-bezier(0.68, -0.6, 0.32, 1.6);
}
.nav-menu-icon span:nth-of-type(1) {
width: 50%;
}
.nav-menu-icon span:nth-of-type(2) {
width: 100%;
}
.nav-menu-icon span:nth-of-type(3) {
width: 75%;
}
.nav-menu-button:hover .nav-menu-icon span {
background: #160e0e;
}
.overlay-nav-menu {
position: fixed;
display: block;
background-color: #160e0e;
right: 0%;
width: 40%;
height: 100%;
z-index: 2000;
transform: translateX(100%);
transition: transform 300ms ease-in-out;
}
.overlay-nav-menu .nav-menu-warpper {
padding-top: 20%;
padding-left: 10%;
}
.overlay-nav-menu .menu-section {
font-size: 5vmin;
border-bottom: solid white 1px;
color: white;
text-transform: uppercase;
}
.overlay-nav-menu .nav-links {
display: flex;
padding-left: 10vmin;
flex-direction: column;
}
.overlay-nav-menu .nav-links li {
list-style: none;
width: 0%;
}
.overlay-nav-menu .nav-links li a {
position: relative;
margin: 10px;
padding: 20px;
}
.overlay-nav-menu .nav-links li a::before {
content: "";
position: absolute;
left: 5%;
transform: translateX(50%);
height: 10px;
width: 10px;
border-radius: 50%;
background-color: white;
opacity: 0;
transform: scale(0);
transition: transform 200ms ease-in-out, opacity 300ms ease-in-out;
}
.overlay-nav-menu .nav-links a:not([data-state=""])::before {
transform: scale(1);
opacity: 1;
}
}
@media screen and (prefers-reduced-motion: reduce) {
  .nav-menu-icon span {
    transition: none !important;
  }
  .nav-menu-button {
    transition: none !important;
  }
  .nav-menu-fill {
    transition: none !important;
  }
  .overlay-nav-menu {
    transition: none !important;
  }
  .overlay-nav-menu .nav-links li a::before {
    transition: none !important;
  }
  .nav-link {
    transition: none !important;
  }
  .nav-link span {
    transition: none !important;
  }
  .nav-bar .nav-links li a::before {
    transition: none !important;
  }
}
@media (prefers-color-scheme: light){
    .title > h1 {
    color: #160e0e;
  }
  .content .quote {
    color: #160e0e;
  }

  .skip-content {
    color: #160e0e;
  }

  nav {
    background-color: white;
  }
  nav .nav-bar {
    background-color: white;
  }
  .nav-bar .nav-links li a::before {
    background-color: #160e0e;
  }
  .nav-link span {
    color: rgba(22, 14, 14, 0.25);
  }
  .nav-link:hover span {
    color: rgba(22, 14, 14, 1);
  }
  .nav-menu-button {
    border: solid #160e0e 1px;
  }
  .nav-menu-fill {
    background: #160e0e;
  }

  .nav-menu-icon span {
    background: #160e0e;
  }
  .nav-menu-button:hover .nav-menu-icon span {
    background: white;
  }
  .overlay-nav-menu {
    background-color: white;
  }
  .overlay-nav-menu .menu-section {
    border-bottom: solid #160e0e 1px;
    color: #160e0e;
  }
  .overlay-nav-menu .nav-links li a::before {
    background-color: #160e0e;
  }
}
</style>
<header>
<a class="skip-content" href="#main-container" tabindex="-1"
    >Skip to main content</a
>
<div class="nav-menu-button-warpper">
    <button class="nav-menu-button">
    <div class="nav-menu-icon">
        <span></span>
        <span></span>
        <span></span>
    </div>
    <div class="nav-menu-fill"></div>
    </button>
</div>
</header>
<div class="overlay-nav-menu">
<div class="nav-menu-warpper">
    <div class="menu-section">Navigation</div>
    <ul class="nav-links" style = "display: flex">
    <li>
        <a class="nav-link" datatype="" href="index.html">
        <span>Works</span>
        </a>
    </li>
    <li>
        <a class="nav-link" datatype="" href="albums.html">
        <span>Albums</span>
        </a>
    </li>
    <li>
        <a class="nav-link" datatype="" href="about.html">
        <span>About</span>
        </a>
    </li>
    </ul>
</div>
</div>
<nav>
<div class="nav-bar">
    <div class="menu">
    <ul class="nav-links">
        <li>
        <a class="nav-link" datatype="" href="index.html">
            <span>Works</span>
        </a>
        </li>
        <li>
        <a class="nav-link" datatype="" href="albums.html">
            <span>Albums</span>
        </a>
        </li>
        <li>
        <a class="nav-link" datatype="" href="about.html">
            <span>About</span>
        </a>
        </li>
    </ul>
    </div>
</div>
</nav>
<div class="content">
<div class="title">
  <h1>ナブナ</h1>
</div>
<div class="quote interactable" data-type="">
  Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius nesciunt
  pariatur commodi mollitia ducimus eum voluptatum adipisci veniam est
  modi temporibus odio aut deleniti dolorem, nobis dignissimos quis
  incidunt sapiente! Lorem ipsum dolor sit amet consectetur adipisicing
  elit. Officia culpa aspernatur ullam suscipit cumque delectus
  reprehenderit quasi ratione nulla! Rem id sequi nemo ipsa quos illo
  tenetur laboriosam omnis magni?
</div>
</div>`;
class Menu extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    const pseudoRoot = this.attachShadow({ mode: 'open' });
    pseudoRoot.appendChild(menuTemplate.content);
  }
}

customElements.define('menu-component', Menu);

const preload = document.getElementsByClassName('preloader')[0];
const menuComponent = document.getElementsByTagName('menu-component')[0];
const navBar = menuComponent.shadowRoot.querySelector('.nav-bar');
const menuNavLinks = navBar.querySelector('.nav-links');
const menuNavOptions = menuNavLinks.querySelectorAll('a span');
const menuButton = menuComponent.shadowRoot.querySelector('.nav-menu-button');
const overlayNavMenu = menuComponent.shadowRoot.querySelector('.overlay-nav-menu');
const sideNavOptions = overlayNavMenu.querySelectorAll('a span');
const iconDashes = menuComponent.shadowRoot.querySelectorAll('.nav-menu-icon span');
const lyricsList = ["Summer cicadas, the ends of the sky the faded song, while it was still melted in my ears. Your voice echoes, around the nooks of summer swimming through town like a fish.", "I draw a morning with a formless song and I\'ll go beyond the shallow, shallow summer days. I see your palms, they are not cold to me, in the dawn sky and the dawn fireflies.", "Wait, please understand it\'s nothing, so please don\'t laugh at my dream. The tears, the tears went away with the sea train. Begone, if you\'ll end up going away. Please don\'t let me stop right here, please cry, laugh, SOS, I, you, I. I cried myself out with the final train, drowning in that sky.", "We go pit-a-pat pit-a-pat, to know what lies in our hearts. Even still, I\'ll only just be admiring flowers. You have, alas, alas, alas, alas, gone to live far away, as I write in trembling words, the morning ends. The paper ends, though I\'m filled with things I want to say, I\'m sorry that nothing comes out. It\'s just my strange song about having become just a poisonous bug.", "Tomorrow, poetry and vows will shoot past the indigo. Shouting of today, when you don\'t want to be here, I realized that I can\'t talk about my dreams. Oh, shallow summer, end for me. Morning glories, torii gates, impatiens, bus stops, I was walking through the town after sunrise, today, again.", "Petals float in the air, like a pair of sandals, dancing. If you go away completely, vanishing into thin air, I\'ll still be right here fluttering, fluttering about just standing here alone, on the day of your funeral. Hanging my head, all alone, just that and nothing more.", "Words won\'t come out, just like they don\'t, my voice was definitely resounding. Even now, I hate it; Something like hate— Too close words don\'t reach— Aah, it hurts, a painful condition; Both songs and colors are of 68 nights. Yes, we\'ll say farewell with this, I send to you. Resounding throughout the night sky, a transparent elegy."];
const quoteSection = menuComponent.shadowRoot.querySelector('.quote');

window.addEventListener('load', () => {
  menuNavOptions.forEach((o) => {
    if (o.textContent.toUpperCase() === preload.textContent.toUpperCase()) {
      o.parentElement.dataset.state = "e";
    }
    else {
      o.parentElement.dataset.state = "";
      o.parentElement.parentElement.addEventListener('mouseover', () => {
        o.parentElement.dataset.state = "e";
      });
      o.parentElement.parentElement.addEventListener('mouseleave', () => {
        o.parentElement.dataset.state = "";
      });
    }
  })
  sideNavOptions.forEach((o) => {
    if (o.textContent.toUpperCase() === preload.textContent.toUpperCase()) {
      o.parentElement.dataset.state = "e";
    }
    else {
      o.parentElement.dataset.state = "";
      o.parentElement.parentElement.addEventListener('mouseover', () => {
        o.parentElement.dataset.state = "e";
      });
      o.parentElement.parentElement.addEventListener('mouseleave', () => {
        o.parentElement.dataset.state = "";
      });
    }
  })
});

menuComponent.shadowRoot.querySelectorAll('.interactable').forEach(i => {
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


if (quoteSection !== null) {
  const chosenLyrics = lyricsList[Math.floor(Math.random() * lyricsList.length)];
  quoteSection.textContent = `"${chosenLyrics}"`;
}
window.onresize = () => {
  isInMobileDeviceWidth = !window.matchMedia('(min-width: 772px)').matches && !window.matchMedia('(min-width: 992px)').matches;
  isInTabletWidth = !isInMobileDeviceWidth && !window.matchMedia('(min-width: 992px)').matches;
  if (isInMobileDeviceWidth || isInTabletWidth) {
    menuButton.querySelector('.nav-menu-fill').style.background = isOpeningNavMenu ? "white" : "#160e0e";
    menuButton.querySelectorAll('span').forEach(element => {
      element.style.background = !isOpeningNavMenu ? "white" : "#160e0e";
    });
  }
}

const navObserver = new IntersectionObserver((entries, observers) => {
  const entry = entries[0];
  if (!entry.isIntersecting) {
    menuNavLinks.style.display = 'none';
    menuButton.style.scale = 1;
  }
  else {
    menuNavLinks.style.display = 'flex';
    menuButton.style.scale = 0;
  }
});
navObserver.observe(navBar);


menuButton.addEventListener('mousemove', (e) => {
  if (isReducedMotion || isInMobileDeviceWidth) {
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
  if (!isOpeningNavMenu) {
    body.style.overflowY = "hidden";
    overlayNavMenu.style.transform = 'translateX(0%)';
    iconDashes[0].style.transformOrigin = "bottom";
    iconDashes[0].style.transform = "rotatez(45deg) translate(9px, 4px)";
    iconDashes[1].style.transformOrigin = "top";
    iconDashes[1].style.transform = "rotatez(-45deg) translate(-3px, 1px)";
    iconDashes[1].style.width = "90%";
    iconDashes[2].style.transformOrigin = "bottom";
    iconDashes[2].style.width = "50%";
    iconDashes[2].style.transform = "translate(21px, -7px) rotatez(45deg)";
  }
  else {
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
  if (isInMobileDeviceWidth || isInTabletWidth) {
    menuButton.querySelector('.nav-menu-fill').style.transform = isOpeningNavMenu ? "translate(0, -150px)" : "";
    menuButton.querySelector('.nav-menu-fill').style.background = !isOpeningNavMenu ? "#160e0e" : "white";
    menuButton.querySelectorAll('span').forEach(element => {
      element.style.background = isOpeningNavMenu ? "#160e0e" : "white";
    });
  }
});

let navButton = menuComponent.shadowRoot.querySelectorAll('.nav-link').forEach(button => {
  if (isReducedMotion || isInMobileDeviceWidth) {
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