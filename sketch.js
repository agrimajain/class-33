var bricks;
var bricks_group;
var coins, coinImg;
var coinSounds;
var coins_group;
var score=0;
//var mushroom, turtles
var obstaclesGroup
function preload(){
    mario_running = loadAnimation("images/mar1.png", "images/mar2.png", "images/mar3.png", "images/mar4.png", "images/mar5.png", "images/mar6.png", "images/mar7.png");
     bgImage = loadImage("images/bgnew.png");
     bricks_img = loadImage("images/brick.png")
     coinImg =loadAnimation("images/con1.png","images/con2.png","images/con3.png","images/con4.png","images/con5.png","images/con6.png");
     coinSounds = loadSound("sounds/coinSound.mp3")
     mushObstacleImage = loadAnimation("images/mush1.png","images/mush2.png","images/mush3.png","images/mush4.png","images/mush5.png","images/mush6.png",);
     turObstacleImage = loadAnimation("images/tur1.png","images/tur2.png","images/tur3.png","images/tur4.png","images/tur5.png");
     bricks_group=new Group();
     coins_group=new Group();
     obstaclesGroup=new Group();
}


function setup() {
createCanvas(1000, 600);
bg= createSprite(500, 300);
bg.addImage(bgImage);
mario = createSprite(200, 505, 20,50);
mario.addAnimation("running", mario_running);
mario.scale=0.3;
bg.scale=0.5;
ground = createSprite(200, 585, 400, 10); 
ground.visible = false;
}

function draw() {
   if( keyDown("space")){
      mario.velocityY = -16; }
   mario.velocityY = mario.velocityY +0.5;
   mario.collide(ground);
   //to make bg move(speed and time given)
   bg.velocityX= -6;
   if(bg.x < 100){
      bg.x=bg.width/4;
   }
   //to make or generate the bricks
   generatebricks();
   //for loop is to collide mario with bricks
   for(var i=0; i<bricks_group.length;i++ ){
      var temp = (bricks_group).get(i) ;
      if (temp.isTouching(mario))
      { 
         mario.collide(temp); 
      }
   }
   generateCoins();
   //to destroy the coins when mario touch
   for(var t=0; t<coins_group.length;t++){
      var rest = (coins_group).get(t);
      if (rest.isTouching(mario));
      {  score++;
         coinSounds.play();
         rest.destroy();
      }
   }
   
   generateObstacles()
      
   
   if (mario.x < 200)
   { 
      mario.x = 200; 
   }
   if (mario.y < 50)
   {
       mario.y = 50; 
   }
   drawSprites()

   }

function generatebricks(){
  // this is to generate brick with a frame
   if(frameCount % 70==0){
   bricks=createSprite(1200,random(50,450),40,10);
   bricks.addImage(bricks_img);
   bricks.scale=0.5;
   bricks.velocityX= -5;
   bricks.lifetime=250;  
   bricks_group.add(bricks);}
}

function generateCoins(){
  //to generate coins
   if(frameCount % 40==0){
      coins=createSprite(1200,random(80,350),40,40);
      coins.addAnimation(coinImg)
      coins.velocityX= -6;
      coins.lifetime=250;
      coins_group.add(coins)
   }
}

function generateObstacles() {
//to generate obstacles(turtles and mushrooms)
   if(frameCount % 100 === 0) {
     var obstacle = createSprite(1200,545,10,40);
     obstacle.velocityX = -4;
     obstacle.scale=0.2;
     var rand= Math.round(random(1,2));
     //math round is to round off the random nos.
     switch(rand){
     case 1:
         obstacle.addAnimation("mush",mushObstacleImage);
         break;
     case 2:
       obstacle.addAnimation("turtle", turObstacleImage);
         break;
     default:
         break;    
     }
     obstacle.lifetime = 300;
     obstaclesGroup.add(obstacle);
   }
 }