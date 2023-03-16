let circleBlue = document.querySelector('.circle-blue');
let circlePink = document.querySelector('.circle-pink');

let elements = [
    {div: circleBlue, startLeft: 830, startTop: -330, diffX: -0.01, diffY: 0.05},
    {div: circlePink, startLeft: -40, startTop: -350, diffX: 0.04, diffY: -0.02}]

function addTrack(elements) {
    document.onmousemove = (event) => {
        let x = event.clientX;
        let y = event.clientY;
        elements.forEach(e => {
            e.div.style.left = e.startLeft + e.diffX * x + 'px';
            e.div.style.top = e.startTop + e.diffY * y + 'px';
        })
    };
}

addTrack(elements);

