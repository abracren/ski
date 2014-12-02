var Trail = cc.Layer.extend({
	spr: null,
	space:null,


	ctor: function () {
		this._super();
		
		this.schedule(this.createTrail, 0.01);
		//this.scheduleUpdate();

		
	},
	update: function () {
		for (i in g_segment) {

			

		}
		
	

	},
	moveDown:function(){
		
		for (i in g_segment ) {
			if (g_segment[i].getPositionY() < -370) {

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
		spr.attr({
			x: g_player_current_pos_x,
			y: g_player_y,
			scale: 1,
			rotation: 0
		});
		this.addChild(spr,0);
		g_segment.push(spr);
		
		this.moveDown();
		
	},
	
});