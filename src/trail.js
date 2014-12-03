var Trail = cc.Layer.extend({
	spr: null,
	space:null,


	ctor: function () {
		this._super();
		
		this.schedule(this.createTrail, 0.03);
		//this.scheduleUpdate();

		
	},
	update: function () {
		for (i in g_segment) {

			

		}
		
	

	},
	moveDown:function(){
		
		for (i in g_segment ) {
			if (g_segment[i].getPositionY() < 0) {

				var b = g_segment.indexOf(g_segment[i]);

				this.removeChild(g_segment[i], true);
				g_segment.splice(b, 1);

				
			}else{
			//cc.log(g_segment[i].y);
					var actionTo4= new cc.MoveBy(1,cc.p(0,-15)); 
				
				var easeAction4 = new cc.EaseOut(actionTo4,10);
//			g_segment[i].setPositionY(g_segment[i].y - 10);
			g_segment[i].runAction(easeAction4);


			}

		}
		


	},
	createTrail:function(){
		spr = new cc.Sprite(res.CloseNormal_png);
		if(g_drag==1){
		spr.attr({
			x:g_player_current_pos_x+5,

			y: g_player_current_pos_y+35,
			scaleX: 1,
			scaleY:2,
			rotation: 0
		});
		}else{
			spr.attr({
				x:g_player_current_pos_x+3,

				y: g_player_current_pos_y+35,
				scaleX: 1,
				scaleY:1,
				rotation: 0
			});
		}
//		if(g_player_direction_togg==0){
//		spr.x=g_player_current_pos_x-20;
//		}else if(g_player_direction_togg==1){
//			spr.x=g_player_current_pos_x+20;
//
//		}else if(g_player_direction_togg==2){
//			spr.x=g_player_current_pos_x;
//
//		}
		if(g_isJumping==1){
			
		}else{
			this.addChild(spr,0);

		}
		g_segment.push(spr);
//		
		this.moveDown();
//		
	},
	
});