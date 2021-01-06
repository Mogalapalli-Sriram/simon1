var array = ["green", "red", "yellow", "blue"];
var gamePattern = [];
var userClickPattern = [];
var count = 0;
var begin = false;
var type;
document.addEventListener("touchmove", function() {
  if (!begin) {
    setTimeout(function() {
      newSequence();
    }, 500);
    begin = true;
  }
});

function titleUpdate() {
  $("#level-title").html("level" + " " + count);
}

function newSequence() {
  userClickPattern = [];
  count++;
  titleUpdate();
  var randomLength = document.querySelectorAll(".btn").length;
  var rand = Math.random();
  rand = (rand * randomLength);
  var randomNumber = Math.floor(rand);
  var randomColor = array[randomNumber];
  gamePattern.push(randomColor);
  sounding(randomColor);
  var path2 = "." + randomColor;
  $(path2).fadeIn(100).fadeOut(100).fadeIn(100);

}



$(".btn").on("touchstart",function() {
  if (begin) {
    var userChosenColor = this.id;
    userClickPattern.push(userChosenColor);
    sounding(userChosenColor);
    animation(userChosenColor);
    var userLength = userClickPattern.length;
    checkAnswer(userLength - 1);
  }
});

function sounding(color) {
  var path = color + ".mp3";
  var sound = new Audio(path);
  sound.play();
}



function animation(animat) {

  var root = "#" + animat;
  $(root).addClass("pressed");
  setTimeout(function() {

    $(root).removeClass("pressed");
  }, 200);

}

function checkAnswer(userDim) {

  if (userClickPattern[userDim] === gamePattern[userDim]) {
    if (userClickPattern.length === gamePattern.length) {

      setTimeout(function() {
        newSequence();
      }, 1000);
    }
  } else {
    $("#level-title").html("GameOver!!" + " " + "Swipe on screen to continue.");

    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    },500);
    var game = new Audio("wrong1.mp3");
    game.play();
    startAgain();
  }

}

function startAgain() {
  gamePattern = [];
  count = 0;
  begin = false;
}
