
//Initialize Firebase
var config = {
    apiKey: "AIzaSyAp6Z9M5rl-2eayGr-jg5JShkU_gwdf7-E",
    authDomain: "train-schedule-2c0b1.firebaseapp.com",
    databaseURL: "https://train-schedule-2c0b1.firebaseio.com",
    projectId: "train-schedule-2c0b1",
    storageBucket: "train-schedule-2c0b1.appspot.com",
    messagingSenderId: "702882014142"
  };
  firebase.initializeApp(config);

  var database = firebase.database();


////////////////////////////////Adding an on -click event handler for the add train buttom//////////////////////

  $("#add-Train-btn").on("click", function(event) {
  event.preventDefault();

//////////////////////////////////Variables to catch the value from the input form//////////////////////////////////

  var trName = $("#train-name-input").val();
  var trDestination = $("#destination-input").val();
  var frstTrInput = $("#first-train-input").val();
  var trFreq = $("#frequency-input").val();

/////////////////////////////////////Object newTrain to hold all the above values//////////////////////////////////

  var newTrain = {
  	      			name: trName,
  					destination: trDestination,
  					firsttraininput: frstTrInput,
  					frequency: trFreq

 				 };
 				 console.log(newTrain)
////////////////////////////Pushing the newTrain Object into the database and logging values///////////////////////////////////

 database.ref().push(newTrain);	
 console.log(newTrain.name)		
 console.log(newTrain.destination)
 console.log(newTrain.firsttraininput)
 console.log(newTrain.frequency)	

 }); 

//////////////////////////////////Reading data from the database on reference/////////////////////////////////////////

database.ref().on("child_added", function(childSnapshot, prevChildKey) 
{

  ////////////////////////////////////////Declaring Variables to catch each child value////////////////////////////

  var trName = childSnapshot.val().name;
  var trDestination = childSnapshot.val().destination;
  var frstTrInput = childSnapshot.val().firsttraininput;
  var trFreq = childSnapshot.val().frequency;

  console.log(trName)
  console.log(trDestination)
  console.log(frstTrInput)
  console.log(trFreq)

       
    //////////////////////////////////////////Calculations for the next train arrival time ////////////////////////////

    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(frstTrInput, "hh:mm a").subtract(1, "years");
    console.log(firstTimeConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % trFreq;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = trFreq - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));



/////////////////////Creating a new row to add it to the Train schedule table///////////////////////////////////////
var tr = $("<tr>"); 

////////////////////////////////////////Creating columns for each value //////////////////////////////////////////////

    $("<td>" + trName + "</td>").appendTo(tr);
    $("<td>" + trDestination + "</td>").appendTo(tr);
    $("<td>" + trFreq + "</td>").appendTo(tr);
    $("<td>" + moment(nextTrain).format("hh:mm a") + "</td>").appendTo(tr);
    $("<td>" + tMinutesTillTrain + "min" + "</td>").appendTo(tr);
    

    $("#Train-table").append(tr)





});


