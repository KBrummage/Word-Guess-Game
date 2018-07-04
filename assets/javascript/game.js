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

window.addEventListener("keydown", function (event) {
  if (event.keyCode == 13 && event.target.id == "startBtn") {
    event.preventDefault()
  }
})

var puzzleArr = [];
var solutionArr = [];
var puzzleLine = "";
var wins = 0;
var losses = 0;



//Hit the start Button!
var startFunction = function () {
  document.getElementById("Letters").innerHTML = "";
  var chances = 12;

  document.getElementById("numChance").innerHTML = chances;

  //pick a random Company from techComps.
  if (techComps.length === 0) {
    alert("You've won the game!  Refresh the screen to start over!")
  } else {
    var randTechCompArrayInt = (Math.floor(Math.random() * techComps.length));
    //gathers the picked company's info
    var AnswerCompany = techComps[randTechCompArrayInt];
    //splices the selection from the array so that it won't be picked again.
    techComps.splice(randTechCompArrayInt, 1);

    //makes the puzzleLine (starts with "_____", goes to Apple)
    var AnswerName = AnswerCompany["name"];
    // make an array of "_" that is the length of the company
    puzzleArr = [];
    for (var k = 0; k < AnswerName.length; k++) {
      puzzleArr.push("_");
    }
    for (var p = 0; p < AnswerName.length; p++){
      if (AnswerName[p] === " " || AnswerName[p] === "-"){
        puzzleArr.splice(p, 1, AnswerName[p])
      }

    }
    solutionArr = AnswerName.toLowerCase().split('');
    puzzleLine = puzzleArr.join('');
    document.getElementById("Letters").innerHTML = puzzleLine;
    document.getElementById("compLeft").innerHTML = techComps.length;


    var alphaOptions = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
    var alphaString = alphaOptions.toString();
    console.log(alphaString + "<--AlphaString")
    document.getElementById("lettersLeft").innerHTML = alphaString;
    //going to need an array of numbers for each comp. to show how many _ _ _ to put down?  
    console.log(techComps + "<--array of companies");
    console.log(randTechCompArrayInt + "<--random integer");
    console.log(AnswerCompany + "<-- The picked company object");
    console.log(AnswerName + "<--AnswerName");
    console.log(puzzleArr + "<--solutionArray");
    console.log(puzzleLine + "<--puzzle line");
    console.log(alphaOptions + "<-- array of letters")
    //when someone hits a button...(or presses a button?...)

    document.onkeyup = function (event) {
      var userGuess = event.key;
      var didItHit = [];
      var didWeComplete = [];


      for (var m = 0; m < alphaOptions.length; m++) {
        //see if the button is an alphabet, and hasn't been hit...
        if (userGuess.toLowerCase() == alphaOptions[m]) {

          //Change the library to reflect that the key has been hit
          var tempAlpha = [];
          for (var i = 0; i < alphaOptions.length; i++) {
            if (userGuess.toLowerCase() != alphaOptions[i]) {
              tempAlpha.push(alphaOptions[i]);
            }
          }
          console.log(userGuess + "<--userGuess");
          console.log(tempAlpha);
          alphaOptions = tempAlpha;
          alphaString = tempAlpha.toString();
          console.log(alphaString);
          document.getElementById("lettersLeft").innerHTML = alphaString;

          //if one of the letters, show them.
          for (var l = 0; l < puzzleArr.length; l++) {
            if (userGuess.toLowerCase() == solutionArr[l]) {
              //replace the _ with the letter (loop).
              puzzleArr.splice(l, 1, userGuess);
              didItHit.push(userGuess);

              console.log(puzzleArr);
              puzzleLine = puzzleArr.join('');
              document.getElementById("Letters").innerHTML = puzzleLine;
              console.log(puzzleLine + "<--puzzleLine");
            } //end of if the letter is present
          } //iterates through puzzle array

          //if not, subtract 1 from # of tries until loss.
          if (didItHit.length === 0) {
            chances = chances - 1;
            document.getElementById("numChance").innerHTML = chances;
            if (chances === 0) {
              losses++;
              document.getElementById("numLosses").innerHTML = losses;
              startFunction();
            }
          }

          for (var n = 0; n < puzzleArr.length; n++) {
            if (puzzleArr[n] == "_") {
              didWeComplete.push(puzzleArr[n]);
            }
          }
          if (didWeComplete.length === 0) {
            wins++;
            document.getElementById("numWins").innerHTML = wins;
            startFunction();

          }


        } //if button hasn't been hit yet...
      } //iterates through remaining alphabet
    } //keyup event triggered
  } //Picks Company
} // End of start button.