// let circleBlue = document.querySelector('.circle-blue');
// let circlePink = document.querySelector('.circle-pink');


function addTrack() {
    const elements = [
        {selector: '.circle-blue', startLeft: 830, startTop: -330, diffX: -0.01, diffY: 0.05},
        {selector: '.circle-pink', startLeft: -40, startTop: -350, diffX: 0.04, diffY: -0.02}]

    document.onmousemove = (event) => {
        let x = event.clientX;
        let y = event.clientY;
        elements.forEach(e => {
            let div = document.querySelector(e.selector);
            div.style.left = e.startLeft + e.diffX * x + 'px';
            div.style.top = e.startTop + e.diffY * y + 'px';
        })
    };
}

addTrack();


