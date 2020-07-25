
// ** JS CODE ** // 

// 1. a) Doc ready 
$(document).ready(function() {
  console.log('document ready'); 
  // Call the init function when the document is ready
  timerApp.init ();
  // Inputs will display 1 when page is refreshed
  // $('input[type=number]').val('');
})

  // 1. Create an object to organize my code in 
const timerApp = {};

// 1. b) Create an init function to store all my other functions. 
timerApp.init = function() {
  timerApp.eventListener (); 
}

  // 2. The form BUTTON will LISTEN for the form on "SUBMIT" event. 
timerApp.eventListener = function() {
  $('form').on('submit', function(e){
    // Prevent refresh on submit 
    e.preventDefault();
    // Grab the form and add an attribute of aria-label called timer started for A11y 
    $('form').attr('aria-label', 'timer started');
    $('button[type=submit]').addClass('submitted');
    // Add the value (placed into the first input) into a variable 
    const userInput1 = $('#typesOfExercises').val();
    // Convert the string into an integer (to be used for caluclations) and place it into a variable 
    const typesOfExercises = parseInt(userInput1);
    console.log('Total types of exercises:', userInput1);

    // Add the value (placed into the second input) into a variable   
    const userInput2 = $('#numberOfSets').val();
    // Convert the string into an integer (to be used for caluclations) and place it into a variable 
    const numberOfSets = parseInt(userInput2);
    console.log('total number of sets :', userInput2);

    // Using the variables above calculate the total workout time 
    let totalSecsOfExercises = typesOfExercises * ((numberOfSets * 30) + 5);
    console.log('totalSecs of Exercise', totalSecsOfExercises);

    // Call the totalTimer function and pass the parameter (total exercise time) in the function 
    timerApp.totalTimer (totalSecsOfExercises);
  })
}

// 3. Create a variable to store the function of the total workout countdown timer  
timerApp.totalTimer = function(totalSecsOfExercises) {
  let timer = totalSecsOfExercises; 
  let timeToBreak = 0;
  // Start timer witha 3 seconds delay 
  setTimeout(() => {
    let timerInterval = setInterval(function (){
      console.log('tick')
      $('.totalSeconds').text(timer);
      timer = timer - 1; 
      timeToBreak = timeToBreak + 1; 
      console.log ('timeToBreak');
      if (timeToBreak === 10 && timer > 0) {
        timeToBreak = -5 ; 
        timerApp.breakTimer (); 
      }
      // When timer reaches 0, stop timer countdown
      if (timer === 0) {
          clearInterval(timerInterval);
          $('.totalSeconds').text(timer);
      }
    }, 1000)
  } ,3000)
}

// 4. Create a variable to store the function of the break countdown timer 
timerApp.breakTimer = function( ) {
  // Break Timer will start at 5 seconds 
  let timer = 5; 
  const breakAudio = new Audio ('./assets/5-sec-countdown.wav');
  // 5 second countown audio will play when break timer is called (Started)
  breakAudio.play ();
  // Display the number 5 on the DOM specifically in the span with the class of "breakSeconds". 
  $('.breakSeconds').text(timer);
  // Start counting down
  let timerInterval = setInterval(function (){
    console.log('break tick')
    timer = timer - 1; 
    // Display the number counting down
    $('.breakSeconds').text(timer);
    // When the break timer reaches 0, stop countdown
    if (timer === 0) {
        clearInterval(timerInterval);
        // Continue to display the number to the DOM even if it is 0 
        $('.breakSeconds').text(timer);
    }
  }, 1000)
}

