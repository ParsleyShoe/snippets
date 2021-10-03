function setup() {
    createCanvas(500, 500);
    angleMode(DEGREES);
    slider = createSlider(100, 195, 150);
}

function draw() {
    background(0);
    translate(width / 2, height / 2);
    rotate(-90);

    let size = 450;
    let innerSize = slider.value();
    let midSize = innerSize + (size / 2 - innerSize) / 2;

    let h = hour();
    let min = minute();
    let sec = second();

    strokeWeight(10);
    noFill();

    let x;
    let y;

    let hourAng = map(h % 12, 0, 12, 0, 360);
    for (let i = 0; i <= hourAng; i++) {
        if (i % 30 == 0) {
            stroke(`hsl(${i}, 100%, 50%)`);
            x = innerSize * cos(i);
            y = innerSize * sin(i);
            point(x, y);
        }
    }

    let minAng = map(min, 0, 60, 0, 360);
    for (let i = 0; i <= minAng; i++) {
        if (i % 6 == 0) {
            stroke(`hsl(${i}, 100%, 50%)`);
            x = midSize * cos(i);
            y = midSize * sin(i);
            point(x, y);
        }
    }

    let secAng = map(sec, 0, 60, 0, 360);
    for (let i = 0; i <= secAng; i++) {
        if (i % 6 == 0) {
            stroke(`hsl(${i}, 100%, 50%)`);
            x = size / 2 * cos(i);
            y = size / 2 * sin(i);
            point(x, y);
        }
    }
}
