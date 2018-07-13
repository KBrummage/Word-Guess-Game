//Array of Objects of Tech Companies and their Slogans for Hints...
  var techComps = [{
    name: "apple",
    slogan: "Think Different"
  },
  {
    name: "Amazon",
    slogan: "Earth's Most Consumer-Centric Company"
  },
  {
    name: "IBM",
    slogan: "THINK"
  },
  {
    name: "Microsoft",
    slogan: "Where do you want to go today?"
  },
  {
    name: "Google",
    slogan: "Don't be evil"
  },
  {
    name: "Intel",
    slogan: "Experience What's Inside"
  },
  {
    name: "Cisco Systems",
    slogan: "Tomorrow Starts Here"
  },
  {
    name: "Oracle",
    slogan: "Can't Break It, Can't Break In"
  },
  {
    name: "Qualcomm",
    slogan: "Why Wait?"
  },
  {
    name: "Xerox",
    slogan: "The Document Company"
  },
  {
    name: "eBay",
    slogan: "Buy it, Sell it, Love it"
  },
  {
    name: "SpaceX",
    slogan: "America's Ride to Space"
  }
]
//disables return key from activating button
  window.addEventListener("keydown", function (event) {
    if (event.keyCode == 13 && event.target.id == "startBtn") {
      event.preventDefault()
    }
  })
//array for underscore placeholders
  var puzzleArr = [];
//array for solution letters
  var solutionArr = [];
//string for underscore placeholders
  var puzzleLine = "";
//counters for wins and losses
  var wins = 0;
  var losses = 0;

