var testLayer = cc.Layer.extend({
	ctor: function() {

		this._super();
		cc.log('bla');
		
		
	},
});

testLayer.scene = function() {
	var scene = new cc.Scene;
	var layer = new testLayer();
	scene.addChild(layer);
	return scene;
};