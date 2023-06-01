class Bottle extends MovableObject {
    height = 80;
    width = 80;
    y = 352;
    img;

    IMAGES_BOTTLES = [
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',

    ];



    constructor() {
        super();
        this.selectImage();
        this.loadImage(this.img);
        this.x = 400 + Math.random() * 2600;
    }

    selectImage() {
        let index = Math.floor(Math.random() * 2);  
        this.img = this.IMAGES_BOTTLES[index];
    }

}