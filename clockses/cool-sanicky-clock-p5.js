function setup() {
    createCanvas(500, 500);
    angleMode(DEGREES);
    slider = createSlider(100, 410, 270);
}

function draw() {
    background(0);
    translate(width / 2, height / 2);
    rotate(-90);

    let innerSize = slider.value();
    let midSize = innerSize + (450 - innerSize) / 2;

    let h = hour();
    let min = minute();
    let sec = second();

    let dayH = color("limegreen");
    let dayM = color("skyblue");
    let dayS = color("gold");

    let nightH = color("blue");
    let nightM = color("purple");
    let nightS = color("lightgray");

    strokeWeight(10);
    noFill();

    let hourAng = map(h % 12, 0, 12, 0, 360);
    if (h <= 12) stroke(dayH);
    else stroke(nightH);
    arc(0, 0, innerSize, innerSize, 0, hourAng);
    push();
    rotate(hourAng);
    line(0, 0, innerSize / 2, 0);
    pop();

    let minAng = map(min, 0, 60, 0, 360);
    if (h <= 12) stroke(dayM);
    else stroke(nightM);
    arc(0, 0, midSize, midSize, 0, minAng);
    push();
    rotate(minAng);
    line(0, 0, midSize / 2, 0);
    pop();

    let secAng = map(sec, 0, 60, 0, 360);
    if (h <= 12) stroke(dayS);
    else stroke(nightS);
    arc(0, 0, 450, 450, 0, secAng);
    push();
    rotate(secAng);
    line(0, 0, 225, 0);
    pop();

    strokeWeight(innerSize / 2);
    stroke(0);
    point(0, 0);
}
