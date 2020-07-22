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

const timerApp = {};

