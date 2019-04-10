var warriorPic = document.createElement("img");

var worldPics = [];

var picsToLoad = 0; // set automatically based on imageList in loadImages()

function countLoadedImagesAndLaunchIfReady() {
    picsToLoad--;
    if (picsToLoad == 0) {
        imageLoadingDoneSoStartGame();
    }
}

function beginLoadingImage(imgVar, fileName) {
    imgVar.onload = countLoadedImagesAndLaunchIfReady;
    imgVar.src = "images/"+fileName;
}

function loadImageForWorldCode(worldCode, fileName) {
    worldPics[worldCode] = document.createElement("img");
    beginLoadingImage(worldPics[worldCode], fileName);
}

function loadImges() {
    var imageList = [
        { varName: warriorPic, theFile: "player1.png" },

        { trackType: WORLD_ROAD, theFile: "track_road.png" },
        { trackType: WORLD_WALL, theFile: "track_wall.png" },
        { trackType: WORLD_GOAL, theFile: "track_goal.png" },
        { trackType: WORLD_TREE, theFile: "track_tree.png" },
        { trackType: WORLD_FLAG, theFile: "track_flag.png" }
    ];
    picsToLoad = imageList.length;

    for (var i = 0; i < imageList.length; i++) {
        if (imageList[i].varName != undefined) {

            beginLoadingImage(imageList[i].varName, imageList[i].theFile);
        } else {
            loadImageForWorldCode(imageList[i].trackType, imageList[i].theFile);
        }
    }
    
}