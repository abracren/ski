var res = {
    HelloWorld_png : "res/HelloWorld.png",
    CloseNormal_png : "res/CloseNormal.png",
    CloseSelected_png : "res/CloseSelected.png",
    player_png : "res/player/sprites.png",
    player_plist : "res/player/sprites.plist",
	obstacle_png : "res/obstacles/obstacle.png",
	obstacle_plist : "res/obstacles/obstacle.plist",
	particle_png : "res/particles/snowExp.png",
	particle_plist : "res/particles/snowExp.plist",
};

var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}