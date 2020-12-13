
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score
var ground
var survivalTime

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  
  // creating monkey
  monkey =createSprite(80,315,20,20);
  monkey.addAnimation("running", monkey_running);
  monkey.scale=0.1

  ground =createSprite(400,350,900,10);
  ground.velocityX =-4;
  ground.x=ground.width/2;
  console.log(ground.x)


  
  FoodGroup = createGroup();
  obstacleGroup = createGroup();
  
   
   survivalTime =0;

}



function draw() {
  background(225);

  stroke("black");
  textSize(20);
  fill("black");
survivalTime =Math.ceil(World.frameCount/frameRate());
  text("Survival Time: " + survivalTime, 100, 50);
  
  if (ground.x<0){
    ground.x = ground.width/2;
  }
  
    if(keyDown("space")){
  monkey.velocityY=-12;    
  }
  
  monkey.velocityY = monkey.velocityY + 0.8;
  
  
  //Increase score if monkey
    if(FoodGroup.isTouching(monkey)){
       FoodGroup.destroyEach();
       score = score+2;
    }
     if(obstacleGroup.isTouching(monkey)){      
       
  ground.velocityX=0;
  monkey.velocityY=0;     
       FoodGroup.setLifetimeEach(-1);
   obstacleGroup.setLifetimeEach(-1);
      
       
       FoodGroup.setVelocityXEach(0); 
       obstacleGroup.setVelocityXEach(0);
        
     }
  
  
  monkey.collide(ground);
  
     //spawn the food
    spawnFoods();
  
    //spawn obstacles on the ground
    spawnObstacles();
 
   

  
  drawSprites();
}
 
function spawnFoods(){
  //write code here to spawn the Food
 if(World.frameCount%80===0){
  var food = createSprite(600,120,10,20);
    food.addImage(bananaImage);
    food.velocityX =-5;
    food.scale =0.05;
    food.lifetime = 200;
   
   food.y=Math.round(random(100,150));
   FoodGroup.add(food); 
  
}
}
function spawnObstacles(){
  //write code here to spawn the Obstacle
  if(World.frameCount % 60===0){
    var obstacle =createSprite(600,320,20,50);
      obstacle.addImage(obstacleImage);
      obstacle.velocityX =-7;
      obstacle.scale = .15;
      obstacle.lifetime = 300;
   
     obstacleGroup.add(obstacle);
    
  }
  
}



