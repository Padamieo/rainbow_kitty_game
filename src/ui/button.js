
class TextButton extends Phaser.GameObjects.Text {
  constructor(scene, x, y, text, style) {
    super(scene, x, y, text, {
      fontFamily: '"Arial"',
      fill: '#fff',
      fontSize: 30,
      align: 'left',
    });

    // console.log(this.style, this.style.metrics.fontSize);
    // console.log(this);

    this.buttonColour = Phaser.Display.Color.IntegerToColor('0x999900');
    // Phaser.Display.Color.HexStringToColor('0x555500').color;
    console.log(this.buttonColour);
    this.buttonColourDark = this.buttonColour.darken('20');

    console.log(this.buttonColourDark);
    this.graphics = scene.add.graphics();
    this.generateButton(scene);

    // this.setPosition(x+this.height/2, y);
    scene.add.existing(this);

    this.setInteractive({ useHandCursor: true })
      .on('pointerdown', () => this.enterButtonActiveState() )
  }

  generateButton(){

    this.graphics.fillStyle(this.buttonColourDark._rgba, 1);
    this.graphics.fillRoundedRect(this.x, this.y+5, this.width+this.height, this.style.metrics.fontSize, { tl: 5, tr: 5, bl: 5, br: 5 });
    this.graphics.fillStyle(this.buttonColour._rgba, 1);
    this.graphics.fillRoundedRect(this.x, this.y, this.width+this.height, this.style.metrics.fontSize, { tl: 5, tr: 5, bl: 5, br: 5 });
  }

  enterButtonActiveState() {
    this.setStyle({ fill: '#0ff' });

    this.graphics.clear();
    this.generateButton();
  }
}

export default TextButton;
