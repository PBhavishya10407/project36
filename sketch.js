//Create variables here
var dog,dogImage,happydog;
var database;
var food,foodStock;
var feed,add_Food;
var fedTime,lastFed;
var foodObj;

function preload()
{
  //load images here
  dogImage = loadImage("images/dogImg.png");
  happydog = loadImage("images/dogImg1.png");
}

function setup() {
  database = firebase.database();
  console.log(database);
  createCanvas(1000,400);

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  dog = createSprite(850,200);
  dog.addImage(dogImage);
  dog.scale=0.3;

  feed =createButton("Feed The Dog");
  feed.position(700,95);
  feed.mousePressed(feedPet);

  add_Food=createButton("Add Food");
  add_Food.position(800,95);
  add_Food.mousePressed(addFood);

  foodObj = new Food();
  
}

function draw() {  
  background(46,139,87);

  fedTime=database.ref('FedTime');
  fedTime.on("value",function(data)
  {
    lastFed=data.val();
  })

  fill("red");
  strokeWeight(4);
  stroke("yellow");
  textSize(40);
  if(lastFed>=12)
  {
    text("Lastfed: "+lastFed%12 + " PM",350,30);
  }
  else if(lastFed === 0)
  {
    text("LastFed: 12 AM",350,30);
  }
  else
  {
    text("LastFed: "+lastFed+" AM",350,30);
  }
  foodObj.display();

  drawSprites();
}

function readStock(data)
{
  foodS = data.val();
  foodObj.updatefoodStock(foodS);
}

function feedPet()
{
    dog.addImage(happydog);
    
    foodObj.updatefoodStock(foodObj.getfoodStock()-1);
    database.ref('/').update({
    Food : foodObj.getfoodStock(),
    FeedTime : hour()
    })
}
function  addFood()
{
    foodS++;
    database.ref('/').update({
    Food : foodS
    })
}