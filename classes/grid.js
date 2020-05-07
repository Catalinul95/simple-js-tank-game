function Grid(settings) {
    this.settings = settings;
}

Grid.prototype.getWidth = function () {
    return this.settings.tileSize * this.settings.layers[0][0].length;
}

Grid.prototype.getHeight= function () {
    return this.settings.tileSize * this.settings.layers[0].length;
}

Grid.prototype.draw = function (ctx) {
    for (let i = 0; i < this.settings.layers.length; i++) {
        let layer = this.settings.layers[i];
        for (let r = 0; r < layer.length; r++) {
            for (let c = 0; c < layer[r].length; c++) {
                if (this.settings.map.hasOwnProperty(layer[c][r])) {
                    let map = this.settings.map[layer[c][r]];
                    ctx.drawImage(
                        this.settings.spirteSheet,
                        map.sx,
                        map.sy,
                        map.sw,
                        map.sh,
                        this.settings.tileSize * r,
                        this.settings.tileSize * c,
                        this.settings.tileSize,
                        this.settings.tileSize
                        );
                }
            }
        }
    }
};