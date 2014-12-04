if(typeof particleStat == "undefined") {
	var particleStat = {};
	particleStat.snowExp = 0;
	


};
var particleLayer = cc.Layer.extend({
	spriteSheet:null,
	particleAction:null,
	stat:particleStat.snowExp,
	sprite:null,

	ctor:function () {
		this._super();
		this.init();
	},
	init:function () {
		this._super();

		g_particle = this;
		cc.spriteFrameCache.addSpriteFrames(res.particle_plist);
		this.spriteSheet = new cc.SpriteBatchNode(res.particle_png);
		this.addChild(this.spriteSheet);
		g_particle= this;
		if(g_3d==1){
			this.runAction(cc.OrbitCamera.create(0, 1, 1, 90, -80.5, 90, 0));
		}
		var animFrames = [];
		// num equal to spriteSheet
		for (var i = 0; i < 4 ; i++) {
			var str = "snowExp00" + i + ".png";
			var frame = cc.spriteFrameCache.getSpriteFrame(str);
			animFrames.push(frame);
		}

		var animation = new cc.Animation(animFrames, 0.1);
		this.snowExpAction = new cc.Animate(animation);
		this.snowExpAction.retain();

	

		this.sprite = new cc.Sprite("#snowExp000.png");
		//this.sprite.attr({x:g_size.width/2, y:g_player_y});
		//this.sprite.runAction(this.runningAction);
		this.spriteSheet.addChild(this.sprite);


	},
	snowExp:function () {
		//cc.log("treeAnim");

		this.stat = particleStat.snowExp;
		this.sprite.stopAllActions();
		this.sprite.runAction(this.snowExpAction);

	},
	fallBehind:function(){
		this.sprite.runAction(
				cc.sequence( 
						new cc.MoveBy(2, cc.p(0, -110))

				));
	},
	
	onExit:function() {
		this.snowExpAction.release();
		this._super();
	},


});