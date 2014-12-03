var res = {
    HelloWorld_png : "res/HelloWorld.png",
    CloseNormal_png : "res/CloseNormal.png",
    CloseSelected_png : "res/CloseSelected.png",
    player_png : "res/sprites.png",
    player_plist : "res/sprites.plist",
	obstacle_png : "res/obstacle.png",
	obstacle_plist : "res/obstacle.plist"
};

var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}