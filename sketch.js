//Naming variables for main objects
var pika, pikaImage;
var poke_b, poke_bImage, poke_bGroup;
var pikaa;
var pikaaa;
var bg, bgImage;
var invisible1, invisible2;
var rand;
var PokeDodge;
var mainSong;
var gameState, PLAY, END;
var gameOver, gameOverImage;
var restart, restartImage;

function preload()
{
  //Loading images
  pikaImage = loadImage("pikachu infinite runner-1.png");
  poke_bImage = loadImage("pokeball for pika-1.png");
  bgImage = loadImage("bg for pika-1.png");
  gameOverImage = loadImage("gameOver.png");
  restartImage = loadImage("restart.png");
  
  //Loading sound effects
  pikaa = loadSound("Pika sound.mp3");
  pikaaa = loadSound("Pika angry sound.mp3");
  mainSong = loadSound("Song for infinite pika run.mp3");
  
}

function setup()
{
  createCanvas(580, 520);
  
  //Creating sprite for background
  bg = createSprite(520, 350);
  bg.addImage(bgImage);
  bg.scale = 1.5;
  
  mainSong.loop();
  
  PokeDodge = 0;
  
  //Creating sprite for pika
  pika = createSprite(80, 250);
  pika.addImage(pikaImage);
  pika.scale = 0.4;
  
  //Creating sprite for invisible1
  invisible1 = createSprite(300, 10, 700, 20);
  invisible1.visible = false;
  
  //Creating sprite for invisible2
  invisible2 = createSprite(300, 510, 700, 20);
  invisible2.visible = false;
  
  //Creating sprite for gameOver
  gameOver = createSprite(300, 250);
  gameOver.addImage(gameOverImage);
  gameOver.scale = 1;
  gameOver.visible = false;
  
  //Creating sprite for restart
  restart = createSprite(300, 160);
  restart.addImage(restartImage);
  restart.scale = 0.6;
  restart.visible = false;
  
  poke_bGroup = new Group();
}

function draw()
{
  background("white");
  
  if(gameState === PLAY)
    {
  
  //Moving the background
  bg.velocityX = -3;
  
  if (bg.x < 0)
    {
      bg.x = bg.width/2;
    }
  
  //Adding controls to pika
  if(keyDown("Up_arrow"))
    {
      pika.y = pika.y - 8;
      pikaa.play();
    }
  
  if(keyDown("Down_arrow"))
    {
      pika.y = pika.y + 8;
      pikaa.play();
    } 
  
  //Adding some major details if pikachu touches poke_b
  if(pika.isTouching(poke_bGroup))
    {
      pikaaa.play();
      pika.visible = false;
      mainSong.stop();
      poke_b.velocityXEach = 0; 
      gameState = END;
      poke_bGroup.destroyEach();    
      gameOver.visible = true;
      restart.visible = true;
    }
      
  if(mousePressedOver(restart))
    {
      restart.visible = false;
      gameOver.visible = false;
      pika.visible = true;
      pika.velocityY = 0;
      mainSong.loop();
    }
    }
  
  else if(gameState === END)
    {
      poke_bGroup.setVelcocityXEach(0);
      bg.setVelocityXEach(0);
    }
  
  
  //Adding collision effect to the invisible grounds
  pika.collide(invisible1);
  pika.collide(invisible2);
  
  text("PokeDODGE :" + PokeDodge, 500, 50);

  
  spawnpoke_b();
  
  
  drawSprites();
}

//text("PokeDODGE :" + PokeDodge)

function spawnpoke_b()
{
  if(frameCount % 30 === 0)
    {
      poke_b = Math.round(random(1, 10))
      poke_b = createSprite(500 ,290);
      poke_b.scale = 0.2;
      poke_b.velocityX = -4;
      poke_b.lifetime = 125;
      poke_b.addImage(poke_bImage);
      poke_bGroup.add(poke_b);
      
      //Adding random no. dependin onto the random no.
      poke_b.y = Math.round(random(1, 520));

    }
      
}