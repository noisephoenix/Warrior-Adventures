const KEY_W = 87;
const KEY_A = 65;
const KEY_S = 83;
const KEY_D = 68;

const KEY_UP = 38;
const KEY_LEFT = 37;
const KEY_DOWN = 40;
const KEY_RIGHT = 39;

//37, 38, 40, 39


var mouseX = 0;
var mouseY = 0;

function setupInput() {
    canvas.addEventListener('mousemove', updateMousePos);

    document.addEventListener('keydown', keyPressed);
    document.addEventListener('keyup', keyReleased);

    warrior.setupInput(KEY_W, KEY_A, KEY_S, KEY_D);
}

function updateMousePos(evt) {
    var rect = canvas.getBoundingClientRect();
    var root = document.documentElement;

    mouseX = evt.clientX - rect.left - root.scrollLeft;
    mouseY = evt.clientY - rect.top - root.scrollTop;

    // cheat to test car in any position
    /*
    carX = mouseX;
    carY = mouseY;
    carSpeedX = 4;
    carSpeedY = -4;
    */
}

function keySet(keyEvent, whichWarrior, setTo) {
    if (keyEvent.keyCode == whichWarrior.controlKeyUp) {
        whichWarrior.KeyHeld_Accelerate = setTo;
    }
    if (keyEvent.keyCode == whichWarrior.controlKeyLeft) {
        whichWarrior.KeyHeld_TurnLeft = setTo;
    }
    if (keyEvent.keyCode == whichWarrior.controlKeyDown) {
        whichWarrior.KeyHeld_Reverse = setTo;
    }
    if (keyEvent.keyCode == whichWarrior.controlKeyRight) {
        whichWarrior.KeyHeld_TurnRight = setTo;
    }
}

function keyPressed(evt) {
    //console.log("Key pressed: " +evt.keyCode);
    keySet(evt, warrior, true);
}

function keyReleased(evt) {
    //console.log("Key released: " +evt.keyCode);
    keySet(evt, warrior, false);
}