//Hit the start Button!
var startFunction = function () {
  //clears the name of the picked company on page
    document.getElementById("Letters").innerHTML = "";
  //sets chances to 6 and sends it to page
    var chances = 6;
    document.getElementById("numChance").innerHTML = chances;
  
  //pick a random Company from techComps if there are any left.
  if (techComps.length === 0) {
    alert("You've finished the game!  Refresh the screen to start over!")
  } 
  else {
    //picks a random company
      var randTechCompArrayInt = (Math.floor(Math.random() * techComps.length));
    //gathers the picked company's info
      var AnswerCompany = techComps[randTechCompArrayInt];
    //splices the selection from the array so that it won't be picked again.
      techComps.splice(randTechCompArrayInt, 1);
    //makes the puzzleLine (ex: --> "_ _ _ _ _")
      var AnswerName = AnswerCompany["name"];
      var AnswerSlogan = AnswerCompany["slogan"];
    //sends slogan in page
      document.getElementById("slogan").innerHTML = AnswerSlogan;
    // make an array of "_" that is the length of the company
      puzzleArr = [];
      for (var k = 0; k < AnswerName.length; k++) {
        puzzleArr.push("_");
      }
    //allows for spaces and dashes in the display of name before attempting to solve it.  (ex: "____-____" or "____  ____")  
      for (var p = 0; p < AnswerName.length; p++){
        if (AnswerName[p] === " " || AnswerName[p] === "-"){
          puzzleArr.splice(p, 1, AnswerName[p])
        }
      }
    //makes an array of the solution letters
      solutionArr = AnswerName.toLowerCase().split('');
    //makes a string based on the array of underscore placeholders
      puzzleLine = puzzleArr.join('');
    //sends placeholders as a string to page
      document.getElementById("Letters").innerHTML = puzzleLine;
    //sends updated amount of companies left  
      document.getElementById("compLeft").innerHTML = techComps.length;
    //accounts for grammar when one left
      if(techComps.length === 1){
        document.getElementById("deck").innerText = " Word left!";
      }
      else{
        document.getElementById("deck").innerText = "  Words on deck!"
      }
    //create array of strings of possible letters
      var alphaOptions = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
    //make array for used keys
      var usedKeys = [];
    //clears the pages letters
      document.getElementById("lettersLeft").innerHTML = "";

    // creates a bunch of letter divs with id as it's letter and class as unselected.  It then adds them all to the lettersLeft div.
      for (var a = 0; a < alphaOptions.length; a++){
        var targetDiv = document.getElementById("lettersLeft");
        var letterDiv = document.createElement("button");
        letterDiv.textContent = alphaOptions[a];
        var letterID = alphaOptions[a];
        letterDiv.setAttribute("class", "unselected");
        letterDiv.setAttribute("id", letterID);
        targetDiv.appendChild(letterDiv);
      }


    ////////////////////////////////////////////////////////
    ///////////when someone hits a keyboard button...///////
    ////////////////////////////////////////////////////////
    
    var userGuess = "";
      
    //when letter clicked with mouse  
    document.onclick = function(event){
      userGuess = event.target.id;
      btnEvent(userGuess);
    }

    //when letter typed
    document.onkeyup = function(event){
      userGuess = event.key;
      btnEvent(userGuess);
    }
    
    function btnEvent(userGuess) {
      //save the slected key.
      // var userGuess = event.key;
      //make an array to decide on length if it hit.
      var didItHit = [];
      //make an array to decide if we finished clue.
      var didWeComplete = [];
      
      //////when it's an authorized key selection /////
      for (var m = 0; m < alphaOptions.length; m++) {
        //see if the button is an alphabet, and hasn't been hit...
        if (userGuess.toLowerCase() == alphaOptions[m]) { 
          //remove letter from alphaOptions so you can't use it agin.
          alphaOptions.splice(m, 1);
          console.log(alphaOptions);
          
          console.log(puzzleArr);    
          console.log(didWeComplete);
          ////// if correct guess... ///////////
          for (var l = 0; l < puzzleArr.length; l++) {
            //if the guess is in the solution
            if (userGuess.toLowerCase() == solutionArr[l]) {
              //replace the _ with the letter.
                puzzleArr.splice(l, 1, userGuess);
              //make the array not equal 0 so that you can see that you got it right and won't lose a chance.
                didItHit.push(userGuess);
              //update the puzzle line (ex: E_a_p_e --> Exa_p_e)
                puzzleLine = puzzleArr.join('');
              //send the updated puzzle line
                document.getElementById("Letters").innerHTML = puzzleLine;
              //change color of letter to green for correct guess
                document.getElementById(userGuess).setAttribute("class", "right");
            }
          }
          /////// if incorrect guess ///////////
            if (didItHit.length === 0) {
              //subtract chances by one.
                chances = chances - 1;
              //send chances to page and change guess to red.
                document.getElementById("numChance").innerText = chances;
                document.getElementById(userGuess).setAttribute("class", "wrong");
            }   
          //check for completion of clue
            for (var n = 0; n < puzzleArr.length; n++) {
              if (puzzleArr[n] == "_") {
                didWeComplete.push(puzzleArr[n]);
              }
            } 
          //////////////////////////////////////////////////
          /////////// when we lose a clue /////////////////
            if (chances === 0) {
              //make noise and show hangman
                document.getElementById("boomLoss").play();
                document.getElementById("noose").setAttribute("src", "assets/images/hangMan.jpg");
              //update losses
                losses++;
              //send losses to page
              document.getElementById("numLosses").innerHTML = losses;
              //wait two seconds before restarting.
              setTimeout(document.getElementById("noose").setAttribute("src", "assets/images/hangManInit.jpg"), 2000);
              //restart function.
              startFunction();
            }
          ///////////////////////////////////////////////////////  
          //////////////when we have completed clue /////////////
            if (didWeComplete.length === 0) {
              //update win tally
                wins++;
              //play sound reset image
              document.getElementById("wooWin").play();
                chances = 6;              //fix grammar if wins = 1
                if(wins === 1){
                  document.getElementById("winCount").innerText = " Win, ";
                }
                else{
                  document.getElementById("winCount").innerText = " Wins, ";
                }
              //update win count
                document.getElementById("numWins").innerHTML = wins;
              //restart function
                startFunction();
              }

          //changes image based on chances left
            if (chances === 6){
              document.getElementById("noose").setAttribute("src", "assets/images/hangManInit.jpg");
            }
            if (chances === 5){
              document.getElementById("noose").setAttribute("src", "assets/images/hangMan1.jpg");
            }
            if (chances === 4){
              document.getElementById("noose").setAttribute("src", "assets/images/hangMan2.jpg");
            }
            if (chances === 3){
              document.getElementById("noose").setAttribute("src", "assets/images/hangMan3.jpg");
            }
            if (chances === 2){
              document.getElementById("noose").setAttribute("src", "assets/images/hangMan4.jpg");
            }
            if (chances === 1){
              document.getElementById("noose").setAttribute("src", "assets/images/hangMan5.jpg");
            }
        } 
      } 
    } 
  } 
}