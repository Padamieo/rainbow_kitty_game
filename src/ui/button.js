class TextButton extends Phaser.GameObjects.Text {
  constructor(scene, x, y, text, style) {
    super(scene, x, y, text, style);

    console.log(this.style, this.style.metrics.fontSize);
    console.log(this);

    this.graphics = scene.add.graphics();
    this.graphics.fillStyle(0x555500, 1);
    this.graphics.fillRoundedRect(x, y+5, this.width, this.style.metrics.fontSize, { tl: 5, tr: 5, bl: 5, br: 5 });
    this.graphics.fillStyle(0x999900, 1);
    this.graphics.fillRoundedRect(x, y, this.width, this.style.metrics.fontSize, { tl: 5, tr: 5, bl: 5, br: 5 });

    scene.add.existing(this);

    this.setInteractive({ useHandCursor: true })
      .on('pointerdown', () => this.enterButtonActiveState() )
  }

  enterButtonActiveState() {
    this.setStyle({ fill: '#0ff' });

    this.graphics.clear();
    this.graphics.fillStyle(0xffffff, 1);
    this.graphics.fillRoundedRect(this.x, this.y+5, 100, 40, { tl: 5, tr: 5, bl: 5, br: 5 });
    this.graphics.fillStyle(0x999900, 1);
    this.graphics.fillRoundedRect(this.x, this.y+4, 100, 40, { tl: 5, tr: 5, bl: 5, br: 5 });
  }
}

export default TextButton;
