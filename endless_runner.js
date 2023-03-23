const gameArea = document.getElementById("game");
const gameWidth = 50;
const gameHeight = 10;

let player = {
    x: 5,
    y: gameHeight - 2,
    jumping: false
};

let obstacle = {
    x: gameWidth,
    y: gameHeight - 2
};

let sky = [
    { x: gameWidth / 2, y: 2 },
    { x: gameWidth * 3 / 4, y: 3 }
];

function draw() {
    let display = "";

    for (let y = 0; y < gameHeight; y++) {
        for (let x = 0; x < gameWidth; x++) {
            if (x === player.x && y === player.y) {
                display += "P";
            } else if (x === obstacle.x && y === obstacle.y) {
                display += "|";
            } else if (sky.some(s => s.x === x && s.y === y)) {
                display += "~";
            } else if (y === gameHeight - 1) {
                display += "-";
            } else {
                display += " ";
            }
        }
        display += "\n";
    }

    gameArea.textContent = display;
}

function update() {
    if (player.jumping) {
        player.y -= 1;
        if (player.y === gameHeight - 4) {
            player.jumping = false;
        }
    } else {
        if (player.y < gameHeight - 2) {
            player.y += 1;
        }
    }

    obstacle.x -= 1;
    if (obstacle.x < 0) {
        obstacle.x = gameWidth;
    }

    sky.forEach(s => {
        s.x -= 0.5;
        if (s.x < 0) {
            s.x = gameWidth;
        }
    });

    if (player.x === obstacle.x && player.y === obstacle.y) {
        alert("Game Over!");
        obstacle.x = gameWidth;
    }
}

function jump() {
    if (!player.jumping && player.y === gameHeight - 2) {
        player.jumping = true;
    }
}

function moveLeft() {
    if (player.x > 0) {
        player.x -= 1;
    }
}

function moveRight() {
    if (player.x < gameWidth - 1) {
        player.x += 1;
    }
}

document.body.addEventListener("keydown", (event) => {
    switch (event.key) {
        case " ":
            jump();
            break;
        case "ArrowLeft":
        case "a":
            moveLeft();
            break;
        case "ArrowRight":
        case "d":
            moveRight();
            break;
    }
});

setInterval(() => {
    update();
    draw();
}, 100);
