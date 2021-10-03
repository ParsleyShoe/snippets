function setup() {
    createCanvas(500, 500);
}

function draw() {
    background(0);
    stroke(255);

    let times = [hour(), minute(), second()];

    for (let i = 0; i < 3; i++) {
        let time = times[i];
        for (let p = 5; p >= 0; p--) {
            noFill();
            const powerOfTwo = 2 ** p;
            if (time >= powerOfTwo) {
                time -= powerOfTwo;
                fill(255);
            }
            circle((6 - p) * width / 7, height * (i + 1) / 4, 25);
        }
    }
}
