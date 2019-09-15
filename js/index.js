// Settinup our randomized coin tossing process

//Needa work in the shake.js library https://github.com/alexgibson/shake.js/
let activation = document.getElementById('activate');
activation.addEventListener("click", tossCoins);

let count = 0;

/*
* This function will keep count of the times coins are tossed and create our first array
* of true or false booleans.
*/
function tossCoins() {
  // Initialize our coin array
  let coinFlip = [];
  // Keep track of how many tosses made.
  count++;
  if(count <= 6) {
    // Randomly generate a true or false 3 times
    for(i = 0; i < 3; i++) {
      //Math.random() < 0.5 returns a boolean true or false 50% chances witch is nice.
      coinFlip.push((Math.random() < 0.5));
    }
    // Now we have an array of booleans ex. [true, false, false ]
    console.log(coinFlip);

    // Convert the booleans to either 2 (Tails yin) or 3 (Heads yang)
    for(i = 0; i < 3; i++){
      if(coinFlip[i]) {
        coinFlip[i] = 2;
      } else {
        coinFlip[i] = 3;
      }
    }

    // Duplicating array so we can work on it seperatly, apparently arrays get passed by referrence
    // so we were running into trouble here, it was being altered to strings and not numbers like what we want for our next
    // function
    let coinValues = coinFlip.slice(0);
    drawCoins(coinFlip);

    drawHexagram(coinValues);
  } else {
    console.log("Completed a full hexagram. Shake again to start over.");
    count = 0;
  }
}

/*
* This function will add the coresponding img paths to the markup to visualize the
* coin toss.
*/
function drawCoins(coins) {
  // Save our working hexagram row we are on using the count variable
  let rowQuery = ".row-" + count;
  // Convert array to the corresponding coin svg path.
  for(i = 0; i < 3; i++) {
    if (coins[i] == 2) {
      coins[i] = "assets/tails.svg";
    } else {
      coins[i] = "assets/heads.svg";
    }
  }
  // Create a node list of the Img tags we need using our row query
  let nodeList = document.querySelectorAll(rowQuery + " img");
  console.log(nodeList);
  // Map string paths of the coins array to the node list's img element's src path.
  for (i = 0; i < 3; i++) {
    nodeList[i].src = coins[i];
    // console.log(nodeList[i].src);
  }
  // Seed inline styles with randomized positioning.
  // https://stackoverflow.com/questions/1527803/generating-random-whole-numbers-in-javascript-in-a-specific-range
  // Random number 1-20 Math.floor(Math.random() * 16) + 5;
  nodeList[0].setAttribute("style", "top: " + (Math.floor(Math.random() * 16) + 5) + "px; right: " + (Math.floor(Math.random() * 16) + 5) + "px;");
  nodeList[1].setAttribute("style", "bottom: " + (Math.floor(Math.random() * 16) + 5) + "px; left: " + (Math.floor(Math.random() * 16) + 5) + "px;" );
  nodeList[2].setAttribute("style", "top: 0; right: " + (Math.floor(Math.random() * 16) + 5) + "px;");


  // Add class to initiate transformation transitions with delays
  setTimeout(function(){
    nodeList[0].classList.add('coin-drop');
  }, 100);
  setTimeout(function(){
    nodeList[1].classList.add('coin-drop');
  }, 200);
  setTimeout(function(){
    nodeList[2].classList.add('coin-drop');
  }, 300);

  setTimeout(function(){
    nodeList[0].classList.add('grab-coin');
  }, 900);
  setTimeout(function(){
    nodeList[1].classList.add('grab-coin');
  }, 1000);
  setTimeout(function(){
    nodeList[2].classList.add('grab-coin');
  }, 1100);

  // Fade out coins after certain time
  setTimeout(function(){
    let coinToss = document.querySelector(rowQuery + " .coin-toss");
    coinToss.classList.add('fade-out')
  }, 3000);
}

/*
* This function will take the coin numeral array and add it up to determine the lines value
* and also determine if it is a static or changing line
*/

function drawHexagram(coinValues) {
  // Save our working hexagram row we are on using the count variable
  let rowQuery = ".row-" + count;
  // Use our row query to select the current line in question
  let line = document.querySelector(rowQuery + " .line");

  // Add up the coin values
  let sum = 0;
  for( i = 0; i < 3; i++ ) {
    sum += coinValues[i];
  }
  console.log(sum)

  // Determine the type of line 6 and 8 are yin, 7 and 9 are yang.
  if ((sum == 6) || (sum == 8)) {
    line.classList.add("yin");
    let yinDiv1 = document.createElement("div");
    let yinDiv2 = document.createElement("div");
    line.appendChild(yinDiv1);
    line.appendChild(yinDiv2);
    // Transtition class apllied
    setTimeout(function(){
      let yinDivs = document.querySelectorAll(rowQuery + " .yin div");
      yinDivs[0].classList.add('fade-in');
      yinDivs[1].classList.add('fade-in');
    }, 100);
  } else {
    line.classList.add("yang");
  }

  // Determine whether this is a static or changing line eg. Did three values in a row occur?
  let p = document.querySelector(rowQuery + " p");
  let changing = document.createTextNode("Changing");
  let stadic = document.createTextNode("Static");
  if ((sum == 6) || (sum == 9)) {
    p.appendChild(changing);
  } else {
    p.appendChild(stadic);
  }

}
