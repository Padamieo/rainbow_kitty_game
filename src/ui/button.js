
class TextButton extends Phaser.GameObjects.Text {
  constructor(scene, x, y, text, action) {

    super(scene, x, y, text, {
      fontFamily: '"Arial"',
      fill: '#fff',
      fontSize: 30,
      align: 'right',
    });

    this.action = action;

    var button = '0x997700';

    this.buttonColour = Phaser.Display.Color.IntegerToColor(button);
    this.buttonColourDark = Phaser.Display.Color.IntegerToColor(button);

    this.buttonColourDark.darken(15);

    this.graphics = scene.add.graphics();
    this.generateButton(scene);

    this.setOrigin(0.5, 0);
    this.xInput = x;
    this.yInput = y;
    scene.add.existing(this);

    this.setInteractive({ useHandCursor: true })
      .on('pointerdown', () => this.enterButtonActiveState() )
  }

  generateButton(down){
    var offset = (down == true ? 1 : 5 );
    this.graphics.fillStyle(this.buttonColourDark._color, 1);
    this.graphics.fillRoundedRect(
      this.x-(this.width/2+this.height/2),
      this.y+offset,
      this.width+this.height,
      this.style.metrics.fontSize, { tl: 5, tr: 5, bl: 5, br: 5 }
    );

    this.graphics.fillStyle(this.buttonColour._color, 1);
    this.graphics.fillRoundedRect(
      this.x-(this.width/2+this.height/2),
      this.y,
      this.width+this.height,
      this.style.metrics.fontSize, { tl: 5, tr: 5, bl: 5, br: 5 }
    );
    //this.graphics.setOrigin(0.5, 0);
    //this.graphics.setPosition(this.xInput, this.yInput);
  }

  enterButtonActiveState() {
    this.setStyle({ alpha: 0.8 });

    this.graphics.clear();
    this.setPosition(this.x, this.yInput+5);
    this.generateButton(true);
    this.action();
  }
}

export default TextButton;
