
import Phaser from 'phaser';

class Score extends Phaser.GameObjects.Text {
	constructor(scene) {
		super(scene, 0, 0, '0', {
			fontFamily: '"Arial"',
			fill: '#fff',
			fontSize: 30,
			align: 'right',
			wordWrap: {
				width: 4
			}
		});

		this.score = 0;
		this.default = 1;

		this.setPosition(this.scene.game.config.width, 5);
		this.setOrigin(1, 0);
		this.setStroke('#de77ae', 5);

		scene.add.existing(this);
	}

	add(points){
		var point = (points != undefined ? points : this.default );
		this.score = this.score + point;
		this.setText(this.score);
	}

	// preUpdate(time, delta) {}
}
export default Score;
