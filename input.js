function Input() {}

Input.key = [];

Input.keydown = function (e) {
    if (!Input.isKeyDown(e.code)) {
        Input.key.push(e.code);
    }
};
Input.keyup = function (e) {
    delete Input.key[Input.key.indexOf(e.code)];
};

Input.isKeyDown = function (keyDown) {
    if (Input.key.includes(keyDown)) {
        return true;
    }
    return false;
}

window.addEventListener("keydown", Input.keydown);

window.addEventListener("keyup", Input.keyup);