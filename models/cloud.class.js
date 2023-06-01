class Cloud extends MovableObject {
    y = 20;
    width = 600;
    height = 250;

    constructor() {
        super().loadImage('img/5_background/layers/4_clouds/1.png');
        this.x = Math.random() * 3200;
        this.animate();
    }
    animate() {
        setInterval(() => {
                this.moveLeft();
        }, 1000 / 60);
    }

}