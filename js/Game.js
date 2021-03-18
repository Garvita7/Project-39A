class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    car1 = createSprite(100,300);
    car1.addImage(car1Image);
    car2 = createSprite(100,100);
    car2.addImage(car2Image);
    /*car3 = createSprite(500,200);
    car3.addImage(car3Image);
    car4 = createSprite(700,200);
    car4.addImage(car4Image);*/
    cars = [car1, car2];
  }

  play(){
    form.hide();

    Player.getPlayerInfo();
    
    
    if(allPlayers !== undefined){
      //var display_position = 100;
      //background(groundImage);
      image(trackImage, 0, 0, displayWidth*4, displayHeight);
      //index of the array
      var index = 0;

      //x and y position of the cars
      var y = 175;
      var x;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the cars a little away from each other in y direction
        y = y + 200;
        //use data form the database to display the cars in x direction
        x = allPlayers[plr].distance;
        cars[index-1].x = x;
        cars[index-1].y = y;

        if (index === player.index){
          cars[index - 1].shapeColor = "red";
          camera.position.x = displayWidth/2;
          camera.position.y = cars[index-1].y
        }
       
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
        textSize(45);
        fill("white");
        text("|",1200,300);
        text("|",1200,560);
        text("E",1200,380);
        text("N",1200,430);
        text("D",1200,480);
      }

    }

    if(keyIsDown(RIGHT_ARROW) && player.index !== null){
      player.distance +=10
      player.update();
    }
    if(keyIsDown(LEFT_ARROW) && player.index !== null){
      player.distance -=10
      player.update();
    }

    if(player.distance>1210){
      gameState = 2;
      textSize(50);
      fill("white");
      text("GAME OVER",600,450);
    }
    drawSprites();
  }
  end(){
    console.log("Game over");
  }
}
