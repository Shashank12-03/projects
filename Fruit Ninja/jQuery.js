/*
click on start reset button
     are we playing
        yes
          reload page
        no
          show trials left
          change button text to reset game
          create a random fruit
          1.create a random step
          define a random step
          2.move fruit down one step every 30 sec 
          is fruit too low?
             no-repeat 2
             yes-any trials let?
                yes: go to 1
                no: show game over,button text:start game
slice a fruit
   play sound
   explode fruit
*/
var playing=false;
var score;
var lives;
var fruit=['apple','banana','grapes','mango','orange','pineapple','strawberry','tomato','watermelon'];
var step;
var action;
$(function(){
  $("#submit").click(function(){
    if(playing==true)
    {
        location.reload();
    }
    else
    {
        playing=true;
        score=0;
        $("#scoreValue").html(score);

        $("#submit").text("Reset game");
        $("#lives").show();
        lives=3;
        addhearts();
        $("#gameover").hide();
        startAction();
    }
  });
$("#fruit1").mouseover(function(){
  score++;
  $("#scoreValue").html(score);
 // document.getElementById("slicesound").play();
  $("#slicesound")[0].play();
   clearInterval(action);
   $("#fruit1").hide("explode",500);
   setTimeout(startAction,500);
});

function addhearts()
{
    $("#lives").empty();
    for(i=0;i<lives;i++)
    {
      $("#lives").append('<img src="images/logo.png"class="life">');
    }
}
function startAction()
{
  $("#fruit1").show();
  choosefruit();
  $("#fruit1").css({'left':Math.floor(550*Math.random()), 'top':-50});
  step=1+ Math.round(5*Math.random());
  action=setInterval(function(){
    $("#fruit1").css('top',$("#fruit1").position().top +step);

    if($("#fruit1").position().top>$("#gameBox").height()){
            if(lives>1)
            {
              $("#fruit1").show();
              choosefruit();
              $("#fruit1").css({'left':Math.floor(550*Math.random()), 'top':-50});
              step=1+ Math.round(5*Math.random());
              lives--;
              addhearts();
            }
            else
            {
               playing=false;
               $("#gameover").show();
               $("#gameover").html('<p>Game Over!</p><p>Your score is '+ score +'</p>');
               $("#submit").html("Start game");
               $("#lives").hide();
               stopAction();
            }
    }
  },10);
}
function choosefruit()
{
  $("#fruit1").attr('src','images/' + fruit[Math.floor(8*Math.random())] +'.png');
}
function stopAction()
{
 clearInterval(action);
 $("#fruit1").hide(); 
}
});