class World {
    character = new Character();
    boss = new Endboss();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    bottle = new Bottle();
    healthStatusBar = new StatusBar();
    bottleStatusBar = new StatusBarBottle();
    coinStatusBar = new StatusBarCoin();
    bossStatusBar = new StatusBarEndBoss();
    throwableObjects = [];
    lastThrow = 0;
    throwNow = 0;

    coin_collect_sound = new Audio('audio/collect_coin.mp3');
    bottle_collect_sound = new Audio('audio/collect_bottle.mp3');
    bottle_throw_sound = new Audio('audio/bottle_hit.mp3');
    chicken_hit_sound = new Audio('audio/chicken_hit.mp3');
    win_sound = new Audio('audio/game_win.mp3');
    lose_sound = new Audio('audio/game_lose1.mp3');

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
        this.setBossStatusBarX();
    }

    endGame(value) {
        if (value == 'win') {
            this.win_sound.play();
        }
        if (value == 'lose') {
            this.lose_sound.play();
        }
        setTimeout(() => {
            showEndScreen(value);
        }, 800);
        setTimeout(() => {
            for (let i = 1; i < 9999; i++) window.clearInterval(i);
        }, 1200);
    }

    checkGameEnd(value) {
        if (this.boss.energy == 0 || this.character.energy == 0) {
            this.endGame(value);
        }
    }

    setWorld() {
        this.character.world = this;
    }

    setBossStatusBarX() {
        setInterval(() => {
            this.bossStatusBar.bossPosition = this.boss.x;
        }, 1000 / 60);
    }

    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();
        }, 80);

    }


    checkThrowObjects() {
        this.throwNow = Date.now();
        if (this.keyboard.D && this.character.bottle > 0 && this.throwNow - this.lastThrow >= 300) {
            this.setBottleStatus();
            if (this.character.otherDirection) {
                this.throwBottleLeft();
            }
            else {
                this.throwBottleRight();
            }
        }
    }

    setBottleStatus() {
        this.lastThrow = this.throwNow;
        this.character.bottle = this.character.bottle - 20;
        this.bottleStatusBar.setPercentage(this.character.bottle);
    }

    throwBottleRight() {
        let bottle = new ThrowableObject(this.character.x + 80, this.character.y + 100, this.character.otherDirection);
        this.throwableObjects.push(bottle);
        this.bottle_throw_sound.play();
    }

    throwBottleLeft() {
        let bottle = new ThrowableObject(this.character.x - 10, this.character.y + 100, this.character.otherDirection);
        this.throwableObjects.push(bottle);
        this.bottle_throw_sound.play();
    }

    checkCollisions() {
        this.collisionCharacterToEnemie();
        this.collisionCharacterToEnemieTop();
        this.collisionCharacterToBoss();
        this.collisionCharacterToBottle();
        this.collisionCharacterToCoin();
        this.collisionBottleToEnemy();
    }

    collisionBottleToEnemy() {
        this.throwableObjects.forEach((bottle) => {
            if (bottle.isColliding(this.boss)) {
                this.boss.hitBoss();
                this.bossStatusBar.setPercentage(this.boss.energy);
                this.checkGameEnd('win');
            }
        });
    }



    collisionCharacterToBottle() {
        this.level.bottles.forEach((bottle, i) => {
            if (this.character.isColliding(bottle) && this.character.bottle !== 100) {
                this.character.collectBottle();
                this.level.bottles.splice(i, 1);
                this.bottleStatusBar.setPercentage(this.character.bottle);
                this.bottle_collect_sound.play();
            }
        });
    }

    collisionCharacterToCoin() {
        this.level.coins.forEach((coin, i) => {
            if (this.character.isColliding(coin) && this.character.coin !== 100) {
                this.character.collectCoin();
                this.level.coins.splice(i, 1);
                this.coinStatusBar.setPercentage(this.character.coin);
                this.coin_collect_sound.play();
            }
        });
    }

    collisionCharacterToBoss() {
        if (this.character.isColliding(this.boss)) {
            this.character.hit();
            this.healthStatusBar.setPercentage(this.character.energy);
            this.checkGameEnd('lose');
        }
    }

    collisionCharacterToEnemie() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                this.character.hit();
                this.healthStatusBar.setPercentage(this.character.energy);
                this.checkGameEnd('lose');
            }
        });
    }

    collisionCharacterToEnemieTop() {
        this.level.enemies.forEach((enemy, i) => {
            if (this.character.isCollidingTop(enemy) && this.character.y < 160) {
                this.character.jump();
                enemy.energy = 0;
                this.chicken_hit_sound.play();
            }
        });
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.addStatusBars();
        this.addUtility();
        this.addMoveableObjects();
        this.ctx.translate(-this.camera_x, 0);
        this.animationFrame();
    }

    animationFrame() {
        self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    addMoveableObjects() {
        this.addToMap(this.boss);
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
    }

    addUtility() {
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.throwableObjects);
    }

    addStatusBars() {
        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.healthStatusBar);
        this.addToMap(this.bottleStatusBar);
        this.addToMap(this.coinStatusBar);
        this.ctx.translate(this.camera_x, 0);
        this.addToMap(this.bossStatusBar);

    }

    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    addToMap(mo) {
        this.ctx.save();
        if (mo instanceof ThrowableObject) {
            this.ctx.translate(mo.x + mo.width / 2, mo.y + mo.height / 2);
            this.ctx.rotate(mo.angle * Math.PI / 180);
            this.ctx.translate(-(mo.x + mo.width / 2), -(mo.y + mo.height / 2));
        }
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
        this.ctx.restore();
    }

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1
    }

    flipImageBack(mo) {
        mo.x = mo.x * -1
        this.ctx.restore();
    }
}