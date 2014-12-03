var backgroundLayer = cc.Layer.extend({


	
	ctor:function () {
		this._super();
		this.init();
	},
	init:function () {
		this._super();
		var gradientLayer = new cc.LayerGradient(new cc.Color(205,239,250,255),new cc.Color(255,255,255,255),cc.p(0,0.9))
		var whiteBackground = new cc.LayerColor(new cc.Color(255,255,255,255));
		this.addChild(gradientLayer);
		this.attr({
			scaleX:10000000,
			
		});


	},
	

});