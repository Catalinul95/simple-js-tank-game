function rect(x, y, width, height) {
    points = [
        {x: x, y: y}, {x: x, y: y + height},
        {x: x + width, y: y + height},
        {x: x + width, y: y}
    ];

    return {
        points: points,
        width: width,
        height: height,
        draw: function (ctx, fillColor = '#fff', strokeColor = '#111') {
            ctx.strokeStyle = strokeColor;
            ctx.fillStyle = fillColor;
            ctx.beginPath();
            ctx.moveTo(this.points[0].x, this.points[0].y);
            ctx.lineTo(this.points[1].x, this.points[1].y);
            ctx.lineTo(this.points[2].x, this.points[2].y);
            ctx.lineTo(this.points[3].x, this.points[3].y);
            ctx.lineTo(this.points[0].x, this.points[0].y);
            ctx.stroke();
            ctx.fill();
        }
    };
}

function loadImage(file) {
    const image = new Image();
    image.src = file;
    image.complete = false;

    image.onload = function (e) {
        image.complete = true;
    };
    return image;
}

/*
function Tank(image, x, y, width, height, angle) {
    this.image = image;
    this.x = x;
    this.y = y;
    this.speed = 2;
    this.width = width;
    this.height = height;
    this.angle = angle;
}

Tank.prototype.draw = function (ctx) {
    ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
    ctx.rotate(this.angle * Math.PI / 180);
    ctx.drawImage(this.image, 0, 0, this.width, this.height, -this.width / 2, -this.height / 2, this.width, this.height);
    ctx.drawImage(this.image, 64, 0, this.width, this.height, -this.width / 2, -this.height / 2, this.width, this.height);
    ctx.rotate(-(this.angle * Math.PI / 180));
    ctx.translate(-this.x - this.width / 2, -this.y - this.height / 2);
};

Tank.prototype.update = function () {
    if (Math.abs(this.angle) > 360) {
        this.angle = 0;
    }

    if (Input.isKeyDown("ArrowUp")) {
        this.x += this.speed * Math.cos(this.angle * Math.PI / 180);
        this.y += this.speed * Math.sin(this.angle * Math.PI / 180);
    }

    if (Input.isKeyDown("ArrowDown")) {
        this.x -= this.speed * Math.cos(this.angle * Math.PI / 180);
        this.y -= this.speed * Math.sin(this.angle * Math.PI / 180);
    }

    if (Input.isKeyDown("ArrowLeft")) {
        this.angle -= 2;
    }

    if (Input.isKeyDown("ArrowRight")) {
        this.angle += 2;
    }
};

const tank = new Tank(tankImage, 100, 100, 64, 64, 0);

function loop() {
    ctx.clearRect(0, 0, 600, 600);
    window.requestAnimationFrame(loop);

    if (tankImage.complete) {
        tank.update();
        tank.draw(ctx);
    }

}

loop();
*/
