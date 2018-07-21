
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyB4PafYw3Xhw-UcB43vDuRPfOmfoOWMbnE",
    authDomain: "nd-project-dafab.firebaseapp.com",
    databaseURL: "https://nd-project-dafab.firebaseio.com",
    projectId: "nd-project-dafab",
    storageBucket: "nd-project-dafab.appspot.com",
    messagingSenderId: "593354607378"
  }
  

  firebase.initializeApp(config);


// Create a variable to reference the database
var database = firebase.database();

var name = "";
var destination = "";
var startDate = "";
var frequency = "";
var timeDiff = "";


// Capture Button Click
$("#add-user").on("click", function (event) {
  // Don't refresh the page!
  event.preventDefault();

  // YOUR TASK!!!
  // Get inputs
  var name = $("#name-input").val().trim();
  var destination = $("#destination-input").val().trim();
  var firstTrain = $("#firstTrain-input").val().trim();
  var frequency = $("#frequency-input").val().trim();
  var firstTimeConverted = moment(firstTrain, "hh:mm").subtract(1, "years"); 
  var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
  var timeRemain = diffTime % frequency;
  var minutesAway = frequency - timeRemain;
  var nextTrain = moment().add(minutesAway, "minutes");
  var nextArrival = moment(nextTrain).format("hh:mm a");

  var markup = "<tr><td>" + name + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + nextArrival + "</td><td>" + minutesAway + "</td></tr>";
  $("tbody").append(markup);

  console.log(name);
  console.log(destination);
  console.log(firstTrain);
  console.log(frequency);
  console.log(firstTimeConverted);
  console.log(diffTime);
  console.log(timeRemain);
  console.log(minutesAway);
  console.log(nextTrain);
  console.log(nextArrival);

  

  // Code in the logic for storing and retrieving the most recent user.

  // Don't forget to provide initial data to your Firebase database.
  database.ref().push({
    name: name,
    destination: destination,
    firstTrainTime: firstTrain,
    frequency: frequency,
    nextArrival: nextArrival,
    minutesAway: minutesAway,
    
  });

});

database.ref().on("child_added", function (childSnapshot) {

console.log(childSnapshot.val());
    
});
// Firebase watcher + initial loader HINT: .on("value")
database.ref().on("value", function (snapshot) {
  $("#train-input").text(snapshot.val().name);
  $("#destination-input").text(snapshot.val().destination);
  $("#firstTrain-input").text(snapshot.val().firstTrain);
  $("#frequency-input").text(snapshot.val().frequency);


}, function (errorObject) {
  console.log("The read failed: " + errorObject.code);
});