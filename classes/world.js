function World() {}

World.complete = false;

World.draw = function (grid, camera, worldCanvas, screenCanvas) {
    if (World.complete == false) {
        worldCanvas.width = grid.getWidth();
        worldCanvas.height = grid.getHeight();
        // draw the entire world using the worldCnavas
        grid.draw(worldCanvas.getContext('2d'));
        World.complete = true;
    }
    // draw a portion from the entire world using the screenCanvas
    screenCanvas.getContext("2d").drawImage(
        worldCanvas,
        camera.sx,
        camera.sy,
        camera.sw,
        camera.sh,
        0,
        0,
        camera.sw,
        camera.sh
    );
}