class Coin extends MovableObject {
    height = 120;
    width = 120;
    y = 352;
    img;

    IMAGES_BOTTLES = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png',

    ];



    constructor() {
        super();
        this.selectImage();
        this.loadImage(this.img);
        this.x = 400 + Math.random() * 2600;
        this.y = 200 + Math.random() * 150;
    }

    selectImage() {
        let index = Math.floor(Math.random() * 2);  
        this.img = this.IMAGES_BOTTLES[index];
    }

}