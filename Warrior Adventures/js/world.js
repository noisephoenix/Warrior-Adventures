const WORLD_W = 50;
const WORLD_H = 50;
const WORLD_GAP = 2;
const WORLD_COLS = 16;
const WORLD_ROWS = 12
var levelOne = [4, 4, 1, 1, 1, 1, 1, 1, 1, 4, 4, 1, 1, 1, 1, 1,
                4, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1,
                1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
                1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 0, 1,
                1, 0, 0, 1, 1, 1, 4, 1, 1, 1, 1, 1, 1, 1, 0, 4,
                1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1,
                1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1,
                1, 0, 0, 1, 0, 0, 5, 1, 1, 1, 1, 1, 0, 1, 0, 1,
                1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 4, 1, 0, 1, 0, 1,
                1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1,
                1, 2, 0, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 1, 1,
                1, 1, 1, 1, 1, 1, 1, 1, 5, 3, 3, 1, 1, 1, 1, 1,];

var levelList = [levelOne]
var levelNow = 0;
var worldGrid = []

const WORLD_GROUND = 0;
const WORLD_WALL = 1;
const WORLD_PLAYERSTART = 2;
const WORLD_GOAL = 3;
const WORLD_DOOR = 4;
const WORLD_KEY = 5;

function returnTileTypeAtColRow(col, row) {
    if (col >= 0 && col < WORLD_COLS &&
        row >= 0 && row < WORLD_ROWS) {
        var worldIndexUnderCoord = rowColtoArrayIndex(col, row);
        return worldGrid[worldIndexUnderCoord];
    } else {
        return WORLD_WALL;
    }
}

function warriorWorldHandling(whichWarrior) {
    var warriorWorldCol = Math.floor(whichWarrior.x / WORLD_W);
    var warriorWorldRow = Math.floor(whichWarrior.y / WORLD_H);
    //var worldIndexUnderWarrior = rowColtoArrayIndex(warriorWorldCol, warriorWorldRow);

    // colourText(mouseTrackCol+","+mouseTrackRow+":"+trackIndexUnderMouse, mouseX, mouseY, 'yellow');

    if (warriorWorldCol >= 0 && warriorWorldCol < WORLD_COLS &&
        warriorWorldRow >= 0 && warriorWorldRow < WORLD_ROWS) {
        var tileHere = returnTileTypeAtColRow(warriorWorldCol, warriorWorldRow);

        if (tileHere == WORLD_GOAL) {
            console.log(whichWarrior.name + " Wins!")
            nextLevel();
        } else if (tileHere != WORLD_GROUND) {
            whichWarrior.speed = 0;
        } // end of track found
    } // end of valid col and row
} // end of warriorWorldHandling func

function rowColtoArrayIndex(col, row) {
    return col + WORLD_COLS * row;
}

function tileTypeHasTransparency(checkTileType) {
    return (checkTileType == WORLD_GOAL || checkTileType == WORLD_KEY || checkTileType == WORLD_DOOR); 
}

function drawWorld() {
    var arrayIndex = 0;
    var drawTileX = 0;
    var drawTileY = 0;
    for (var eachRow = 0; eachRow < WORLD_ROWS; eachRow++) {
        for (var eachCol = 0; eachCol < WORLD_COLS; eachCol++) {
            var tileKindHere = worldGrid[arrayIndex];
            if (tileTypeHasTransparency(tileKindHere)) {
                canvasContext.drawImage(worldPics[WORLD_GROUND], drawTileX, drawTileY);
            }
            //var useImg = worldPics[tileKindHere];
            canvasContext.drawImage(worldPics[tileKindHere], drawTileX, drawTileY);

            drawTileX += WORLD_W;
            arrayIndex++;
        } // end of for each col
        drawTileX = 0;
        drawTileY += WORLD_H;
    } //end of for each row
    // drawTileY = 0;
} // end of drawWorld func