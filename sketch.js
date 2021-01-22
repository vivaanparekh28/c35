var ball;
var mydatabase, dbref
var position
function setup(){
    createCanvas(500,500);
    ball = createSprite(250,250,10,10);
    ball.shapeColor = "red";
    mydatabase=firebase.database();//to create an object of the fire base database
    dbref=mydatabase.ref("BallPosition");//to go to that location in that database
    dbref.on("value",readdata,problem);//the .on() creates a constant listener at the position of the database

    
}

function draw(){
    background("white");
    if(keyDown(LEFT_ARROW)){
        changePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        changePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        changePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        changePosition(0,+1);
    }
    drawSprites();
}

function changePosition(x1,y1){
   // ball.x = ball.x + x;
   // ball.y = ball.y + y;
   dbref.set({
       x:position.x + x1,
       y:position.y + y1
   })
}
//readdata gets called using the value .on() fetches
function readdata(adata){
position=adata.val();//.val() puts the value from the adata into a variable
ball.x=position.x
ball.y=position.y
}
//This gets called when there is an error in getting the value in the.on() function.
function problem(){

    console.log("Erorr in db")
}
