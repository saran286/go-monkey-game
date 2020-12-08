//monkey
var monkey , monkey_running, monkey_stop;

//banana and obstacle 
var banana ,bananaImage,foodGroup, obstacleGroup,obstacle, obstacleImage;

//ground
var ground;

//score
var survivalTime=0;

//gameState
var PLAY=1;
var END=0;
var gameState=PLAY;

function preload(){
  //loading the animation
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  //loading the images
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
}

function setup() {
  //creating the canvas
  createCanvas(400,400);

  //monkey
  monkey=createSprite(80,315,20,20);
  monkey.addAnimation("running",monkey_running);
  monkey.scale=0.1;
  
  //ground
  ground = createSprite(400,350,400,10);
  ground.shapeColor="black";
  ground.velocityX=-4; 
  
  //food and obstacle group
  foodGroup = new Group();
  obstacleGroup = new Group();
}

function draw() {
  //background color
  background("lightblue");
  
  //x-position of ground 
  ground.x=ground.width/2;
  //console.log(ground.x);
  
  //gameState: play and end
  if (gameState===PLAY){
    //calling function banana and stone
    banana();
    stone();
    
    //survivalTime
    survivalTime=Math.ceil(frameCount/frameRate());
    
    //making the monkey jump
    if(keyDown("space") && monkey.y>200){
      monkey.velocityY=-12;
    } 
    //adding gravity
    monkey.velocityY=monkey.velocityY+0.8;
    
    //banana
    if(monkey.isTouching(foodGroup)){
      foodGroup.destroyEach();
    }
    
    //changing gameState to end
    if(monkey.isTouching(obstacleGroup)){
      gameState=END;
    }
  }else if (gameState===END) {
    //gameover
    fill("black");
    textSize(30);
    textFont("bold")
    text("Game Over",120,80);
    
    //making the ground stop
    ground.velocityX=0;
    
    //making the food and obstacles to stop
    obstacleGroup.setVelocityEach(0,0);
    foodGroup.setVelocityEach(0,0);
    
    //seting negative lifetime
    obstacleGroup.setLifetimeEach(-1);
    foodGroup.setLifetimeEach(-1);  
  }
  //making the monkey to collide with the ground
  monkey.collide(ground);
  
  //drawing the sprites
  drawSprites();
  
  //displaying the survivalTime
  stroke("black");
  textSize(20);
  fill("black");
  text("Survival Time = "+ survivalTime,114,50);
}

function banana() {
  //creating the bananas
  if(frameCount % 80 === 0) {
    food = createSprite(400,165,10,40);
    food.addImage(bananaImage);
    food.scale=0.07;
    food.velocityX = -6;
    food.y=Math.round(random(150,250));
    food.lifetime = 100;
    foodGroup.add(food);
  }
}

function stone() {
  //creating the obstacles
  if(frameCount % 300 === 0) {
    obstacle = createSprite(400,333,10,40);
    obstacle.addImage(obstacleImage);
    obstacle.scale=0.1;
    obstacle.velocityX = -8;
    obstacle.lifetime = 100;
    obstacleGroup.add(obstacle);
  }
}