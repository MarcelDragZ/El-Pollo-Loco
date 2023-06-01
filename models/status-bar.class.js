class StatusBar extends DrawableObject {

    IMAGES_HEALTHBAR = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/100.png',
    ];

    healthPercentage = 100;

    constructor() {
        super();
        this.loadImages(this.IMAGES_HEALTHBAR);
        this.x = 20;
        this.y = 0;
        this.width = 200;
        this.height = 40;
        this.setPercentage(100);
    }

    setPercentage(healthPercentage) {
        this.healthPercentage = healthPercentage;
        let path = this.IMAGES_HEALTHBAR[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    resolveImageIndex() {
        if (this.healthPercentage == 100) {
            return 5;
        }
        else if (this.healthPercentage > 80) {
            return 4;
        }
        else if (this.healthPercentage > 60) {
            return 3;
        }
        else if (this.healthPercentage > 40) {
            return 2;
        }
        else if (this.healthPercentage > 20) {
            return 1;
        }
        else {
            return 0;
        }
    }
}
