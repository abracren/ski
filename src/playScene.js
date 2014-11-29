var PlayLayer = cc.Layer.extend({
	player: null,
	ctor: function() {

		this._super();
		g_layer = this;
		this.addChild(new Trail(), 2);
		//cc.log("bla");
		this.createSprite();
		
		this.schedule(this.startTouchCount, 0.001);
		this.scheduleUpdate();
		cc.log('width:'+g_size.width);

		
		//Touch
		var listener1 = cc.EventListener.create({
			event: cc.EventListener.TOUCH_ONE_BY_ONE,
			swallowTouches: true,

			onTouchBegan: function(touch, event) {
				var target = event.getCurrentTarget();
				var pos = touch.getLocation();
				g_touchStartCount=0;
				if (g_clickTimer == null) {
					g_clickTimer = setTimeout(function () {
						g_clickTimer = null;
						g_layer.movePlayer();
						g_touch_started=1;
						

					}, 1000)
				} else {
					clearTimeout(g_clickTimer);
					g_clickTimer = null;
					cc.log('double');

				}
				
				
				return true;
			},
			onTouchMoved: function(touch, event) {
				var target = event.getCurrentTarget();
				var pos = touch.getLocation();
			},

			onTouchEnded: function(touch, event) {
				cc.log("ended");
				g_touch_started=0;

				cc.log(g_touchStartCount);
				if(g_player_direction_togg==0){
					g_player_direction_togg=1;
				}else{
					g_player_direction_togg=0;
				}
			},
			touchended: function() {

			},

		});
		cc.eventManager.addListener(listener1, this);
	},
	update: function () {
		g_player_current_pos_x = this.player.x;




	},
	createSprite: function() {
		this.player = new cc.Sprite(res.CloseNormal_png);
		this.player.attr({
			x: g_size.width / 2,
			y: g_player_y,
			scale: 1,
			rotation: 0
		});

		this.addChild(this.player, 0);
	},
	startTouchCount:function(){
		if(g_touch_started==1){
			g_touchStartCount++;
		}
		if(g_player_direction_togg==0){
			var actionTo2 = new cc.MoveBy(1, cc.p(10, 0));
			var easeAction = new cc.EaseOut(actionTo2,2.5);

			this.player.runAction(easeAction);
			//this.player.setPositionX(this.player.x +10 )

		}else{
			var actionTo2 = new cc.MoveBy(1, cc.p(-10, 0));
			var easeAction =new cc.EaseOut(actionTo2,2.5);
			this.player.runAction(easeAction);
			//this.player.setPositionX(this.player.x -10 )


		}
	},
	movePlayer:function(){
		if(g_player_direction_togg==0){

			this.player.setPositionX(this.player.x +1 )

		}else{
			//var actionTo2 = cc.MoveBy(1, cc.p(-400, 0));
			//this.player.runAction(actionTo2);
			this.player.setPositionX(this.player.x -1 )

			
		}
	}

});

PlayLayer.scene = function() {
	var scene = new cc.Scene;
	var layer = new PlayLayer();
	scene.addChild(layer);
	return scene;
};