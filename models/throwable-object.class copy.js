class ThrowableObject extends MovableObject {
    constructor(x, y, otherDirection) {
        super().loadImage('img/6_salsa_bottle/salsa_bottle.png');
        this.x = x;
        this.y = y;
        this.otherDirection = otherDirection;
        this.height = 80;
        this.width = 80;
        this.angle = 0;
        this.rotationSpeed = 10;
        this.throw(100, 150);
    }

    throw() {
        this.speedY = 20;
        this.applyGravity();

        setInterval(() => {
            this.bottleThrow();
        }, 1000 / 60);
    }

    bottleThrow() {
        if (this.otherDirection) {
            this.x -= 7;
        }
        else {
            this.x += 7;
        }
        this.angle += this.rotationSpeed;
    }
}