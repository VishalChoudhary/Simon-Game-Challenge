var gamePattern =[];
var userClickedPattern =[];
var buttonColors=["red","blue","green","yellow"];
var started = false;

var level=0;

$(document).on('keypress',function() {
    if(!started){
        $("#level-title").text("Level "+level);
        nextSequence();
        started = true;
    }
})


function nextSequence() {
    userClickedPattern=[];
    // console.log("t     "+userClickedPattern);
    level++;
    $("#level-title").text("Level "+level);
    var randomNumber = Math.floor(Math.random() *4);
    var randomChosenColour=buttonColors[randomNumber];
    // console.log(randomChosenColor);
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    //for sound play
    playSound(randomChosenColour);
    
}

$(".btn").click(function(){
    var userChosenColour =$(this).attr("id");
    userClickedPattern.push(userChosenColour);
    // console.log(userClickedPattern);
    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1);
})


function checkAnswer(currentLevel){
    if( gamePattern[currentLevel]===userClickedPattern[currentLevel]){
        console.log("Success");

        if(gamePattern.length===userClickedPattern.length ){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }
    else{
        playSound("wrong");

        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);

        $("#level-title").text("Game Over!, Press Any Key To Restart");

        statOver();
    }
}

function statOver(){
    level=0;
    gamePattern=[];
    started=false;
}

function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");

    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed");
    },100);
}

function playSound(name) {
    var audio=new Audio("sounds/"+name+".mp3");
    audio.play();
}
