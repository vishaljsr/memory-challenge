
//changing heading

var started = false;
var level = 0;

$(document).keydown(function()
{
    if(!started){
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
    
});

// generate game pattern


var gamePattern = [];
var buttonColour = ["red", "blue", "green", "yellow"];

function nextSequence(){

    userClickedPattern = [];
    level++;
    $("#level-title").text("Level" + level);

    var randomNuber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColour[randomNuber]; 
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);

}


// for button animation


function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){

        $("#"+currentColour).removeClass("pressed");
    },100);
}


// play sound

function playSound(sound){
    var audio = new Audio("sounds/" + sound + ".mp3");
    audio.play();
}

// now player will click pattern

var userClickedPattern = [];

$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);

});


// check your pattern function


function checkAnswer(currentLevel){
    if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
        console.log("success");
            if(userClickedPattern.length === gamePattern.length){
                setTimeout(function(){
                    nextSequence();
                },1000);
            }
    }
    else{
        console.log("wrong");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);

        $("#level-title").text("Game Over,Press any key to restart");
        startOver();
    }
}


// for start over again

function startOver(){
    level =  0;
    gamePattern = [];
    started = false;
}







