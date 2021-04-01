
// ** JS CODE ** // 

// view 1 - customize workout input view 
// Input #1 Customizable number of exercises 
// Input #2 customizable number of sets
// Input #3 customizable duration of Sets 
// input #4 customizable duration of breaks between each set
// Input #5 customizable duration of breaks between each exercise
// previewer of total workout time 


//view 2 - work out timer countdown view 
// box #1 that displays time remaining seconds in set OR that displays break time
// box #2 that displays remaining number of exercises 
// box #3 that displays remaining sets 
// bot #4 that displays remaining total workout time
// pause button 
// start button 


// 1. Create an object to organize my code in 
const timerApp = {
  defaultSettings: {
    exercises: 5,
    sets: 4, 
    setDuration: 5,
    breakDurationSets: 5,
    breakDurationExercise: 20,

  },
  settings: {
    exercises: 5,
    sets: 4, 
    setDuration: 5,
    breakDurationSets: 5,
    breakDurationExercise: 20,

  },
  numberOfExerciseInput: $('#typesOfExercises'),
  numberOfSetInput: $('#numberOfSets'),
  setDurationInput: $('#durationOfSets'),
  breakDurationSetsInput: $('#breakDurationSets'),
  breakDurationExerciseInput: $('#breakDurationExercise'),
  totalWorkoutTimeElement: $('#minutes'),
};

console.log(timerApp)
// Convert the string into an integer (to be used for caluclations) and place it into a variable 
// const typesOfExercises = parseInt(timerApp.numberOfExerciseInput.val());
// console.log('Total types of exercises:', typesOfExercises);

// Convert the string into an integer (to be used for caluclations) and place it into a variable 
// const numberOfSets = parseInt(timerApp.numberOfSetInput.val());
// console.log('total number of sets :', numberOfSets);

const setDuration = parseInt(timerApp.setDurationInput.val());
// console.log('total duration of each set:', setDuration);

const breakDurationSets = parseInt(timerApp.breakDurationSetsInput.val());
// console.log('total break time between each set :', breakDurationSets);

const breakDurationExercise = parseInt(timerApp.breakDurationExerciseInput.val());
// console.log('total break time between each exercise :', breakDurationExercise);

// Using the variables above calculate the total workout time 
const totalSecsOfExercises = (typesOfExercises, numberOfSets, setDuration, breakDurationSets, breakDurationExercise) => {
  return typesOfExercises * (((numberOfSets * setDuration) + (breakDurationSets * (numberOfSets - 1)) + breakDurationExercise));
}

console.log('totalSecs of Exercise', totalSecsOfExercises);


//Convert seconds to minutes by taking in the seconds 
//Return Minutes 
timerApp.convertSecondsToMinutes = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds - minutes * 60;
  if (seconds > 60) {
    Math.floor(seconds / 60);
  } 
  console.log(minutes);
  console.log(remainingSeconds);
  return `${minutes}:${remainingSeconds < 10 ? '0' + remainingSeconds : remainingSeconds}`
}

timerApp.setOnChangeEvents = () => {
  // when an input updates, update the corresponding timerApp.setting number 
  // display the new value
}

// DONT TOUCH 
timerApp.setDefaultValues = () => {
  const { exercises, sets, setDuration, breakDurationSets, breakDurationExercise } = timerApp.defaultSettings;
  const totalExerciseSeconds = totalSecsOfExercises(exercises, sets, setDuration, breakDurationSets, breakDurationExercise);
  timerApp.numberOfExerciseInput.val(exercises); 
  timerApp.numberOfSetInput.val(sets); 
  timerApp.setDurationInput.val(setDuration); 
  timerApp.breakDurationSetsInput.val(breakDurationSets); 
  timerApp.breakDurationExerciseInput.val(breakDurationExercise); 
  timerApp.displayTimerMinutes(totalExerciseSeconds);
 
  
  // console.log('default types of exercises ' + timerApp.numberOfExerciseInput.val());
  // console.log('default types of sets ' + timerApp.numberOfSetInput.val());
  // console.log('default duration of sets ' + timerApp.setDurationInput.val());
  // console.log('default break duration between each set ' + timerApp.breakDurationSetsInput.val());
  // console.log('default break duration between each exercise ' + timerApp.breakDurationExerciseInput.val());
}




// 1. a) Doc ready 
$(function() {
  console.log('document ready'); 
  // Call the init function when the document is ready
  timerApp.init ();
})


// 1. b) Create an init function to store all my other functions. 
timerApp.init = () => {
  timerApp.setDefaultValues();
  timerApp.eventListener(); 
}

timerApp.setupElments = () => {
  // Grab the form and add an attribute of aria-label called timer started for A11y 
  $('form').attr('aria-label', 'timer started');
  $('button[type=submit]').addClass('submitted');
  // Add border around the Total Work Out timer once submit is clicked to indicate entry has been set 
  $('#totalWorkoutTimer').addClass('lightUpTotal');
  // Disable users from submitting more than once. 
  $('#disable').attr('disabled',true);
}

// timerApp.inputChange = () => {

// }

