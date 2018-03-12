```javascript
// objects
this.load.spritesheet  // slice img
this.load.atlas			// slice by json file

// add  
this.add.group  // group.create(i+300, i*50, 'ball'); ????
this.add.sprite(400, 100, 'gems').play('diamond');
this.add.graphics({ fillStyle: { color: 0xff00ff }, x: 32, y: 32 });
this.add.image(32, 32, 'mummy', '__BASE').setOrigin(0);

// make
this.make.sprite // ??

//
this.tweens.addCounter ?????
this.tweens.add({ ???

// Phaser
Phaser.Actions.GridAlign
Phaser.Actions.PlaceOnCircle(group1.getChildren(), { x: 400, y: 300, radius: 250 });
Phaser.Actions.PlaceOnEllipse(group.getChildren(), ellipse);
Phaser.Actions.PlaceOnRectangle(group.getChildren(), rect, i);
Phaser.Actions.PlaceOnTriangle(group.getChildren(), triangle);
Phaser.Actions.PlaceOnLine(group.getChildren(), line);
Phaser.Actions.RandomCircle(group.getChildren(), circle); // position within the circle
Phaser.Actions.RandomEllipse(group.getChildren(), ellipse);
Phaser.Actions.RandomLine(group.getChildren(), line);
Phaser.Actions.RandomRectangle(group.getChildren(), rect);
Phaser.Actions.RandomTriangle(group.getChildren(), triangle);

Phaser.Actions.IncX(groupA.getChildren(), Math.cos(move));
Phaser.Actions.IncY(groupA.getChildren(), Math.sin(move));
Phaser.Actions.Rotate(groupA.getChildren(), -0.01); // rotate self
Phaser.Actions.RotateAroundDistance(groups, { x: 3, y: 3 }, 0.2, tween.getValue());
Phaser.Actions.RotateAround(group.getChildren(), { x: 400, y: 300 }, 0.01); // rotate whole

Phaser.Actions.SetAlpha(group.getChildren(), 0, 1 / 50);
Phaser.Actions.SetXY(group.getChildren(), 400, 300);
Phaser.Actions.ShiftPosition(group.getChildren(), x, y);
Phaser.Actions.Spread(group.getChildren(), 'alpha', 0, 1);

// Phaser Geom
var circle = new Phaser.Geom.Circle(400, 300, 220);
ellipse = new Phaser.Geom.Ellipse(400, 300, 200, 500);
var line = new Phaser.Geom.Line(100, 200, 600, 400);
rect = new Phaser.Geom.Rectangle(64, 32, 100, 512);
var triangle = new Phaser.Geom.Triangle.BuildEquilateral(400, 100, 380);
var triangle = new Phaser.Geom.Triangle.BuildRight(200, 400, 300, 200);


// Phaser Math
Phaser.Math.Between(200, 600)


// scene
scene: {
        preload: preload,
        create: create,
        update: update // Don't know it frequency? // function update (time, delta)
    }
	
	
// input
this.input.on('pointermove', function (pointer) {

        p.setTo(pointer.x, pointer.y);

    });	
// x = pointer.x;        y = pointer.y;	
// pointermove
// pointerup


// anim
var animConfig = {
        key: 'diamond',
        frames: this.anims.generateFrameNames(...),
        repeat: 6,
        onRepeat: animRepeatCallback(sprite, animation, ...marker),
        onRepeatParams: [ ...marker ]
    };
this.anims.on('add', addAnimation.bind(this));  // ??
this.anims.generateFrameNames
this.anims.create({ 
	key: 'diamond', 
	frames: _anims.generateFrameNames(
								'gems', 
								{ 
									prefix: 'diamond_', 
									end: 15, 
									zeroPad: 4 
								}), 
	repeat: -1 
	
});

	
// sprite
sprite.anims.load('walk');
sprite.anims.play('walk');
sprite.anims.paused()
sprite.anims.resume();
sprite.anims.pause();
sprite.anims.restart();

sprite.frame.cutX
```


```javascript
var tree = Phaser.Structs.RTree();


```


