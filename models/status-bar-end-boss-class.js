class StatusBarEndBoss extends DrawableObject {

    bossPosition = 0;

    IMAGES_BOSSBAR = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png',
    ];

    bossBarPercentage = 100;

    constructor() {
        super();
        this.loadImages(this.IMAGES_BOSSBAR);
        this.x;
        this.y = 40;
        this.width = 200;
        this.height = 40;
        this.setPercentage(100);
        this.setX();
    }

    setX() {
        setInterval(() => {
            this.x = this.bossPosition;
        }, 1000 / 560);
    }

    setPercentage(bossBarPercentage) {
        this.bossBarPercentage = bossBarPercentage;
        let path = this.IMAGES_BOSSBAR[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    resolveImageIndex() {
        if (this.bossBarPercentage == 100) {
            return 5;
        }
        else if (this.bossBarPercentage >= 80) {
            return 4;
        }
        else if (this.bossBarPercentage >= 60) {
            return 3;
        }
        else if (this.bossBarPercentage >= 40) {
            return 2;
        }
        else if (this.bossBarPercentage >= 20) {
            return 1;
        }
        else {
            return 0;
        }
    }
}
