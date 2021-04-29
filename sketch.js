var trex, trexanimation, ground, ground2, ground2animation, cloudanimation, obstacle, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6, cloud, cloud1, obstacles, gamestate, trexcollided, score, gameover, restart, gameOver, restart1, sound

function preload(){ //to load images and animations
  trexanimation = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  
  ground2animation = loadImage("ground2.png");
  
  cloudanimation = loadImage("cloud.png");
  
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  
  trexcollided = loadAnimation("trex_collided.png");
  
  gameover = loadImage("gameOver.png");
  restart = loadImage("restart.png");
  
  sound = loadSound("sound.wav");
}

function setup() {
  createCanvas(600, 200);
  
  //to create the trex
  trex = createSprite(50, 170, 20, 20);
  trex.scale = 0.4;
  trex.addAnimation("running", trexanimation); 
  trex.addAnimation("collided", trexcollided);
  //"nickname", name of var in preload()
  
  ground = createSprite(300, 190, 600, 2);
  ground.addImage("ground2", ground2animation);
  ground.velocityX = -5; //to make the ground move
  
  ground2 = createSprite(300, 195, 600, 2);
  ground2.visible = false;
  
  cloud1 = new Group();
  
  obstacles = new Group();
  
  gamestate = "play";
  
  score = 0;
  
  gameOver = createSprite(300, 100, 100, 100);
  gameOver.addImage("gameover", gameover);
  gameOver.scale = 0.5;
  gameOver.visible = false;
  
  restart1 = createSprite(300, 140, 50, 50);
  restart1.addImage("restart", restart);
  restart1.scale = 0.5;
  restart1.visible = false;
}

function draw() {
  background(1000);
  
  //console.log(trex.y);
  
  trex.collide(ground2);
  
  if (gamestate === "play") {
    //to create an infinite ground
    if (ground.x <= 0) {
        ground.x = 200; 
      }
    
    ground.velocityX = -5;
    
    //to make sure the trex jumps and comes back down
    if (keyDown("space") && trex.y >= 175) {
      trex.velocityY = -18;
      }
    
    trex.velocityY = trex.velocityY + 1;
    
    spawnclouds();
    spawnobstacles();
    
    score = score + Math.round(getFrameRate()/60);
    
    if (obstacles.isTouching(trex)) {
      gamestate = "end";
    }    
  }
  
  else if (gamestate === "end") {
    ground.velocityX = 0;
    obstacles.setVelocityXEach(0);
    cloud1.setVelocityXEach(0);
    obstacles.setLifetimeEach(-1);
    cloud1.setLifetimeEach(-1);
    trex.changeAnimation("collided", trexcollided);
    gameOver.visible = true;
    restart1.visible = true;
    sound.play();
    if (mousePressedOver(restart1)) {
      reset();
    }
  }
  
  text("score:"+score, 500, 20);
  drawSprites();
}

function spawnclouds() {
  if (frameCount % 100 === 0) {
    cloud = createSprite(600, 5, 20, 20);
    
    //to create the clouds at a random height
    cloud.y = Math.round(random(1, 100));
    cloud.velocityX = -2;
    cloud.addImage("cloud", cloudanimation);
    cloud.scale = 0.7;
    
    //to make sure the t rex is formed in front of the clouds
    trex.depth = cloud.depth + 1;
    
    //to add all clouds to their group
    cloud1.add(cloud);
    
    //console.log(cloud.depth);
    //console.log(trex.depth);
    
    //to make sure the clouds that go out of the screen dont use the computer's memory (calculated in frames)
    //no. of frames = distance/speed
    cloud.lifetime = 320;
  }
}

function spawnobstacles() {
  if (frameCount % 120 === 0) {
    obstacle = createSprite(600, 170, 20, 20);
  
    obstacleno = Math.round(random(1,6));

    obstacle.velocityX = -5;

    switch(obstacleno){
        case 1: obstacle.addImage(obstacle1);
        break;
        case 2: obstacle.addImage(obstacle2);
        break;
        case 3: obstacle.addImage(obstacle3);
        break;
        case 4: obstacle.addImage(obstacle4);
        break;
        case 5: obstacle.addImage(obstacle5);
        break;
        case 6: obstacle.addImage(obstacle6);
        break;
    }
    obstacle.scale = 0.5;
    obstacle.lifetime = 320;
    obstacles.add(obstacle);
  }
  
}


