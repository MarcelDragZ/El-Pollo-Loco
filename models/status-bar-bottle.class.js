class StatusBarBottle extends DrawableObject {

    IMAGES_BOTTLEBAR = [
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/0.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/20.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/40.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/60.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/80.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/100.png',

    ];

    bottlePercentage = 0;

    constructor() {
        super();
        this.loadImages(this.IMAGES_BOTTLEBAR);
        this.x = 20;
        this.y = 35;
        this.width = 200;
        this.height = 40;
        this.setPercentage(0);
    }

    setPercentage(bottlePercentage) {
        this.bottlePercentage = bottlePercentage;
        let path = this.IMAGES_BOTTLEBAR[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    resolveImageIndex() {
        if (this.bottlePercentage == 100) {
            return 5;
        }
        else if (this.bottlePercentage >= 80) {
            return 4;
        }
        else if (this.bottlePercentage >= 60) {
            return 3;
        }
        else if (this.bottlePercentage >= 40) {
            return 2;
        }
        else if (this.bottlePercentage >= 20) {
            return 1;
        }
        else {
            return 0;
        }
    }
}
