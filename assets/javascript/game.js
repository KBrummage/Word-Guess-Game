//Array of Objects of Tech Companies and their Slogans for Hints...
var techComps = [
  {name: "Apple",
  gameLines: "_____",
  slogan: "Think Different"},
  {name: "Hewlett-Packard Company",
  gameLines: "_______-_______ _______",
  slogan: "Make IT Matter"},
  {name: "IBM",
  slogan: "THINK"}
]


var puzzleArr = [];  //Do I need this?
var puzzleLine = "";

//Hit the start Button!
document.onclick = function (){
  var chances = 12;
  document.getElementById("numChance").innerHTML = chances;
  
  //pick a random Company from techComps.
  if(techComps.length === 0){alert("You've won the game!  Refresh the screen to start over!")}
  else{
  var randTechCompArrayInt = (Math.floor(Math.random() * techComps.length));
    //gathers the picked company's info
    var AnswerCompany = techComps[randTechCompArrayInt];
    //splices the selection from the array so that it won't be picked again.
    techComps.splice(randTechCompArrayInt, 1);

    //makes the puzzleLine (starts with "_____", goes to Apple)
    var AnswerName = AnswerCompany["name"];
    // make an array of "_" that is the length of the company
    for (var k = 0; k < AnswerName.length; k++){
      puzzleArr.push("_");
    }
    puzzleLine = puzzleArr.join('');
    document.getElementById("Letters").innerHTML = puzzleLine;
  
    var alphaOptions = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
    
//going to need an array of numbers for each comp. to show how many _ _ _ to put down?  
                    console.log(techComps + "<--array of companies");
                    console.log(randTechCompArrayInt + "<--random integer");
                    console.log(AnswerCompany + "<-- The picked company object");
                    console.log(AnswerName + "<--AnswerName");
                    console.log(puzzleArr + "<--solutionArray");
                    console.log(puzzleLine + "<--puzzle line");
                    console.log(alphaOptions + "<-- array of letters")
//when someone hits a button...(or presses a button?...)
document.onkeyup = function(event){
  var userGuess = event.key;
  //make a temp array of the name.  (When's it's empty, they win!)
  //toggle button press by using letter as id...

  //library of possible entries
  
  //see if the button is an alphabet, and hasn't been hit...
  var tempAlpha = [];
  for (var i = 0; i < alphaOptions.length; i++){
    if (userGuess.toLowerCase() != alphaOptions[i]){
      tempAlpha.push(alphaOptions[i]);
    }
    
  }
                      console.log(userGuess + "<--userGuess");
                      console.log(tempAlpha);
  //mark it off the grid.
  alphaOptions = tempAlpha;
                      console.log(alphaOptions);

  //if one of the letters, show them.
    for (var l = 0; l < puzzleArr.length; l++){
      if (userGuess.toLowerCase() === puzzleArr[i].toLowerCase){
        puzzleArr.splice(i, 1, userGuess);
      }
    }
    puzzleLine = puzzleArr.join('');
    document.getElementById("Letters").innerHTML = puzzleLine;
    //replace the _ with the letter (loop).
    //delete each instance of the letter in the temp array.

  //if not, subtract 1 from # of tries.
  if (chances > 0){
  chances = chances - 1;
  document.getElementById("numChance").innerHTML = chances;
  if (chances === 0) {
    alert("Game over!  Please start over again!")
  }
}
  
}
  
}
} // End of start button.
