$(document).ready(function() {
  //set up variables
  var lvl = 00,
    pwr, strict, is_same;
  var $start = false;
  var randomPick = " ";
  var userSequence = [];
  var cpuSequence = [];
  var $blueAudio = new Audio('https://drive.google.com/uc?export=view&id=0B66xaYRsJwbGbDBwbkhpRTJoenc');
  var $redAudio = new Audio('https://drive.google.com/uc?export=view&id=0B66xaYRsJwbGc3lFWHd4cDNkU1U');
  var $greenAudio = new Audio('https://drive.google.com/uc?export=view&id=0B66xaYRsJwbGLVZTOXNQYmNrQlk');
  var $yellowAudio = new Audio('https://drive.google.com/uc?export=view&id=0B66xaYRsJwbGVHBqX2Fqa1dqUTg');
  var $buzz = new Audio('https://drive.google.com/uc?export=view&id=0B66xaYRsJwbGclNHWVByY3ltRWM');


  $("#score").text(" ");

  //turn on power
  $(".power").click(function() {
      $(".pwrBtn").toggleClass("powerOn");
      if ($("#score").text() == " ") {
        $("#score").text("--").fadeToggle(500);
        $("#score").text("--").fadeToggle(500);
        $("#score").text("--").fadeToggle(500);
        $("#score").text("--").fadeToggle(500);
        $start = true;
      } else{
        $("#score").text(" ");
        $start = false;
      } 
    
    })
  

    //click start button to initialize game
  $("#startButton").click(function() {
    //code to determine if pwr btn is on, and if so...
    if ($("#score").text() != " ") {
      // reset userSequence, cpuSequence, lvl and start over with getCpuSequence
      userSequence = [];
      cpuSequence = [];
      lvl = 00;
      setTimeout(function(){
         getCpuSequence();
      },1000)
     
    }
  });
  //strict functionality
  $("#strictButton").click(function(){
    $(".strictLight").toggleClass("strictLightOn");
  });

  //user button click functionality
  $("#blue").click(function() {
    $blueAudio.play();
    userSequence.push(0);
    if (cpuSequence.length == userSequence.length) {
      compare(0);
    }
  });
  $("#red").click(function() {
    $redAudio.play();
    userSequence.push(1);
    if (cpuSequence.length == userSequence.length) {
      compare(1);
    }
  });
  $("#green").click(function() {
    $greenAudio.play();
    userSequence.push(2);
    if (cpuSequence.length == userSequence.length) {
      compare(2);
    }
  });
  $("#yellow").click(function() {
    $yellowAudio.play();
    userSequence.push(3);
    if (cpuSequence.length == userSequence.length) {
      compare(3);
    }
  });

  // (1) get cpu sequence of buttons and add to array
  function getCpuSequence() {
    //set level display
    lvl++;
    $(".level").text("0"+lvl);
    //use Math.random to have cpu select a random button, add to cpuSequence and playback
    randomPick = Math.floor(Math.random() * 3);
    cpuSequence.push(randomPick);
    console.log(cpuSequence);
    //loop through each item in cpuSequence and run playSequence method       
    cpuSequence.forEach(function(value, index) {
      setTimeout(function() {
        playSequence(value)
      }, index * 1500);
    });

  };

  // (2) function to play computer sequence
  function playSequence(x) {
    //play cpu sequence then get user sequence
    switch (x) {
      case 0:
        $("#blue").addClass('blueLight').delay(1500);
        setTimeout(function() {
          $blueAudio.play();
        }, 500);
        setTimeout(function() {
          $("#blue").removeClass('blueLight');
        }, 500);
        break;
      case 1:
        $("#red").addClass('redLight').delay(1500);
        setTimeout(function() {
          $redAudio.play();
        }, 500);
        setTimeout(function() {
          $("#red").removeClass('redLight');
        }, 500);
        break;
      case 2:
        $("#green").addClass('greenLight').delay(1500);
        setTimeout(function() {
          $greenAudio.play();
        }, 500);
        setTimeout(function() {
          $("#green").removeClass('greenLight');
        }, 500);
        break;
      case 3:
        $("#yellow").addClass('yellowLight').delay(1500);
        setTimeout(function() {
          $yellowAudio.play();
        }, 500);
        setTimeout(function() {
          $("#yellow").removeClass('yellowLight');
        }, 500);
        break;
    }
  };

  //(3) function to compare cpuSequence to userSequence and continue or discontinue game flow
  function compare(x) {
    //compare userSequence to cpuSequence
    console.log(userSequence);
    is_same = cpuSequence.every(function(element, index) {
      return element === userSequence[index];
    });
    console.log(is_same);
    if (!is_same) {
      //if no match, sound alarm, display "!!", then loop through each item in cpuSequence and run playSequence method again
      $buzz.play();
       $(".level").text("!!");
      setTimeout(function() {
        $(".level").text("0"+lvl);
        cpuSequence.forEach(function(value, index) {
          setTimeout(function() {
            playSequence(value)
          }, index * 1500);
        });
      }, 1000);
      userSequence = [];
    } else {
      if(lvl < 20){
      userSequence = [];
      setTimeout(function() {
        getCpuSequence();
      }, 1000);
      }else
         $(".level").text("WIN");     
    };
  };
 
});