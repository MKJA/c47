var PLAY = 1;
var END = 0;
var gamestate= PLAY;

var score = 0;

const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
var backgroundImg, groundImg, invisibleGround, zombieImg1, zombieImg2, zombieGrp, zombie, FoodImg1, FoodImg2, waterImg, FoodGrp, food, obstacle, obstacleImg, obstacleGrp, mc, runningmc;

function preload()
{
	backgroundImg = loadImage("./Assests/bgImg.png");
	groundImg = loadImage("./Assests/groundfinal.png");
  zombieImg1 = loadImage("./Assests/zombie1.png");
  zombieImg2 = loadImage("./Assests/zombie2.png");
  FoodImg1 = loadImage("./Assests/food1.png");
  FoodImg2 = loadImage("./Assests/food2.png");
  waterImg = loadImage("./Assests/water.png");
  obstacleImg = loadImage("./Assests/brick1.png");
	runningmc = loadImage("./Assests/finalcharater.png");
}

function setup() {
	createCanvas(windowWidth, windowHeight);
  ground = createSprite(windowWidth/2-300, windowHeight-30, windowWidth+1500, 20);
 // ground.addImage("ground",groundImg);
  ground.scale = 0.9;
  ground.velocityX = -2;
  ground.visible = true;

  mc = createSprite(100, windowHeight-120, 20, 20);
  mc.addImage("running", runningmc);
  mc.scale = 0.3;

  invisibleGround = createSprite( windowWidth/2-300, windowHeight-50, windowWidth+1500, 20);

 
  zombieGrp = new Group();
  FoodGrp = new Group();
  obstacleGrp = new Group();

	engine = Engine.create();
	world = engine.world;

	//Create the Bodies Here.


	Engine.run(engine);
  
}


function draw() {
  rectMode(CENTER);
  background(backgroundImg);
  //console.log(ground.x);
  if(ground.x < 0){
	ground.x = windowWidth/2+400;
  }
  
  
  if(keyDown("RIGHT_ARROW")) {
    mc.x = mc.x+5;

  }
  
  if(keyDown("SPACE")){
    mc.y= mc.y-15;
  }
  mc.velocityY = mc.velocityY+0.8;
  mc.collide(invisibleGround);

  
  spawnZombies();
  spawnFood();
  spawnObstacles();
  drawSprites();
 
}

function spawnZombies(){
  if(frameCount % 220 === 0){
  var zombie = createSprite(windowWidth+10, windowHeight-100, 20, 20);
  zombie.velocityX = -2;
  var rand = Math.round(random(1,2));
  switch(rand){
    case 1 : zombie.addImage(zombieImg1);
            break;
    case 2 : zombie.addImage(zombieImg2);
            break;       
    default: break;
  } 

  zombie.scale = 0.5;
  zombie.lifetime = windowWidth/2;
  zombieGrp.add(zombie);
  

  }
}

function spawnFood() {

  if (frameCount % 350 === 0) {
    var food = createSprite(windowWidth+10, windowHeight-100, 20, 20);
    food.scale = 0.03;
    food.velocityX = -2;
    food.lifetime = windowWidth/2;
    FoodGrp.add(food);
    var rand = Math.round(random(1,2,3));
    switch(rand){
      case 1 : food.addImage(FoodImg1);
              break;
      case 2 : food.addImage(FoodImg2);
              break;
      case 3 : food.addImage(waterImg);
              break;   
       default: break;            
    }
    

  }
}

function spawnObstacles() {
  if (frameCount % 400 === 0) {
    var obstacle = createSprite(windowWidth+10, windowHeight-100, 20, 20);
    obstacle.scale = 1.1;
    obstacle.velocityX = -2;
    obstacle.lifetime = windowWidth/2;
    obstacleGrp.add(obstacle);
    obstacle.addImage(obstacleImg);
    
    
  }
}