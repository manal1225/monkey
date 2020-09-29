
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroupUp, obstacleGroup,FoodGroupDown
var score=0,ground;
var PLAY=1;
var END=0;
var gameState=1;


function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(500,300);
  
  monkey=createSprite(50,250,20,20);
 monkey.addAnimation("monkey",monkey_running);
  monkey.scale=0.1;
  
  ground=createSprite(250,300,500,40);
  ground.shapeColor=(rgb(198,96,16));

  obstacleGroup=createGroup();
  FoodGroupUp=createGroup();
  FoodGroupDown=createGroup();
}


function draw() {
  background("lightblue")
  
  if(gameState===PLAY){
     
     bananaUp();
     obstacles();
     bananaDown();
     
    
     if (keyDown("space") && monkey.y >= 240) {
        score=score+1;
        monkey.velocityY = -15;
     }
    
     console.log(monkey.y);
    //add gravity
    monkey.velocityY = monkey.velocityY + 0.8
     
    
    if(monkey.isTouching(FoodGroupUp)){
      score=score+1; 
      FoodGroupUp.destroyEach();
       }
     
    if(monkey.isTouching(FoodGroupDown)){
       score=score+1;
      FoodGroupDown.destroyEach();
       }
    
    if(monkey.isTouching(obstacleGroup)){
       gameState=END;
       }
    
  }
  else if(gameState===END){
 obstacleGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1),
    
    fill("red")
    textFont("algerian");
  textSize(40);
  text("GAME OVER",150,150);
 
    
    
    
   }
  
   monkey.collide( ground);
  fill("black")
  textFont("algerian");
  textSize(20);
 text("SCORE:"+score,380,40);
  
  
  fill("yellow");
  circle(40,40,40);
  
   drawSprites();
}

function obstacles(){
  if(World.frameCount%120===0){
  obstacle=createSprite(500,260,20,20);
  obstacle.addImage(obstacleImage);
  obstacle.velocityX=-6;
  obstacle.scale=0.15;
  obstacle.lifetime=130;
     obstacle.velocityX = -(6 + score / 100);
  obstacle.setCollider("circle", 0, 0, 230);
  obstacleGroup.add(obstacle);
  
  }
}

function bananaUp(){
if(World.frameCount%63===0){
banana=createSprite(500,260,20,20);
banana.addImage(bananaImage);
  banana.velocityX=-6;
   banana.velocityX = -(6 + score / 1);
  banana.scale=0.08;
  FoodGroupDown.add(banana);
}
}
function bananaDown(){
if(World.frameCount%100===0){
banana=createSprite(500,140,20,20);
banana.addImage(bananaImage);
   banana.velocityX = -(6 + score / 1);
  banana.velocityX=-6;
  banana.scale=0.08;
   FoodGroupUp.add(banana);
}
}

function reset() {
  gameState = PLAY;
  score = 0;
  FoodGroupUp.destroyEach();
  obstacleGroup.destroyEach();
  FoodGroupDown.destroyEach();
  }


