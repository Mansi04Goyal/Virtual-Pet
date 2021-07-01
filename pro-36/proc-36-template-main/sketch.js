var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;
var feed,lastFed,fedTime;
//create feed and lastFed variable here


function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //create feed the dog button here

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);
  
  feed=createButton("Feed the dog");
  feed.position(600,95);
  feed.mousePressed(feedDog)
}

function draw() {
  background(46,139,87);
  foodObj.display();
  
  fedTime=database.ref('feedTime')
  fedTime.on("value",function(data){
    lastFed=data.val()
  });
  textSize(20)
  if (lastFed>=12){
    text("lastFed= "+lastFed%12+ "pm",200,30)}
   else if(lastFed==0){
     text("lastFed=12am",200,30)
   }
   else{
     text("lastFed="+lastFed+"am",200,30)
   }
  //write code to display text lastFed time here

 
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  dog.addImage(happyDog);
  var food_stock_value=foodObj.getFoodStock()
  if(food_stock_value<=0){
    foodObj.updateFoodStock(food_stock_value*0)
  }
  else{
    foodObj.updateFoodStock(food_stock_value -1)
  }
  database.ref('/').update({
    food:foodObj.getFoodStock(),
    feedTime:hour()
  })
}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    food:foodS
  })
}
