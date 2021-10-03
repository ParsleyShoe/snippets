function setup() {
    createCanvas(500, 500);
}

function draw() {
    background(0);
    let step = width / 7;

    let h = hour();
    let min = minute();
    let sec = second();

    stroke(255);

    let hLeft = h;
    for (let p = 5; p >= 0; p--) {
        let powerOfTwo = 2 ** p;
        if (hLeft >= powerOfTwo) {
            hLeft -= powerOfTwo;
            fill(255);
        } else {
            noFill();
        }
        circle((6 - p) * step, height / 4, 30);
    }

    let mLeft = min;
    for (let p = 5; p >= 0; p--) {
        let powerOfTwo = 2 ** p;
        if (mLeft >= powerOfTwo) {
            mLeft -= powerOfTwo;
            fill(255);
        } else {
            noFill();
        }
        circle((6 - p) * step, (height * 2) / 4, 30);
    }

    let sLeft = sec;
    for (let p = 5; p >= 0; p--) {
        let powerOfTwo = 2 ** p;
        if (sLeft >= powerOfTwo) {
            sLeft -= powerOfTwo;
            fill(255);
        } else {
            noFill();
        }
        circle((6 - p) * step, (height * 3) / 4, 30);
    }
}
