var bricks;
var bricks_group;
var coins, coinImg;
var coinSounds;
var coins_group;
var score=0;
function preload(){
    mario_running = loadAnimation("images/mar1.png", "images/mar2.png", "images/mar3.png", "images/mar4.png", "images/mar5.png", "images/mar6.png", "images/mar7.png");
     bgImage = loadImage("images/bgnew.png");
     bricks_img = loadImage("images/brick.png")
     coinImg =loadAnimation("images/con1.png","images/con2.png","images/con3.png","images/con4.png","images/con5.png","images/con6.png");
     coinSounds = loadSound("sounds/coinSound.mp3")
     bricks_group=new Group();
     coins_group=new Group();
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
bg.velocityX= -6;
 if(bg.x < 100){
    bg.x=bg.width/4;
 }
 generatebricks();
 for(var i=0; i<bricks_group.length;i++ ){
   var temp = (bricks_group).get(i) ;
    if (temp.isTouching(mario))
    { mario.collide(temp); }
 generateCoins();
  for(var t=0; t<coins_group.length;t++){
     var rest = (coins_group).get(t);
     if (rest.isTouching(mario));
    {coin++;
      coinSounds.play();
      rest.destroy();
   }
  }
  

 }
 if (mario.x < 200){ mario.x = 200; }
 if (mario.y < 50){ mario.y = 50; }
 drawSprites()

}

function generatebricks(){
   if(frameCount % 70==0){
   bricks=createSprite(1200,random(50,450),40,10);
   bricks.addImage(bricks_img);
   bricks.scale=0.5;
   bricks.velocityX= -5;
   bricks.lifetime=250;  
   bricks_group.add(bricks);}
}

function generateCoins(){
   if(frameCount % 40==0){
      coins=createSprite(1200,random(80,350),40,40);
      coins.addAnimation(coinImg)
      coins.velocityX= -6;
      coins.lifetime=250;
      coins_group.add(coins)
   }
}