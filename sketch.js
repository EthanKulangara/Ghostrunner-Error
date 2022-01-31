var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;

  ghost = createSprite(300,300,10,10);
  ghost.addImage(ghostImg);
  ghost.scale = 0.3;
  
  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();
}

function draw() {
  background(200);
  
  if(gameState == "play"){
    if(keyDown("space")) {
      ghost.velocityY = -12;
    }
  
    ghost.velocityY = ghost.velocityY + 0.8;
  
    if(keyDown(LEFT_ARROW)){
      ghost.x = ghost.x -3;
    }
    if(keyDown(RIGHT_ARROW)){
      ghost.x = ghost.x +3;
    }
  
    if(tower.y > 400){
        tower.y = 300
      }
    spawnDoors();
  
    if(climbersGroup.isTouching(ghost)){
      ghost.velocityY = 0;
    }
    if(invisibleBlockGroup.isTouching(ghost)|| ghost.y >600){
      ghost.destroy();
      console.log("hi");
      gameState = "end";
    }
    drawSprites();
  }
if(gameState == "end"){
  console.log("hello");
  Stroke("yellow");
  fill("yellow");
  textSize(30);
  text("Game Over",230,250);
}
 
 

}


function spawnDoors() {
  if(frameCount % 240 === 0) {
    door = createSprite(random(100,500),0,10,10);
    door.addImage(doorImg);
    door.velocityY = 1;
    doorsGroup.add(door);

    ghost.depth = door.depth;
    ghost.depth ++;
    if(climbersGroup.isTouching(ghost)){
      ghost.velocityY = 0;
    }

    climber = createSprite(door.x,door.y +50,10,10);
    climber.addImage(climberImg);
    climber.velocityY = 1;
    climbersGroup.add(climber);

    invisibleBlock = createSprite(climber.x,climber.y +10,climber.width,2);
    invisibleBlockGroup.add(invisibleBlock);
    invisibleBlock.velocityY = 1;
    }
}
