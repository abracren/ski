if(typeof RunnerStat == "undefined") {
	var RunnerStat = {};
	RunnerStat.running = 0;
	RunnerStat.jumpUp = 1;
	RunnerStat.jumpDown = 2;
	
};

var PlayerLayer = cc.Layer.extend({
	spriteSheet:null,
	runningAction:null,
	stat:RunnerStat.running,

	sprite:null,
	ctor:function () {
		this._super();
		this.init();
	},
	init:function () {
		this._super();

		// create sprite sheet
		cc.spriteFrameCache.addSpriteFrames("res/sprites.plist");
		this.spriteSheet = new cc.SpriteBatchNode("res/sprites.png");
		this.addChild(this.spriteSheet);
		g_player= this;


		var animFrames = [];
		// num equal to spriteSheet
		for (var i = 8; i >=0 ; i--) {
			var str = "spr00" + i + ".png";
			var frame = cc.spriteFrameCache.getSpriteFrame(str);
			animFrames.push(frame);
		}

		var animation = new cc.Animation(animFrames, 0.1);
		this.runningAction = new cc.Animate(animation);
		this.runningAction.retain();

		// init jumpUpAction
		animFrames = [];
		for (var i = 0; i <= 8; i++) {
			var str = "spr00" + i + ".png";
			var frame = cc.spriteFrameCache.getSpriteFrame(str);
			animFrames.push(frame);
		}

		animation = new cc.Animation(animFrames, 0.1);
		this.jumpUpAction = new cc.Animate(animation);
		this.jumpUpAction.retain();

		//var animation = new cc.Animation(animFrames, 0.1);
		//this.runningAction = new cc.RepeatForever(new cc.Animate(animation));
		this.sprite = new cc.Sprite("#spr000.png");
		//this.sprite.attr({x:g_size.width/2, y:g_player_y});
		this.sprite.runAction(this.runningAction);
		this.spriteSheet.addChild(this.sprite);
		
		
		
	},
	jump:function () {
		cc.log("jump");
		if (this.stat == RunnerStat.running) {
			//this.body.applyImpulse(cp.v(0, 250), cp.v(0, 0));
			this.stat = RunnerStat.jumpUp;
			this.sprite.stopAllActions();
			this.sprite.runAction(this.jumpUpAction);
		}
	},
	runn:function () {
		cc.log("run");
		if (this.stat == RunnerStat.jumpUp) {
			//this.body.applyImpulse(cp.v(0, 250), cp.v(0, 0));
			this.stat = RunnerStat.running;
			this.sprite.stopAllActions();
			this.sprite.runAction(this.runningAction);
		}
	},
	onExit:function() {
		this.runningAction.release();
		this.jumpUpAction.release();
		//this.jumpDownAction.release();
		this._super();
	},

});