class TextButton extends Phaser.GameObjects.Text {
  constructor(scene, x, y, text, style) {
    super(scene, x, y, text, style);

    scene.add.existing(this);

    this.setInteractive({ useHandCursor: true })
      .on('pointerdown', () => this.enterButtonActiveState() )
  }

  enterButtonActiveState() {
    this.setStyle({ fill: '#0ff' });
  }
}

export default TextButton;
