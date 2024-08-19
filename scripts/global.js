let isReducedMotion = window.matchMedia('(prefers-reduced-motion)').matches;
let isUsingLightMode = window.matchMedia('(prefers-color-scheme: light)').matches;
let isInMobileDeviceWidth = !window.matchMedia('(min-width: 772px)').matches && !window.matchMedia('(min-width: 992px)').matches;
let isInTabletWidth = !isInMobileDeviceWidth && !window.matchMedia('(min-width: 992px)').matches;
let isOpeningNavMenu;
let interacting;
let interactColor = isUsingLightMode ? "#160e0e" : "white";

const getCursorIconByType = (type) => {
    switch (type) {
        case "info":
            return "fa fa-search";
        case "link":
            return "fa-solid fa-arrow-up-right-from-square";
        case "check":
            return "fa fa-eye";
        case "none":
            return "none";
        default:
            return "";
    }
}
window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', () => {
    isUsingLightMode = window.matchMedia('(prefers-color-scheme: light)').matches;
    interactColor = isUsingLightMode ? "#160e0e" : "white";
});
window.matchMedia('(prefers-reduced-motion)').addEventListener('change', () => {
    isReducedMotion = window.matchMedia('(prefers-reduced-motion)').matches;
})
