class StatusBarCoin extends DrawableObject {

    IMAGES_COINBAR = [
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/0.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/20.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/40.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/60.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/80.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/100.png',
    ];

    coinPercentage = 0;

    constructor() {
        super();
        this.loadImages(this.IMAGES_COINBAR);
        this.x = 20;
        this.y = 70;
        this.width = 200;
        this.height = 40;
        this.setPercentage(0);
    }

    setPercentage(coinPercentage) {
        this.coinPercentage = coinPercentage;
        let path = this.IMAGES_COINBAR[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    resolveImageIndex() {
        if (this.coinPercentage == 100) {
            return 5;
        }
        else if (this.coinPercentage >= 80) {
            return 4;
        }
        else if (this.coinPercentage >= 60) {
            return 3;
        }
        else if (this.coinPercentage >= 40) {
            return 2;
        }
        else if (this.coinPercentage >= 20) {
            return 1;
        }
        else {
            return 0;
        }
    }
}
