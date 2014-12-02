var backgroundLayer = cc.Layer.extend({


	
	ctor:function () {
		this._super();
		this.init();
	},
	init:function () {
		this._super();

		var whiteBackground = new cc.LayerColor(new cc.Color(255,255,255,255));
		this.addChild(whiteBackground);
		this.attr({
			scale:10000000,
		});


	},
	

});