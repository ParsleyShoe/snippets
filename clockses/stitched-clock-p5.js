function setup() {
    createCanvas(500, 500);
    angleMode(DEGREES);
    slider = createSlider(1, 11, 6, 1);
}

function draw() {
    background(0);
    translate(width / 2, height / 2);
    rotate(-90);

    let dashLength = slider.value();

    let h = hour();
    let min = minute();
    let sec = second();

    let dayH = color("limegreen");
    let dayM = color("skyblue");
    let dayS = color("gold");

    let nightH = color("blue");
    let nightM = color("purple");
    let nightS = color("lightgray");

    strokeWeight(5);
    noFill();

    let hourAng = map(h % 12, 0, 12, 0, 360);
    if (h <= 12) stroke(dayH);
    else stroke(nightH);
    for (let i = 0; i < hourAng; i++) {
        if (i % 30 == 0) {
            arc(0, 0, 350, 350, i + dashLength / 2 / 2, i + 30 - dashLength / 2 / 2);
        }
    }

    let minAng = map(min, 0, 60, 0, 360);
    if (h <= 12) stroke(dayM);
    else stroke(nightM);
    for (let i = 0; i < minAng; i++) {
        if (i % 6 == 0) {
            arc(0, 0, 400, 400, i + dashLength / 2 / 2, i + 6 - dashLength / 2 / 2);
        }
    }

    let secAng = map(sec, 0, 60, 0, 360);
    if (h <= 12) stroke(dayS);
    else stroke(nightS);
    for (let i = 0; i < secAng; i++) {
        if (i % 6 == 0) {
            arc(0, 0, 450, 450, i + dashLength / 2 / 2, i + 6 - dashLength / 2 / 2);
        }
    }
}
