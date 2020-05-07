/*
Camera - clasa folosita pentru a stoca informatii despre zona vizibila din lumea din joc
Grid - clasa folosita pentru a reprezenta lumea din joc, folosind un sistem de linii si coloane,
       fiecare celula avand un ID reprezentand diferite informatii despre acea portiune din lume
      - clasa folosita pentru a desena intreaga lume din joc ce este atribuita unui element canvas ce nu
        este atasat corpului paginii web
World - clasa folosita pentru a desena portiunea din lumea din joc data de datele clasei Camera


1) Avem nevoie de doua elemente canvas, primul pentru a stoca intreaga lume din joc, iar celelalt pentru a stoca
doar o parte din lunea de joc, in functie de datele clasei Camera.

Daca caracterul nu se afla in centrul lumii din joc, misca caracterul, nu misca camera.Daca caracterul se afla 
in centrul lumii din joc, misca camera, atunci cand camera nu se mai misca ( a atins limita de miscare ) misca
*/



function Game() {
    const screenCanvas = document.getElementById("screen");
    const context = screenCanvas.getContext("2d");
    const S_WIDTH = screenCanvas.width;
    const S_HEIGHT = screenCanvas.height;
    const worldCanvas = document.createElement("canvas");
    const w_context = worldCanvas.getContext("2d");
    const spriteSheet = loadImage('spritesheet.png');
    const tank = loadImage('tank.png');

    const player = {
        x: S_WIDTH / 2, 
        y: S_HEIGHT / 2, 
        w: 80,
        h: 80,
        angle: 0,
        speed: 5,
    };

    const grid = new Grid({
        spirteSheet: spriteSheet,
        tileSize: 64,
        layers: [
            [
                [3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 1],
                [0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 1],
                [0, 0, 1, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3],
                [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 3, 0, 3, 0, 0],
                [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0],
                [0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0],
                [0, 0, 0, 0, 0, 3, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 3],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 3, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0],
                [0, 0, 3, 0, 4, 2, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0],
            ]
        ],
        map: {
            0: {sx: 0,sy: 0,sw: 64,sh: 64},
            1: {sx: 64,sy: 0,sw: 64,sh: 64},
            2: {sx: 128,sy: 0,sw: 64,sh: 64},
            3: {sx: 192,sy: 0,sw: 64,sh: 64},
            4: {sx: 256,sy: 0,sw: 64,sh: 64},
            
        }
    });
    const camera = new Camera(1, 1, S_WIDTH, S_HEIGHT, grid.getWidth(), grid.getHeight(), 3);
    let m, n = 0;

    function loop() {
        context.clearRect(0, 0, S_WIDTH, S_HEIGHT);
        window.requestAnimationFrame(loop);

        if (Math.abs(player.angle) > 360) {
            player.angle = 0;
        }

        if (spriteSheet.complete) {
            World.draw(grid, camera, worldCanvas, screenCanvas);

            if (Input.isKeyDown("ArrowLeft")) {
                player.angle -= 2;
            }

            if (Input.isKeyDown("ArrowRight")) {
                player.angle += 2;
            }

            if (Input.isKeyDown("ArrowUp")) {  
                m = camera.speed * Math.cos(player.angle * Math.PI / 180);   
                n = camera.speed * Math.sin(player.angle * Math.PI / 180);  

                    if (camera.sx + camera.sw + m < camera.worldWidth && camera.sx + m > 0)  {
                        if (player.x >= 400 && player.x <= 405) {
                            camera.sx += m;    
                        } else {
                            player.x += camera.speed * Math.cos(player.angle * Math.PI / 180);
                        }
                    }else {
                        player.x += camera.speed * Math.cos(player.angle * Math.PI / 180);
                    }
    
                    if (camera.sy + camera.sh + n < camera.worldHeight && camera.sy + n > 0)  {
                        if (player.y >= 250 && player.y <= 255) {
                            camera.sy += n;
                        } else {
                            player.y += camera.speed * Math.sin(player.angle * Math.PI / 180);
                        }
                        
                    } else {
                        player.y += camera.speed * Math.sin(player.angle * Math.PI / 180);
                    }
            }

            if (Input.isKeyDown("ArrowDown")) {
                
            }

            context.fillStyle = 'red';
            context.translate(player.x + player.w / 2, player.y + player.h / 2);
            context.rotate(player.angle * Math.PI / 180);
            context.drawImage(tank, 0, 0, 256, 256, -player.w / 2, -player.h / 2, player.w, player.h);
            context.drawImage(tank, 256, 0, 256, 256, -player.w / 2, -player.h / 2, player.w, player.h);
            context.rotate(-(player.angle * Math.PI / 180));
            context.translate(-player.x - player.w/ 2, -player.y - player.h / 2);
        }
    }

    loop();
}

const game = new Game();