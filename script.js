var jumpSound = new Audio("resources/jump.mp3");

var runSound= new Audio("resources/run.mp3");
runSound.loop = true;

var endSound = new Audio("resources/end.mp3");
endSound.loop = false ; 

var clickSound = new Audio("resources/click.mp3");
clickSound.loop = false ; 


function keyCheck(event){

    var keyCode = event.which;

    if(keyCode == 13){
        //enter
        if(moveBackgroundAnimationId==0){
            moveBackgroundAnimationId = setInterval(moveBackground,100);
           
        }
        if(boyRunAnimationId == 0){
            boyRunAnimationId = setInterval(boyRunAnimation,100);
            runSound.play();
        }


        if(boxAnimationId == 0){

            boxAnimationId=setInterval(boxAnimation,100);
        }
        
        
       
    }

    if(keyCode == 32){
        //space

        if(boyJumpAnimationId == 0){
            clearInterval(boyRunAnimationId);
            runSound.pause();
            runSound.currentTime=0;
            boyRunAnimationId = 0;
            boyRunImageNumber = 1;

            boyJumpAnimationId = setInterval(boyJumpAnimation,100);
            jumpSound.play();
        }
    }
   
}

var backgroundImagePositionX = 0;
var moveBackgroundAnimationId = 0;

var score = 0;


function moveBackground(){

    backgroundImagePositionX = backgroundImagePositionX - 20;
    document.getElementById("background").style.backgroundPositionX = backgroundImagePositionX+"px";

    score = score + 1;
    
    document.getElementById("score").innerHTML = "score :"+score;

    document.getElementById("bar").style.width = score + "px";

    document.getElementById("progress").style.backgroundColor = "grey"

    document.getElementById("progress").style.borderStyle = "solid";


     
    

}


var boyRunImageNumber = 1;
var boyRunAnimationId = 0;


function boyRunAnimation(){

    boyRunImageNumber = boyRunImageNumber + 1;

    if(boyRunImageNumber == 9){
        boyRunImageNumber = 1;
    }

    document.getElementById("boy").src = "resources/Run ("+boyRunImageNumber+").png";

}

var boyJumpImageNumber=1;
var boyJumpAnimationId = 0;
var boyMarginTop = 370;

function boyJumpAnimation(){
    boyJumpImageNumber = boyJumpImageNumber + 1;

    if(boyJumpImageNumber<=6){ //2,3,4,5,6
        boyMarginTop = boyMarginTop - 30;
        document.getElementById("boy").style.marginTop = boyMarginTop+"px";
    }


    
    if(boyJumpImageNumber>=7){  //7,8,9,10,11
        boyMarginTop = boyMarginTop + 30;
        document.getElementById("boy").style.marginTop = boyMarginTop+"px";
    }



    if(boyJumpImageNumber == 11){
        clearInterval(boyJumpAnimationId);
        jumpSound.pause();
        jumpSound.currentTime = 0;
        boyJumpAnimationId = 0;
        boyJumpImageNumber = 1;

        boyRunAnimationId= setInterval(boyRunAnimation,100);
        runSound.play();
        
    if(moveBackgroundAnimationId==0){
            moveBackgroundAnimationId = setInterval(moveBackground,100);
    }

    if(boxAnimationId == 0){

        boxAnimationId=setInterval(boxAnimation,100);
    }
    
}

    document.getElementById("boy").src = "resources/Jump ("+boyJumpImageNumber+").png"

}

var boyDeadImageNumber = 1;
var boyDeadAnimationId  = 0;

var deadSound = new Audio("resources/dead.mp3");

function boyDeadAnimation(){

    boyDeadImageNumber = boyDeadImageNumber + 1;

    if(boyDeadImageNumber == 11){
        clearInterval(boyDeadAnimationId);
        boyDeadImageNumber = 10;
    }

    document.getElementById("boy").src = "resources/Dead ("+boyDeadImageNumber+").png"
}

var boxMarginLeft = 1000;

function createBoxes(){

     for(var i = 0; i < 10; i++){

       

        var box = document.createElement("div");
        box.className = "box";
        box.id = "box" + i;
        box.style.marginLeft = boxMarginLeft + "px";
        if(i<5){
           
            boxMarginLeft = boxMarginLeft + 1000;
        }
        if(i>=5){
            boxMarginLeft = boxMarginLeft + 500;
        }

       
        document.getElementById("background").appendChild(box);

       
    
     }


    
}

var boxAnimationId = 0

function boxAnimation(){

   for(var i = 0; i < 10; i++){
       var box = document.getElementById("box"+i);
       var currentMarginLeft = getComputedStyle(box).marginLeft;
       var newMarginLeft = parseInt(currentMarginLeft) - 20;
       box.style.marginLeft = newMarginLeft + "px";

       
       

     // alert(newMarginLeft);

      

            
  if(newMarginLeft>=100 & newMarginLeft<=200){//danger level

        if(boyMarginTop>=350){
           clearInterval(boxAnimationId);

            clearInterval(boyRunAnimationId);
            runSound.pause();
            boyRunAnimationId = -1; //after dead won't start again
 
            clearInterval(boyJumpAnimationId);
            jumpSound.pause();
            boyJumpAnimationId = -1;
 
            clearInterval(moveBackgroundAnimationId);
 
 
            boyDeadAnimationId = setInterval(boyDeadAnimation,100); 
            deadSound.play();

            failAnimationId = setInterval(failed,100);

            playButtonId = setInterval(playButton,100);
           
            
        }
         
    } 

    if(score==399){
        winAnimationId=setInterval(win,100);
        endSound.play();
    }
}
}
    



var winAnimationId = 0

function win(){
    var start = document.createElement("button");
    start.className="win";
    start.id = "win";
    start.innerHTML = "CONGRATULATONS!! YOU WIN";
    
    document.getElementById("background").appendChild(start);

    clearInterval(moveBackgroundAnimationId);
   
    clearInterval(boyRunAnimationId);
    runSound.pause();
    boyRunImageNumber = 8;
    boyRunAnimationId = 0;

    clearInterval(boyJumpAnimationId);
    jumpSound.pause();

    clearInterval(boxAnimationId);

    if(boyIdleAnimationId == 0){
        boyIdleAnimationId = setInterval(boyIdle,200);
    }
         

}

var boyIdleImageNumber = 1;
var boyIdleAnimationId = 0;


function boyIdle(){
    boyIdleImageNumber = boyIdleImageNumber + 1;

    if(boyIdleImageNumber == 11){
        boyIdleImageNumber = 1;  
    }

    document.getElementById("boy").src = "resources/Idle ("+boyIdleImageNumber+").png";

    
}

var failAnimationId = 0;

function failed(){
    var end = document.getElementById("start");
    end.style.backgroundImage="linear-gradient(90deg,rgb(32, 185, 18),rgb(212, 231, 86))";
    end.innerHTML = "You Fail";
    
}

var playButtonId = 0;
  
function playButton(){
    var play = document.getElementById("try");
    play.innerHTML = "Play Again";
    play.style.backgroundImage="linear-gradient(90deg,yellow,brown)";
    play.style.display="block";
   
    
    play.addEventListener('click', function click() {
        play.style.backgroundImage = "linear-gradient(rgb(103, 103, 12),rgb(71, 40, 31))";
    
      });
 }

 function soundClick()
{
  clickSound.play();
  setTimeout(reloadClick,800);
}

function reloadClick()
{
  window.location.reload();
}

