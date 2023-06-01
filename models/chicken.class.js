class Chicken extends MovableObject {
    height = 80;
    width = 80;
    y = 352;
    energy = 1;

    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    IMAGES_DEAD = [
        'img/3_enemies_chicken/chicken_normal/2_dead/dead.png',
    ];



    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 400 + Math.random() * 3000;
        this.speed = 0.3 + Math.random() * 0.45;
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.moveChicken();
        }, 1000 / 60);

        setInterval(() => {
            this.playAnimationChicken();
        }, 1000 / 10);
    }

    moveChicken() {
        if (this.energy == 1) {
            this.moveLeft();
        }
        else {
            this.y -= -3;
            return;
        }
    }

    playAnimationChicken() {
        if (this.energy == 1) {
            this.playAnimation(this.IMAGES_WALKING);
        }
        else {
            this.playAnimation(this.IMAGES_DEAD);
        }
    }

} 