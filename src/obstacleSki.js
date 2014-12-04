if(typeof obstacleStat == "undefined") {
	var obstacleStat = {};
	obstacleStat.treePasive = 0;
	obstacleStat.SnowmanPasive = 1;



};
var obstacle = cc.Layer.extend({
	spriteSheet:null,
	obstacleAction:null,
	stat:obstacleStat.treePasive,
	sprite:null,

	ctor:function () {
		this._super();
		this.init();
	},
	init:function () {
		this._super();

		g_obstacle = this;
		cc.spriteFrameCache.addSpriteFrames(res.obstacle_plist);
		this.spriteSheet = new cc.SpriteBatchNode(res.obstacle_png);
		this.addChild(this.spriteSheet);
		g_obstacle= this;
		if(g_3d==1){
			this.runAction(cc.OrbitCamera.create(0, 1, 1, 90, -80.5, 90, 0));
		}
		var animFrames = [];
		// num equal to spriteSheet
		for (var i = 0; i<1 ; i++) {
			var str = "obstacle00" + i + ".png";
			var frame = cc.spriteFrameCache.getSpriteFrame(str);
			animFrames.push(frame);
		}

		var animation = new cc.Animation(animFrames, 0.1);
		this.treePasAction = new cc.Animate(animation);
		this.treePasAction.retain();
		
		var animFrames = [];
		// num equal to spriteSheet
		for (var i = 10; i<11 ; i++) {
			var str = "obstacle0" + i + ".png";
			var frame = cc.spriteFrameCache.getSpriteFrame(str);
			animFrames.push(frame);
		}

		var animation = new cc.Animation(animFrames, 0.1);
		this.SnowmanPasAction = new cc.Animate(animation);
		this.SnowmanPasAction.retain();

		
		this.sprite = new cc.Sprite("#obstacle000.png");
		//this.sprite.attr({x:g_size.width/2, y:g_player_y});
		//this.sprite.runAction(this.runningAction);
		this.spriteSheet.addChild(this.sprite);


	},
	treePasive:function () {
		//cc.log("treeAnim");

		this.stat = obstacleStat.treePasive;
		this.sprite.stopAllActions();
		this.sprite.runAction(this.treePasAction);

	},
	snowmanPasive:function () {
		//cc.log("snowmanAnim");

		this.stat = obstacleStat.SnowmanPasive;
		this.sprite.stopAllActions();
		this.sprite.runAction(this.SnowmanPasAction);

	},
	onExit:function() {
		this.treePasAction.release();
		this.SnowmanPasAction.release();

		


		this._super();
	},


});