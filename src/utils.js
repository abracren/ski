//general

g_speed=2;

g_size=0;
g_clickTimer =1;
g_double = 1;
//objects arrays
g_obstacles = [];
g_segment = []; //trails array



g_dragOn_Togg= 0;


//Player

g_player_direction_togg = 0; 
g_player_y = 150;
g_isJumping = 0;
g_changeSideToggleL=0;
g_playerRect=null;

//Zorder
g_obstacleZorder=99;

//Touch

g_touchStartCount = 0; //Time Counter Touch pressed.
g_touch_started = 0; //switch start touching 1=true;
g_pos_current = 0;
g_drag=0;



//if angle close to 90 speed--  //if 90 or less 0 speed;