// 2. The form BUTTON will LISTEN for the form on "SUBMIT" event. 
timerApp.eventListener = () => {
  $('form').on('submit', function(e){
    e.preventDefault();
    timerApp.setupElments();  

    // Convert the string into an integer (to be used for caluclations) and place it into a variable 
    timerApp.settings.exercises = parseInt(timerApp.numberOfExerciseInput.val());
    // console.log('Total types of exercises:', exercises);

    // Convert the string into an integer (to be used for caluclations) and place it into a variable 
    timerApp.settings.sets = parseInt(timerApp.numberOfSetInput.val());
    // console.log('total number of sets :', numberOfSets);

    timerApp.settings.setDuration = parseInt(timerApp.setDurationInput.val());
    console.log('total duration of each set:', setDuration);

    timerApp.settings.breakDurationSets = parseInt(timerApp.breakDurationSetsInput.val());
    console.log('total break time between each set :', breakDurationSets);

    timerApp.settings.breakDurationExercise = parseInt(timerApp.breakDurationExerciseInput.val());
    console.log('total break time between each exercise :', breakDurationExercise);

    // Using the variables above calculate the total workout time 
    const workoutTime = totalSecsOfExercises(timerApp.settings.exercises, timerApp.settings.sets, timerApp.settings.setDuration, timerApp.settings.breakDurationSets, timerApp.settings.breakDurationExercise);
    
    // console.log('totalSecs of Exercise', workoutTime);


    // Call the totalTimer function and pass the parameter (total exercise time) in the function 
    timerApp.totalTimer (workoutTime);
  })
}


// 5 seconds SET of JJ + 5 second break between SET + 5 seconds SET of JJ + 5 second break between SET + 5 seconds SET of JJ 
// + 20 Second break between EXERCISE 
// + 5 second SET of Planks + 5 second break between SET + 5 second SET of Planks + 5 second break between SET + 5 second SET of Planks 
// + 20 Second break between EXERCISE +
//  + 5 second SET of pushUps + 5 second break between SET + 5 second SET of pushUps + 5 second break between SET + 5 second SET of pushUps 
// + 20 Second break between EXERCISE 
// 135 

// 3 * (((3 x 5) + ((3 - 1) * 5)) + 20)
// = (15 + 5 + 20) 3
// = (40) 3 
// = 120

// timerApp.countdown = (countdownTotal) => {
//  setTimeout( () => {

//  }
//  )
// }

timerApp.setRemainingSets = (numberOfSets) => {
  const remainingSets = numberOfSets - 1;
  $('#totalSets .totalSeconds').text(remainingSets);
  timerApp.settings.sets = remainingSets;
}

timerApp.setRemainingExercises = (numberOfExercises) => {
  const remainingExercises = numberOfExercises - 1;
  $('#totalExercises .totalSeconds').text(remainingExercises);
  timerApp.settings.exercises = remainingExercises;
}


timerApp.setCountdown = () => {
  const milseconds = timerApp.settings.setDuration * 1000;
  setTimeout(() => { 
    return true 
  }, milseconds)
}


timerApp.displayTimerMinutes = (totalSeconds) => {
  const minutes = timerApp.convertSecondsToMinutes(totalSeconds)
  timerApp.totalWorkoutTimeElement.text(minutes);

}
// breakdown the timer app into functional (smaller) components 
// call them when needed using if and conditional statments 

// 3. Create a variable to store the function of the total workout countdown timer  
timerApp.totalTimer = (totalSecsOfExercises) => {
  let timer = totalSecsOfExercises;
  // Display the total workout time on the DOM 
  timerApp.displayTimerMinutes(timer); 
  let timeToBreak = 0;
  // Start timer witha 3 seconds delay 
  setTimeout(() => {
    const startAudio = new Audio ('./assets/go-start.wav');
    // "Go" Audio will play after 3 second delay
    startAudio.play ();
    let timerInterval = setInterval(function (){
      timerApp.displayTimerMinutes(timer); 
      timer -= 1; 
      
      timeToBreak += 1; 
      if (timeToBreak === timerApp.settings.setDuration && timer > 0) {
        timeToBreak = -5 ; 
        timerApp.breakTimer (); 
      }
      // When timer reaches 0, stop timer countdown
      if (timer === 0) {
          clearInterval(timerInterval);
          timerApp.displayTimerMinutes(timer);
      }

      // Pause button
      // if paused start the timer 
      // if timer is counting down, pause time 
    }, 1000)
  } ,3000)
}

// 4. Create a variable to store the function of the break countdown timer 
timerApp.breakTimer = () => {
  // Break Timer will start at 5 seconds 
  let timer = timerApp.settings.breakDurationSets; 
  $('#breakTimer').addClass('lightUpTotal');
  const breakAudio = new Audio ('./assets/5-sec-countdown.wav');
  // 5 second countown audio will play when break timer is called (Started)
  breakAudio.play ();
  // Display the number 5 on the DOM specifically in the span with the class of "breakCountdown". 
  $('.breakCountdown').text(timer);
  // Start counting down
  let timerInterval = setInterval(function (){
    console.log('break tick')
    timer = timer - 1; 
    // Display the number counting down
    $('.breakCountdown').text(timer);
    // When the break timer reaches 0, stop countdown
    if (timer === 0) {
        clearInterval(timerInterval);
        // Remove border when at zero
        $('#breakTimer').removeClass('lightUpTotal');
        // Continue to display the number to the DOM even if it is 0 
        $('.breakCountdown').text(timer);
    }
  }, 1000)
}
