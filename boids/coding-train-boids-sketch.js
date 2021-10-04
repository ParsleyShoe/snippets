const flock = [];

let alignmentSlider, cohesionSlider, separationSlider;

function setup() {
    createCanvas(400, 400);
    alignmentSlider = createSlider(0, 5, 1, 0.1);
    cohesionSlider = createSlider(0, 5, 1, 0.1);
    separationSlider = createSlider(0, 5, 1, 0.1);
    for (let i = 0; i < 100; i++) {
        flock.push(new Boid());
    }
}

function draw() {
    background(50);

    for (let boid of flock) {
        boid.flock(flock);
        boid.edges();
        boid.update();
        boid.show();
    }
}

// additional play factors:

// perception radius slider
// max force slider
// max speed slider
// boid design (birds, butterflies, tadpols, etc.)
// 3D?? ohhh shit
// boids with slightly different parameters
// the idea of a view (boids can only see boids in front of them)
// adding obstacles
