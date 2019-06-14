import rocket from 'assets/rocket_frames.svg';

class Test extends Phaser.GameObjects.RenderTexture {
    constructor(scene, x, y, width, height) {
        super(scene, x, y, width, height);
        console.log('test');

        var spotlight = this.scene.make.sprite({
          x: 0,
          y: 0,
          key: 'rocket',
          add: false
        }).setOrigin(0);

        //pic.mask = new Phaser.Display.Masks.BitmapMask(this, spotlight);

        //this.draw('rocket', 0, 0, 1);

        var graphics = this.scene.make.graphics();
        // graphics.fillStyle(0xffff33, 0.5);
        // //graphics.setBlendMode(Phaser.BlendModes.SCREEN);
        // graphics.fillRect(0, 15, 100, 10);
        //graphics.visible = false;
        graphics.mask = new Phaser.Display.Masks.BitmapMask(this.scene, spotlight);
        graphics.fillRect(0, 15, 100, 10);
        var circle = this.scene.add.rectangle(0, 10, 80, 10, 0x6666ff);
        circle.mask = new Phaser.Display.Masks.BitmapMask(this.scene, spotlight)

        // this.draw(['rocket', circle,graphics], 0, 0, 1, 0xffffff);
        //graphics.clear();
        //this.mask = new Phaser.Display.Masks.BitmapMask(this.scene, spotlight);
        //this.setMask(spotlight);
        this.saveTexture('rocket2');

        //scene.add.existing(this);

        //scene.add.image(0, 0, 'rocket').setOrigin(0);
    }
    // ...

    // preUpdate(time, delta) {
    //   this.scene.add.image(0, 0, 'rocket');
    // }
}
export default Test;
