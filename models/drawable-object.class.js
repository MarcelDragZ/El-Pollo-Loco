class DrawableObject {
    img;
    imageCache = {};
    currentImage = 0;
    x = 120;
    y = 290;
    height = 150;
    width = 100;

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    drawFrame(ctx) {
        if (this instanceof Character || this instanceof Chicken || this instanceof Endboss) {
            ctx.beginPath();
            ctx.lineWidth = '5';
            ctx.strokeStyle = 'red';
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

        /**
     * 
     * @param {Array} arr - ['img/image1.png', 'img/image1.png', ...]
     */
        loadImages(arr) {
            arr.forEach(path => {
                let img = new Image();
                img.src = path;
                this.imageCache[path] = img;
            });
        }
}