let x;
let y;
let xVel;
let yVel;

let dvd_URL = "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/DVD_logo.svg/1280px-DVD_logo.svg.png";
let dvdImg;
let dvdImgResized;
let scale;
let slider;

let colIdx = 0;
let col;
let cols = [ // RGB values taken from https://bouncingdvdlogo.com
    [190, 0  , 255], // purple
    [0  , 255, 255], // cyan
    [255, 130, 0  ], // orange
    [0  , 38 , 255], // blue
    [255, 250, 0  ], // yellow
    [255, 38 , 0  ], // red
    [255, 0  , 140], // magenta
    [38 , 255, 0  ]  // green
];

function preload() {
    dvdImg = loadImage(dvd_URL);
    dvdImgResized = loadImage(dvd_URL);
}

function changeColor() {
    colIdx = colIdx === cols.length - 1 ? 0 : colIdx + 1;
    col = color(cols[colIdx][0], cols[colIdx][1], cols[colIdx][2]);
}

function setup() {
    createCanvas(800, 600);
    slider = createSlider(1, 8, 4, 1);
    scale = slider.value();

    x = random(width - dvdImg.width / scale);
    y = random(height - dvdImg.height / scale);
    xVel = 2;
    yVel = 2;

    dvdImg.filter(INVERT);
    dvdImgResized.copy(dvdImg, 0, 0, dvdImg.width, dvdImg.height, 0, 0, dvdImg.width, dvdImg.height);
    dvdImgResized.resize(floor(dvdImg.width / scale), floor(dvdImg.height / scale));

    col = color(cols[colIdx][0], cols[colIdx][1], cols[colIdx][2]);
}

function draw() {
    background(0);

    if (slider.value() !== scale) {
        scale = slider.value();
        dvdImgResized.copy(dvdImg, 0, 0, dvdImg.width, dvdImg.height, x, y, dvdImg.width, dvdImg.height);
        dvdImgResized.resize(floor(dvdImg.width / scale), floor(dvdImg.height / scale));
    }
    tint(col);
    image(dvdImgResized, x, y, dvdImgResized.width, dvdImgResized.height);

    x += xVel;
    y += yVel;

    if (x + dvdImgResized.width >= width || x <= 0) {
        xVel = -xVel;
        changeColor();
    }
    if (y + dvdImgResized.height >= height || y <= 0) {
        yVel = -yVel;
        changeColor();
    }
}
