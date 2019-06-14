class Create extends Phaser.Scene {
  constructor(test) {
    super({
        key: 'Create'
    });
  }

  preload() {
    console.log('preload');
    var pixelWidth = 4;
    var pixelHeight = 4;

    var chick = [
    '...55.......',
    '.....5......',
    '...7888887..',
    '..788888887.',
    '..888088808.',
    '..888886666.',
    '..8888644444',
    '..8888645555',
    '888888644444',
    '88788776555.',
    '78788788876.',
    '56655677776.',
    '.56777777654',
    '...44.....4.'
    ];
    this.textures.generate('chick', { data: chick, pixelWidth: pixelWidth });

    var chick2 = [
    '...55.......',
    '.....5......',
    '...7888887..',
    '..788888887.',
    '..888088808.',
    '..888886666.',
    '..8888644444',
    '..8888645555',
    '888888644444',
    '88788776555.',
    '78788788876.',
    '56655677776.',
    '.5677777765.',
    '...44..44...'
    ];
    this.textures.generate('chick2', { data: chick2, pixelWidth: pixelWidth });

    var chick3 = [
    '...55.......',
    '.....5......',
    '...7888887..',
    '..788888887.',
    '..888088808.',
    '..888886666.',
    '..8888644444',
    '..8888645555',
    '888888644444',
    '88788776555.',
    '78788788876.',
    '56655677776.',
    '45677777765.',
    '.4....46....'
    ];
    this.textures.generate('chick3', { data: chick3, pixelWidth: pixelWidth });

    this.Img = new Image();
    var base = this.textures.getBase64('chick');
    this.Img.onload = () => {

      this.textures.addSpriteSheet('slice', this.Img, { frameWidth: 12, frameHeight: 56 });
      // this.callback();
    }
    this.Img.src = base;
    this.textures.addSpriteSheet('slice', this.Img, { frameWidth: 12, frameHeight: 56 });

    var canvasFrame = this.textures.createCanvas('dynamicAnimationFrames', 168, 168);
    var ctx = canvasFrame.context;
    // ctx.beginPath();
    var c1 = this.textures.getBase64('chick');
    var Img1 = new Image();
    Img1.src = c1;
    ctx.drawImage(Img1, 0, 0);
    //canvasFrame.add(0, 0, 0, 0, 100, 100);
    var c2 = this.textures.getBase64('chick2');
    var Img2 = new Image();
    Img2.src = c2;
    ctx.drawImage(Img2, 56, 0);

    var c3 = this.textures.getBase64('chick3');
    var Img3 = new Image();
    Img3.src = c3;
    ctx.drawImage(Img3, 112, 0);
    canvasFrame.add(0, 0, 0, 0, 80, 80);

    canvasFrame.refresh();

    var Img = new Image();
    Img.src = this.textures.getBase64('dynamicAnimationFrames');
    this.textures.addSpriteSheet('dynamicAnimation', Img, { frameWidth: 56, frameHeight: 56 });
  }

  create () {
    console.log('create');
    this.add.image(100, 200, 'chick').setOrigin(0);
    this.add.image(200, 200, 'chick2').setOrigin(0);
    this.add.image(300, 200, 'chick3').setOrigin(0);

    this.anims.create({
      key: 'animation',
      defaultTextureKey: 'slice',
      frames: [
        {frame: 0 },
        {frame: 1 },
        {frame: 2 },
        {frame: 3 },
      ],
      repeat: -1,
      frameRate: 12,
    });

    var anim = this.add.sprite(400, 200, 'slice').setOrigin(0);
    //anim.anims.setCurrentFrame(2);
    anim.anims.play('animation', true);

    this.anims.create({
      key: 'animDynamic',
      defaultTextureKey: 'dynamicAnimation',
      frames: [
        {frame: 0 },
        {frame: 1 },
        {frame: 2 },
      ],
      repeat: -1,
      frameRate: 12,
    });

    this.add.image(300, 300, 'dynamicAnimationFrames', '__BASE').setOrigin(0);

    var full = this.add.sprite(300, 400, 'dynamicAnimation').setOrigin(0);
    //full.anims.setCurrentFrame(2);
    full.anims.play('animDynamic', true);
  }
}

var config = {
    type: Phaser.WEBGL,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    scene: [
      Create
    ]
};

var game = new Phaser.Game(config);

// https://supernapie.com/blog/loading-assets-as-data-uri-in-phaser-3/
