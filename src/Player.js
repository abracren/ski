if(typeof RunnerStat == "undefined") {
	var RunnerStat = {};
	RunnerStat.lefting = 0;
	RunnerStat.righting = 1;
	RunnerStat.forwarding = 2;
	RunnerStat.halfRighting = 3;

	
};

var PlayerLayer = cc.Layer.extend({
	spriteSheet:null,
	runningAction:null,
	stat:RunnerStat.righting,
	playerColRect:null,

	sprite:null,
	ctor:function () {
		this._super();
		this.init();
	},
	init:function () {
		this._super();

		// create sprite sheet
		cc.spriteFrameCache.addSpriteFrames(res.player_plist);
		this.spriteSheet = new cc.SpriteBatchNode(res.player_png);
		this.addChild(this.spriteSheet);
		g_player= this;
		if(g_3d==1){
			this.runAction(cc.OrbitCamera.create(0, 1, 1, 90, -80.5, 0, 0));
		}

		var animFrames = [];
		// num equal to spriteSheet
		for (var i = 8; i >=0 ; i--) {
			var str = "spr00" + i + ".png";
			var frame = cc.spriteFrameCache.getSpriteFrame(str);
			animFrames.push(frame);
		}

		var animation = new cc.Animation(animFrames, 0.1);
		this.leftAction = new cc.Animate(animation);
		this.leftAction.retain();

		// init jumpUpAction
		animFrames = [];
		for (var i = 4; i <= 8; i++) {
			var str = "spr00" + i + ".png";
			var frame = cc.spriteFrameCache.getSpriteFrame(str);
			animFrames.push(frame);
		}

		animation = new cc.Animation(animFrames, 0.1);
		this.rightAction = new cc.Animate(animation);
		this.rightAction.retain();
		
		var animFrames = [];
		// num equal to spriteSheet
		for (var i = 4; i >=4 ; i--) {
			var str = "spr00" + i + ".png";
			var frame = cc.spriteFrameCache.getSpriteFrame(str);
			animFrames.push(frame);
		}

		var animation = new cc.Animation(animFrames, 0.1);
		this.forwardAction = new cc.Animate(animation);
		this.forwardAction.retain();
		
		var animFrames = [];
		// num equal to spriteSheet
		for (var i = 4; i >=0 ; i--) {
			var str = "spr00" + i + ".png";
			var frame = cc.spriteFrameCache.getSpriteFrame(str);
			animFrames.push(frame);
		}

		var animation = new cc.Animation(animFrames, 0.1);
		this.halfRightAction = new cc.Animate(animation);
		this.halfRightAction.retain();

		//var animation = new cc.Animation(animFrames, 0.1);
		//this.runningAction = new cc.RepeatForever(new cc.Animate(animation));
		this.sprite = new cc.Sprite("#spr008.png");
		//this.sprite.attr({x:g_size.width/2, y:g_player_y});
		//this.sprite.runAction(this.runningAction);
		this.spriteSheet.addChild(this.sprite);
		
		
		
	},
	right:function () {
		//cc.log("right");
		
			//this.body.applyImpulse(cp.v(0, 250), cp.v(0, 0));
			this.stat = RunnerStat.righting;
			this.sprite.stopAllActions();
			this.sprite.runAction(this.rightAction);
		
	},
	left:function () {
		//cc.log("left");
		
			//this.body.applyImpulse(cp.v(0, 250), cp.v(0, 0));
			this.stat = RunnerStat.lefting;
			this.sprite.stopAllActions();
			this.sprite.runAction(this.leftAction);
		
	},
	halfRight:function () {
		//cc.log("halfRight");
		
			//this.body.applyImpulse(cp.v(0, 250), cp.v(0, 0));
			this.stat = RunnerStat.halfRightting;
			this.sprite.stopAllActions();
			this.sprite.runAction(this.halfRightAction);
		
	},
	
	forwards:function () {
		//cc.log("forward");

		//this.body.applyImpulse(cp.v(0, 250), cp.v(0, 0));
		this.stat = RunnerStat.forwarding;
		this.sprite.stopAllActions();
		this.sprite.runAction(this.forwardAction);

	},
	onExit:function() {
		this.leftAction.release();
		this.rightAction.release();
		this.forwardAction.release();
		this.halfRightAction.release();

		
		this._super();
	},



});