  // 1. Create an object to organize my code in 
  // 2. The form button will LISTEN for the form "submit" event. 
  // 3. The "submit" event can only occur when the values are inputted by the user into the all the INPUTs 
  // 4. The total workout time will be calculated using the user input values and predetermined break times. 
  // 5. The SPANs with a class of "seconds" will LISTEN for the BUTTON "click" event and append the total workout time to the page. 
    // 5.a) The javascript will use setTimeout to countdown starting at total workout time (calculated) in seconds. 
    // 5 b) Every second the page will be updated to the DOM according to the setInterval function countdown. 
    // 5.c) The count down will stop when it reaches to 00 using clearInterval. 
  // 6. The SPAN with the class of "breakTime" will also use the timeInterval and if statement to know when to start counting down and append to the DOM when called for.  
    // 6.a) The SPAN with the class of "breakTime" will display both break times but alternating. 
    // 6 b) Every second the page will be updated to the DOM according to the setInterval function countdown. 
    // 6.c) The count down will stop when the SPAN of "seconds" reaches to 00 using clearInterval. 

// ** JS CODE ** // 

// 1. a) Doc ready 
$(document).ready(function() {
  console.log('document ready'); 
  timerApp.init ();
  // Inputs will display 1 when page is refreshed
  // $('input[type=number]').val('');
})

  // 1. Create an object to organize my code in 
const timerApp = {};

timerApp.init = function() {
  timerApp.eventListener (); 
}

  // 2. The form BUTTON will LISTEN for the form on "SUBMIT" event. 
timerApp.eventListener = function() {
  $('form').on('submit', function(e){
    // Prevent refresh on submit 
    e.preventDefault();
    // 
    $('form').attr('aria-label', 'timer started');
    $('button[type=submit]').addClass('submitted');

    const userInput1 = $('#typesOfExercises').val();
    const typesOfExercises = parseInt(userInput1);
    
    console.log('Total types of exercises:', userInput1);

    const userInput2 = $('#numberOfSets').val();
    const numberOfSets = parseInt(userInput2);
    
    console.log('total number of sets :', userInput2);

    let totalSecsOfExercises = typesOfExercises * ((numberOfSets * 30) + 5);
    console.log('totalSecs of Exercise', totalSecsOfExercises);

    timerApp.totalTimer (totalSecsOfExercises);
  })
}

// 3. 
timerApp.totalTimer = function(totalSecsOfExercises) {
  let timer = totalSecsOfExercises; 
  let timeToBreak = 0;
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
      
      if (timer === 0) {
          clearInterval(timerInterval);
          $('.totalSeconds').text(timer);
      }
    }, 1000)
  } ,3000)
}


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

