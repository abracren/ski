var PlayLayer = cc.Layer.extend({
	player: null,
	ctor: function() {

		this._super();
		g_layer = this;
		
		
		
		this.addChild(new Trail(), 2);
		this.addChild(new backgroundLayer(), 0);
		

		//cc.log("bla");
		this.createSprite();
		//this.createObstacle();
		
		this.schedule(this.startTouchCount, 0.001);
		this.schedule(this.moveCamera, 0.5);
		this.schedule(this.updateEvery1, .001);
		this.schedule(this.updateEverySecond, 1);
		this.schedule(this.updateEveryTwoSeconds, 2);
		this.schedule(this.createObstacle, .5);


		this.scheduleUpdate();
		
		
		
		
		//cc.log('width:'+g_size.width);
		//this.runAction(new cc.OrbitCamera(0, 1, 1,5 ,-32.5 , 90, 0));
		
		//Touch
		var listener1 = cc.EventListener.create({
			event: cc.EventListener.TOUCH_ONE_BY_ONE,
			swallowTouches: true,

			onTouchBegan: function(touch, event) {
				var target = event.getCurrentTarget();
				var pos = touch.getLocation();
//				g_touch_pos = touch.getLocation();
				//g_pos_current = pos;


				g_touchStartCount=0;
				
			
				//g_layer.movePlayer();
//				setTimeout(function(){
//					g_touch_started=0;
//
//				}, 500);
				g_touch_started=1;
				g_player.stopAllActions;
				g_player_direction_togg_temp = g_player_direction_togg;
				g_player_direction_togg = 2;
				g_player.forwards();
				
				return true;
			},
			onTouchMoved: function(touch, event) {
				var target = event.getCurrentTarget();
				var pos = touch.getLocation();
				g_drag=1;
				g_pos_current = pos;
				g_pos_target = target;
				g_layer.onDragOn();
				
			},

			onTouchEnded: function(touch, event) {
				cc.log("ended");
				if (g_clickTimer == null) {
					g_clickTimer = setTimeout(function () {
						g_clickTimer = null;
						cc.log('simple');
						g_double=0;



					}, 1000)
				} else {
					clearTimeout(g_clickTimer);
					g_clickTimer = null;
					g_double=1;
					g_player.forwards();


				}
				g_drag=0;
				g_layer.onDragOff();

				g_touch_started=0;
				

				cc.log(g_touchStartCount);
				
				g_player.stopAllActions;

					if(g_player_direction_togg_temp==0){
						g_player_direction_togg=1;
							g_player.halfRight();
					

					}else{
						g_player_direction_togg=0;
						
						
							g_player.right();
						

						}
					g_layer.onChangeSide();
					

					
				
//				
		
			}

		});
		cc.eventManager.addListener(listener1, this);
	},
	
	getEyeX:function (sprr) {
		return sprr.getPositionX() - g_size.width/2;
	},
	update: function () {
		g_player_current_pos_x = this.player.x;
		g_player_current_pos_y = this.player.y;
		
		
		var ccsize = g_player.getContentSize();
		playerColRect = cc.rect(
				g_player.x - (ccsize.width / 2),
				g_player.y - (ccsize.height / 2),
				ccsize.width ,
				ccsize.height);
		cc.log(playerColRect.width);
		
//	
		for (i in g_obstacles) {

			if (g_obstacles[i].getPositionY() < g_player_current_pos_y) {
				
				cc.log(g_obstacles[i].getTag());
				//var sprr= g_layer.getChildByTag(g_obstacles[i].getTag());
				//sprr.treePasive();
				this.setZorder(g_obstacles[i], 80000);
				
				//var f = g_obstacles_shadows_sprites.indexOf(g_obstacles_shadows_sprites[i]);
				
			} else {
				//  cc.log('nocoll');
			}

		}


	},
	updateEvery1:function(){
		if(g_player_direction_togg==2 && g_drag==1){
			cc.log("playerx.="+g_player.getPositionX());
			cc.log("touchX " + g_pos_current.x);
			cc.log(g_pos_target);

			
			cc.log("ble = "+g_player.getPositionX()+g_pos_current.x);
			//if positive or negative
//			g_player.x=g_pos_current.x;



		}
	},
	updateEverySecond:function(){
		var actionTo3 = new cc.MoveBy(.5, cc.p(-15, 0));
//		var easeAction3 = new cc.EaseIn(actionTo3,2.5);

		var actionTo4 = new cc.MoveBy(.5, cc.p(15, 0));
//		var easeAction3 = new cc.EaseIn(actionTo3,2.5);

		var sequence1 =  cc.sequence(  actionTo3,actionTo4);

		this.player.runAction(sequence1);
		//this.player.stopAllActions();



		
	},
	updateEveryTwoSeconds:function(){
		var actionTo3 = new cc.MoveBy(.5, cc.p(5, -5));
//		var easeAction3 = new cc.EaseIn(actionTo3,2.5);

		var actionTo4 = new cc.MoveBy(.5, cc.p(-5, 5));
//		var easeAction3 = new cc.EaseIn(actionTo3,2.5);

		var sequence1 =  cc.sequence(  actionTo3,actionTo4);

		this.player.runAction(sequence1);
		//this.player.stopAllActions();




	},
	moveCamera:function(){ //sch
		var eyeX = this.getEyeX(this.player);
		if(g_drag==0){

			//if(g_touchStartCount>15000){
				if(g_player_direction_togg==1){
					var actTo6= new cc.MoveTo(.5,cc.p(-eyeX,0));
					g_layer.runAction(actTo6);
				}else if(g_player_direction_togg==0){
					var actTo9= new cc.MoveTo(.5,cc.p(-eyeX,0));
					g_layer.runAction(actTo9);
					
				}else{
//					g_layer.stopAllActions();
//					var actTo7= new cc.MoveTo(0.25,cc.p(-eyeX,0));
//					g_layer.runAction(actTo7);
					g_layer.stopAllActions();
					}
		}
		
	},
	createSprite: function() {
		this.addChild(new PlayerLayer(),200);
		this.player=g_player;
		this.player.setAnchorPoint(cc.p(0,.1));

		this.player.attr({
			x: g_size.width / 2,
			y: g_player_y,
			scale: .3,
			rotation: 0
		});
	},
	createObstacle: function() {
		this.addChild(new obstacle(),g_obstacleZorder);
		this.obstacle=g_obstacle;
		this.obstacle.setAnchorPoint(cc.p(0,0));

		this.obstacle.attr({
			x: this.randomIntFromInterval(g_player.x-600,g_player.x+600),
			y: g_size.height+200,
			scale:.3,
			rotation: 0
		});
		var ranthre=this.randomIntFromInterval(0,1);
		if(ranthre==0){
			this.obstacle.snowmanPasive();

		}else{
			this.obstacle.treePasive();

		}
		this.obstacle.setTag(g_obstacleZorder);
		var downTo = new cc.MoveBy(g_speed,cc.p(0,-1000));
		
		
		this.obstacle.runAction(cc.sequence(downTo, cc.CallFunc.create(this.removeSprite, this, 'obstacle')));
		g_obstacles.push(this.obstacle);
		g_obstacleZorder--;
		if (g_obstacleZorder < 50) {
			g_obstacleZorder = 99;
		}
	},
	
	createSprite2: function() {
		this.player2 = new cc.Sprite(res.CloseNormal_png);
		this.player2.attr({
			x: g_size.width / 2,
			y: g_player_y+200,
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
		//if(g_touch_started==0){
			if(g_player_direction_togg==0 ){
				
				var actionTo2 = new cc.MoveBy(0.51, cc.p(5, 0));
				var easeAction = new cc.EaseElasticOut(actionTo2,2.5);
	
				this.player.runAction(easeAction);
				//this.player.setPositionX(this.player.x +10 )
	
			}else if(g_player_direction_togg==1 ){
				var actionTo2 = new cc.MoveBy(0.51, cc.p(-5, 0));
				var easeAction =new cc.EaseElasticOut(actionTo2,2.5);
				this.player.runAction(easeAction);
				//this.player.setPositionX(this.player.x -10 )
	
	
			}else if(g_player_direction_togg==2 ){
				
//				var actionTo3 = new cc.MoveTo(5, cc.p(g_player.getPositionX()-1, g_player_y));
////				var easeAction3 = new cc.EaseIn(actionTo3,2.5);
//				
//				var actionTo4 = new cc.MoveTo(5, cc.p(g_player.getPositionX()+1, g_player_y));
////				var easeAction3 = new cc.EaseIn(actionTo3,2.5);
//
//				var sequence1 =  cc.sequence(  actionTo3,actionTo4);
//
//				this.player.runAction(sequence1);
				//this.player.stopAllActions();
				
				//cc.log("repeat");
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
	
	},
	onDragOn:function(){
		if(g_dragOn_Togg==0){
			g_isJumping=1;

		var actionTo3 = new cc.JumpBy(1, cc.p(0, 400),300,1);
//		var easeAction3 = new cc.EaseIn(actionTo3,2.5);

		
		

		this.player.runAction(
				cc.sequence(actionTo3,new cc.CallFunc(this.jumpStopped() )));
		//this.player.stopAllActions();
		g_dragOn_Togg=1;

		}

		
		
	},
	onDragOff:function(){
		if(g_dragOn_Togg==1){
			var actionTo3 = new cc.MoveBy(2, cc.p(0, -400));
//			var easeAction3 = new cc.EaseIn(actionTo3,2.5);




			this.player.runAction(actionTo3);
			//this.player.stopAllActions();
			g_dragOn_Togg=0;

		}



	},
	onChangeSide:function(){
		
			var actionTo= new cc.MoveBy(1,cc.p(0,50));
			var ease1 = new cc.EaseSineOut(actionTo); 
			var actionTo2= new cc.MoveBy(1,cc.p(0,-50));
			var ease2 = new cc.EaseSineOut(actionTo2); 


			this.player.runAction(cc.sequence(ease1,ease2));

		
	},
	
	jumpStopped:function(){
		setTimeout(function(){
			g_isJumping=0;
		},1000);
	},changeLeftOff:function(){
		g_changeSideToggleL=0;
	},
	randomIntFromInterval:function(min,max) {
		return Math.floor(Math.random()*(max-min+1)+min);
	},
	setZorder: function (spr, zOr) {

		//cc.log(spr + zOr);
		g_layer.reorderChild(spr, zOr);

	},

	removeSprite: function (sprite, tagg) {
		//
		

		if (tagg == "obstacle") {
			var i = g_obstacles.indexOf(sprite);

			g_obstacles.splice(i, 1);

		}
		g_layer.removeChild(sprite, true);

		//g_eliminated++;

		//cc.log('removed ' + tagg + ' ' + i );

	},


});

PlayLayer.scene = function() {
	var scene = new cc.Scene;
	scene.setColor(new cc.Color(255,255,255,1));
	var layer = new PlayLayer();
	scene.addChild(layer);
	return scene;
};