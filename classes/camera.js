function Camera(sx, sy, sw, sh, worldWidth, worldHeight, speed) {
    this.sx = sx;
    this.sy = sy;
    this.sw = sw;
    this.sh = sh;
    this.worldWidth = worldWidth;
    this.worldHeight = worldHeight;
    this.speed = speed;
    this.limitLeft = false;
    this.limitRight = false;
    this.limitTop = true;
    this.limitBottom = false;
}

Camera.locked = true;

Camera.prototype.canMoveLeft = function () {
    if (this.sx > 0) {
        return true;
    }

    return false;
};

Camera.prototype.canMoveRight = function () {
    if (this.sx + this.sw < this.worldWidth) {
        return true;
    }

    return false;
};

Camera.prototype.canMoveDown = function () {
    if (this.sy + this.sh < this.worldHeight) {
        return true;
    }

    return false;
};

Camera.prototype.canMoveUp = function () {
    if (this.sy > 0) {
        return true;
    }

    return false;
};

Camera.prototype.moveLeft = function () {
    if (this.canMoveLeft()) {
        this.sx -= this.speed;
    }
};

Camera.prototype.moveRight = function () {
    if (this.canMoveRight()) {
        this.sx += this.speed;
    }
};

Camera.prototype.moveDown = function () {
    if (this.canMoveDown()) {
        this.sy += this.speed;
    }
};

Camera.prototype.moveUp = function () {
    if (this.canMoveUp()) {
        this.sy -= this.speed;
    }
};
