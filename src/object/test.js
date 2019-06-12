import rocket from 'assets/rocket_frames.svg';

class Test extends Phaser.GameObjects.RenderTexture {
    constructor(scene, x, y, width, height) {
        super(scene, x, y, width, height);
        console.log('test');

        this.draw('rocket', 0, 0);

        var graphics = scene.add.graphics();
        graphics.fillStyle(0xffff33, 0.5);
        graphics.fillRect(0, 15, 50, 10);
        this.draw(graphics);
        
        this.saveTexture('rocket2');

        scene.add.existing(this);

        //scene.add.image(0, 0, 'rocket').setOrigin(0);
    }
    // ...

    // preUpdate(time, delta) {
    //   this.scene.add.image(0, 0, 'rocket');
    // }
}
export default Test;
