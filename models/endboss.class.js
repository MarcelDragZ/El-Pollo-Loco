class Endboss extends MovableObject {
    height = 400;
    width = 250;
    y = 60;
    x = 3800;
    speed = 3;
    world;
    moveBoss = false;
    triggerBossEvent = false;

    IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png',
    ]

    IMAGES_ALERT = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png',
    ];

    IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png',
    ];

    IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png',
    ];

    boss_trigger_sound = new Audio('audio/boss_triggert.mp3');
    hurting_sound = new Audio('audio/boss_hit.mp3');

    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.x;
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.bossMove();
        }, 1000 / 60);

        setInterval(() => {
            this.bossAnimate();
        }, 1000 / 10);
    }


    bossMove() {
        if (world.character.x >= 3300) {
            setTimeout(() => {
                this.triggerBossEvent = true;
                this.moveBoss = true;
            }, 300);
        }
        if (this.triggerBossEvent) {
            this.boss_trigger_sound.play();
        }
        if (world.character.x > this.x && this.moveBoss) {
            this.otherDirection = true;
            this.moveRight();
        }
        if (world.character.x < this.x && this.moveBoss) {
            this.otherDirection = false;
            this.moveLeft();
        }
    }

    bossAnimate() {
        if (this.isHurt()) {
            this.bossHurt();
        }
        else if (!this.moveBoss) {
            this.playAnimation(this.IMAGES_ALERT);
        }
        else if (this.moveBoss && !this.isHurt()) {
            this.playAnimation(this.IMAGES_WALKING);
        }
        if (this.isDead()) {
            this.bossDead();
        }
    }

    bossDead() {
        this.playAnimation(this.IMAGES_DEAD);
        this.moveBoss = false;
        this.triggerBossEvent = false;
        this.boss_trigger_sound.pause();
    }

    bossHurt() {
        this.playAnimation(this.IMAGES_HURT);
        this.speed = 10;
        this.hurting_sound.play();
        setTimeout(() => {
            this.hurting_sound.pause();
        }, 1300);
        setTimeout(() => {
            this.speed = 3;
        }, 200);
    }

}
