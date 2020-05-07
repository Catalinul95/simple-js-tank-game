function Vector2(x, y) {
    this.x = x;
    this.y = y;
}

// static methods

// get the dot product of two vectors using their x, y components
Vector2.dot = function (a, b) {
    return (a.x * b.x + a.y * b.y);
};

Vector2.add = function (a, b) {
    return new Vector2(a.x + b.x, a.y + b.y);
};
  
Vector2.sub = function (a, b) {
    return new Vector2(a.x - b.x, a.y - b.y);
};

Vector2.mult = function (a, scalar) {
    return new Vector2(a.x * scalar, a.y * scalar);
}
  
Vector2.norm = function (a) {
    if (a.mag() > 0) {
        let x = Math.round(a.x / a.mag());
        let y = Math.round(a.y / a.mag());
        
        return new Vector2(x, y);
    }
};

// get the angle between using the cosine of the two vectors
Vector2.angleBetween = function (a, b) {
    let dot = Vector2.dot(a, b);
    let mags = a.mag() * b.mag();
    
    if (dot == 0 || mags == 0) return 0;
    let cos =  dot / mags;
    return Math.acos(cos);
};

// normal methods inherited by newly created Vector2 object
Vector2.prototype.sub = function (a) {
    this.x -= a.x;
    this.y -= a.y;
};

Vector2.prototype.add = function (a) {
    this.x += a.x;
    this.y += a.y;
};

Vector2.prototype.mult = function (scalar) {
    this.x *= scalar;
    this.y *= scalar;
};

Vector2.prototype.div = function (scalar) {
    if (scalar > 0) {
        this.x /= scalar;
        this.y /= scalar;
    }
};
  
Vector2.prototype.mag = function () {
    return Math.sqrt(this.x * this.x + this.y * this.y);
};
  
Vector2.prototype.norm = function () {
    if (this.mag() > 0) { 
        this.x = Math.round(this.x / this.mag());
        this.y = Math.round(this.y / this.mag());
    }
};
