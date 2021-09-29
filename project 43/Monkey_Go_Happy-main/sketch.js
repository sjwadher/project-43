var backImage,backgr;
var player, player_running;
var ground,ground_img;
var bananaImage
var score=0;

var gameOver,gameOverImage;

var END =0;
var PLAY =1;
var gameState = PLAY;

function preload(){
  backImage=loadImage("jungle.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  bananaImage=loadImage("banana.png")
  stoneImage=loadImage("stone.png")
  gameOverImage=loadImage("gameOver.png")
  FoodGroup= new Group;
  obstaclesGroup=new Group;

}

function setup() {
  createCanvas(800,400);
  
  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  
  player = createSprite(100,340,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.1;
  
  ground = createSprite(400,350,800,10);
  ground.x=ground.width/2;
  ground.visible=false;
  
}

function draw() { 
  background(0);

  if(gameState===PLAY){
  
  if(backgr.x<100){
    backgr.x=backgr.width/2;
  }
  
    if(keyDown("space") ) {
      player.velocityY = -12;
    }

    if(FoodGroup.isTouching(player)){

    score=score+2;
    player.scale=player.scale+0.01;
    FoodGroup.destroyEach();

    } 
    if(obstaclesGroup.isTouching(player)){

      var gameOver=createSprite(400,200,50,50)
      gameOver.addImage(gameOverImage)
      
  
      } 

     
    spawnFood();
    spawnObstacles();
    player.velocityY = player.velocityY + 0.8;

    player.collide(ground);

  }
  else if (gameState===END){


    FoodGroup.destroyEach();
     
  }


  drawSprites();
  textSize(20);
  text("score:"+score,50,50);
}

function spawnFood(){

if(frameCount % 80 === 0 ){

 var banana=createSprite(600,250,40,10)
banana.y=random(120,200)
banana.addImage(bananaImage)
banana.scale=0.05;
banana.velocityX=-4;

banana.lifetime=300;
player.depth=banana.depth+1;
FoodGroup.add(banana)

}

}
function spawnObstacles(){

  if(frameCount % 160 === 0 ){
  
   var stone=createSprite(600,350,40,10)
  
  stone.addImage(stoneImage)
  stone.scale=0.2;
  stone.velocityX=-4;
  
  stone.lifetime=300;
  player.depth=stone.depth+1;
   obstaclesGroup.add(stone)
  
  }
  
  }
