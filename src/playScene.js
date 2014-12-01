var PlayLayer = cc.Layer.extend({
	player: null,
	ctor: function() {

		this._super();
		g_layer = this;
		this.addChild(new Trail(), 2);
		//cc.log("bla");
		this.createSprite();
		this.createSprite2();
		
		this.schedule(this.startTouchCount, 0.001);
		this.schedule(this.moveCamera, 0.5);

		this.scheduleUpdate();
		cc.log('width:'+g_size.width);
//		this.runAction(new cc.OrbitCamera(0, 1, 1,5 ,-32.5 , 90, 0));
		
		//Touch
		var listener1 = cc.EventListener.create({
			event: cc.EventListener.TOUCH_ONE_BY_ONE,
			swallowTouches: true,

			onTouchBegan: function(touch, event) {
				var target = event.getCurrentTarget();
				var pos = touch.getLocation();
//				g_touch_pos = touch.getLocation();

				g_touchStartCount=0;
				
			
				//g_layer.movePlayer();
//				setTimeout(function(){
//					g_touch_started=0;
//
//				}, 500);
				g_touch_started=1;
				
				return true;
			},
			onTouchMoved: function(touch, event) {
				var target = event.getCurrentTarget();
				var pos = touch.getLocation();
			},

			onTouchEnded: function(touch, event) {
				cc.log("ended");
				
				g_touch_started=0;
				

				//cc.log(g_touchStartCount);
				

					if(g_player_direction_togg==0){
						g_player_direction_togg=1;
						g_player.runn();

					}else{
						g_player_direction_togg=0;
						g_player.jump();
					}
				
//				
//				if (g_clickTimer == null) {
//					g_clickTimer = setTimeout(function () {
//						g_clickTimer = null;
//						cc.log('simple');
//						
//
//
//					}, 1000)
//				} else {
//					clearTimeout(g_clickTimer);
//					g_clickTimer = null;
//				
//					
//
//				}
			},
			touchended: function() {

			},

		});
		cc.eventManager.addListener(listener1, this);
	},
	
	getEyeX:function (sprr) {
		return sprr.getPositionX() - g_size.width/2;
	},
	update: function () {
		g_player_current_pos_x = this.player.x;
//		cc.log(g_touch_started);
		
		
		
//		if(g_touchStartCount>1000){
//			g_double = 1;
//		}else{
//			g_double = 0;
//		}
//


	},
	moveCamera:function(){ //sch
		var eyeX = this.getEyeX(this.player);
		
		//if(g_touchStartCount>15000){
			if(g_player_direction_togg==1){
			var actTo6= new cc.MoveTo(.5,cc.p(-eyeX+(g_size.width/3),0));
			g_layer.runAction(actTo6);
			}else{
				var actTo9= new cc.MoveTo(.5,cc.p(-eyeX-(g_size.width/3),0));
				g_layer.runAction(actTo9);
				
			}
//		}else{
//			var actTo7= new cc.MoveTo(0.5,cc.p(-eyeX,0));
//			g_layer.runAction(actTo7);
//		}
		
	},
	createSprite: function() {
		this.addChild(new PlayerLayer(),10);
		this.player=g_player;
		this.player.setAnchorPoint(cc.p(0,0));

		this.player.attr({
			x: g_size.width / 2,
			y: g_player_y,
			scale: .4,
			rotation: 0
		});
	},
	
	createSprite2: function() {
		this.player2 = new cc.Sprite(res.CloseNormal_png);
		this.player2.attr({
			x: g_size.width / 2,
			y: g_player_y,
			scale: 1,
			rotation: 0
		});

		this.addChild(this.player2, 0);
	},
	startTouchCount:function(){
		if(g_touch_started==1){
			g_touchStartCount++;
		}
//		if(g_double==0){
		if(g_touch_started==0){
			if(g_player_direction_togg==0 ){
				var actionTo2 = new cc.MoveBy(0.51, cc.p(10, 0));
				var easeAction = new cc.EaseElasticOut(actionTo2,2.5);
	
				this.player.runAction(easeAction);
				//this.player.setPositionX(this.player.x +10 )
	
			}else{
				var actionTo2 = new cc.MoveBy(0.51, cc.p(-10, 0));
				var easeAction =new cc.EaseElasticOut(actionTo2,2.5);
				this.player.runAction(easeAction);
				//this.player.setPositionX(this.player.x -10 )
	
	
			}
			
		}else{
		
			var actionTo3 = new cc.MoveTo(0.5, cc.p(100, g_player_y));
			var easeAction3 = new cc.EaseIn(actionTo3,2.5);
			
//			var sequence1 = new cc.Sequence(actionTo3,actionTo4);
			
			//this.player.runAction(actionTo3);
			this.player.stopAllActions();
		}
	},
	movePlayer:function(){
		
//		if(g_player_direction_togg==0){
//
//			this.player.setPositionX(this.player.x +10 );
//			
//
//		}else{
//			//var actionTo2 = cc.MoveBy(1, cc.p(-400, 0));
//			//this.player.runAction(actionTo2);
//			this.player.setPositionX(this.player.x -10 );
//			
//
//			
//		}
	
	}

});

PlayLayer.scene = function() {
	var scene = new cc.Scene;
	var layer = new PlayLayer();
	scene.addChild(layer);
	return scene;
};