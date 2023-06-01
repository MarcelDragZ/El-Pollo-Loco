class Character extends MovableObject {
    height = 280;
    width = 170;
    y = 60;
    speed = 10;
    world;

    offset = {
        top: 110,
        bottom: 10,
        right: 55,
        left: 10
    }

    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];

    IMAGES_JUMPING = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png',

    ];

    IMAGES_IDLE_SHORT = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png',
    ]

    IMAGES_DEAD = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png',
    ];

    IMAGES_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png',
    ];

    walking_sound = new Audio('audio/character_walk.mp3');
    jumping_sound = new Audio('audio/character_jump.mp3');
    hurting_sound = new Audio('audio/character_hit.mp3');
    dead_sound = new Audio('audio/character_dead.mp3');

    constructor() {
        super().loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_IDLE_SHORT);
        this.animate();
        this.applyGravity();
    }
    animate() {
        setInterval(() => {
            this.characterMove();
        }, 1000 / 60);



        setInterval(() => {
            this.characterPlayAnimations();

        }, 1000 / 10);
    }

    characterMove() {
        this.walking_sound.pause();
        if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
            this.characterRight();
        }
        if (this.world.keyboard.LEFT && this.x > + 100) {
            this.characterLeft();
        }
        if (this.world.keyboard.SPACE && !this.isAboveGround()) {
            this.jump();
            this.jumping_sound.play();
        }
        this.world.camera_x = -this.x + 100;
    }

    characterLeft() {
        this.moveLeft();
        this.otherDirection = true;
        this.walking_sound.play();
    }

    characterRight() {
        this.moveRight();
        this.otherDirection = false;
        this.walking_sound.play();
    }

    characterPlayAnimations() {
        if (this.isDead()) {
            this.characterDead();
        }
        else if (this.isHurt()) {
            this.playAnimation(this.IMAGES_HURT);
            this.hurting_sound.play();
        }
        else if (this.isAboveGround()) {
            this.playAnimation(this.IMAGES_JUMPING);
        }
        else if (!this.world.keyboard.RIGHT && !this.world.keyboard.LEFT && !this.isAboveGround() && !this.isHurt() && !this.isDead()) {
            this.playAnimation(this.IMAGES_IDLE_SHORT);
        }
        else {
            if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }
    }

    characterDead() {
        this.playAnimation(this.IMAGES_DEAD);
        this.dead_sound.play();
        setTimeout(() => {
            this.dead_sound.pause();
        }, 1500);
    }

    jump() {
        this.speedY = 17;
    }
}