
var mainLayer = cc.Layer.extend({
    sprite:null,
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();

        /////////////////////////////
        // 2. add a menu item with "X" image, which is clicked to quit the program
        //    you may modify it.
        // ask the window size
        var size = cc.winSize;
        g_size = cc.winSize;

        // add a "close" icon to exit the progress. it's an autorelease object
        var closeItem = new cc.MenuItemImage(
            res.CloseNormal_png,
            res.CloseSelected_png,
            function () {
                cc.log("Menu is clicked!");
            }, this);
        closeItem.attr({
            x: size.width - 20,
            y: 20,
            anchorX: 0.5,
            anchorY: 0.5
        });

        var menu = new cc.Menu(closeItem);
        menu.x = 0;
        menu.y = 0;
        this.addChild(menu, 1);

        /////////////////////////////
        // 3. add your codes below...
      
       

        // add "HelloWorld" splash screen"
        this.sprite = new cc.Sprite(res.HelloWorld_png);
        this.sprite.attr({
            x: size.width / 2,
            y: size.height / 2,
            scale: 1,
            rotation: 0
        });
        
        this.addChild(this.sprite, 0);
        //cc.MenuItemFont.setFontSize(60);
        
        this.menuItemPlay = new cc.MenuItemFont("PLay",this.onPlay, this);
        this.menuItemPlay.setFontSize(80);

        
       // cc.MenuItemLabel("play",this.menuItemPlay);
        //var menu = new cc.Menu(menuItemPlay);
      this.menu = new cc.Menu(this.menuItemPlay);
        
        this.addChild(this.menu);
    

       
        return true;
    },
    onPlay: function (sender)
    {

    	cc.log("==onPlay clicked");
    	//cc.Director.getInstance().replaceScene(PlayLayer.scene());
    	cc.director.runScene(new PlayLayer.scene());

    }
});

var mainScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new mainLayer();
        this.addChild(layer);
    }
});

