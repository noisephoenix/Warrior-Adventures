const MOVEMENT_SPEED = 3;

function warriorClass() {

    this.x = 75;
    this.y = 75;
    this.speed = 0;
    this.mywarriorPic; //which car picture to use
    this.name = "Untitled Warrior"

    this.KeyHeld_North = false;
    this.KeyHeld_West = false;
    this.KeyHeld_South = false;
    this.KeyHeld_East = false;

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
                    worldGrid[arrayIndex] = WORLD_GROUND;
                    
                    this.x = eachCol * WORLD_W + WORLD_W / 2;
                    this.y = eachRow * WORLD_H + WORLD_H / 2;
                    return;
                } // end of player start if
            } // end of col for
        } // end of row for
        console.log("NO PLAYER START FOUND");
    } // end of reset func

    this.move = function() {
        if (this.KeyHeld_North) {
            this.y -= MOVEMENT_SPEED;
        }
        if (this.KeyHeld_South) {
            this.y += MOVEMENT_SPEED;
        }
        if (this.KeyHeld_West) {
            this.x -= MOVEMENT_SPEED;
        }
        if (this.KeyHeld_East) {
            this.x += MOVEMENT_SPEED;
        }
        this.speed = 0;
        
        warriorWorldHandling(this);
    }

    this.draw = function() {
        drawBitmapCenteredWithRotation(this.mywarriorPic, this.x, this.y);

    }

}