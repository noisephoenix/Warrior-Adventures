const GROUNDSPEED_DECAY_MULT = 0.94;
const FORWARD_POWER = 0.5;
const BACKWARDS_POWER = 0.3;
const TURN_RATE = 0.2;
const MIN_SPEED_TO_TURN = 0.5;

function warriorClass() {

    this.x = 75;
    this.y = 75;
    this.ang = 0;
    this.speed = 0;
    this.mywarriorPic; //which car picture to use
    this.name = "Untitled Warrior"

    this.KeyHeld_Accelerate = false;
    this.KeyHeld_TurnLeft = false;
    this.KeyHeld_Reverse = false;
    this.KeyHeld_TurnRight = false;

    this.controlKeyUp;
    this.controlKeyLeft;
    this.controlKeyDown;
    this.controlKeyRight;

    this.setupInput = function (upKey, leftKey, downKey, rightKey) {
        this.controlKeyUp = upKey;
        this.controlKeyLeft = leftKey;
        this.controlKeyDown = downKey;
        this.controlKeyRight = rightKey;

    }

    this.reset = function (whichImage, warriorName) {
        this.name = warriorName;
        this.mywarriorPic = whichImage;
        this.speed = 0;

        for (var eachRow = 0; eachRow < WORLD_ROWS; eachRow++) {
            for (var eachCol = 0; eachCol < WORLD_COLS; eachCol++) {
                var arrayIndex = rowColtoArrayIndex(eachCol, eachRow);
                if (worldGrid[arrayIndex] == WORLD_PLAYERSTART) {
                    worldGrid[arrayIndex] = WORLD_ROAD;
                    this.ang = -Math.PI / 2; // start car facing up
                    this.x = eachCol * WORLD_W + WORLD_W / 2;
                    this.y = eachRow * WORLD_H + WORLD_H / 2;
                    return;
                } // end of player start if
            } // end of col for
        } // end of row for
        console.log("NO PLAYER START FOUND");
    } // end of reset func

    this.move = function() {
        this.speed *= GROUNDSPEED_DECAY_MULT;
        if (this.KeyHeld_Accelerate) {
            this.speed += FORWARD_POWER;
        }

        if (this.KeyHeld_Reverse) {
            this.speed -= BACKWARDS_POWER;
        }
        if (Math.abs(this.speed) > MIN_SPEED_TO_TURN) {
            if (this.KeyHeld_TurnLeft) {
                this.ang -= TURN_RATE;
            }

            if (this.KeyHeld_TurnRight) {
                this.ang += TURN_RATE;
            }
        }

        this.x += Math.cos(this.ang) * this.speed;
        this.y += Math.sin(this.ang) * this.speed;

        warriorWorldHandling(this);
    }

    this.draw = function() {
        drawBitmapCenteredWithRotation(this.mywarriorPic, this.x, this.y, this.ang);

    }

}