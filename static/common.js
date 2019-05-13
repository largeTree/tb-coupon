function setAutoRem() {
    window.onresize = function () {
        window.document.body.parentElement.style.fontSize = (window.innerWidth / 7.5) + 'px';
    }
}