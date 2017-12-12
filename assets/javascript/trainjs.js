  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyB9TAZBeWi2OV2i-CpS09Wuo--UQ0d5ihA",
    authDomain: "my-first-firebase-database.firebaseapp.com",
    databaseURL: "https://my-first-firebase-database.firebaseio.com",
    projectId: "my-first-firebase-database",
    storageBucket: "my-first-firebase-database.appspot.com",
    messagingSenderId: "864506111368"
  };
  firebase.initializeApp(config);
let database = firebase.database()
let trainDatabase = database.ref("trainData")
let newTrainData = trainDatabase.push()

// Submit on click button
$("#submitButton").on("click", function (event) {
	event.preventDefault();
	let name = $('#trainName').val().trim();
	let dest = $('#destination').val().trim();
	let firstT = $('#firstTrain').val().trim();
	let runs = $('#runFrequency').val().trim();
	let newFirstT = moment(firstT, "hh:mm a")
	let newRuns = moment({minutes:runs})
	// let nextT = newFirstT + newRuns
	
	// //code for running time variables through momentjs
	// let newStart = moment(start, "YYYY-MM-DD");
 //    let monthsWorked = (moment(newStart).diff(moment(), "months"));
 //    monthsWorked *= -1
	
	

	//getting the dataObject and pushing it to firebase
	let trainDataObject = {
		trainName: name,
		trainDest: dest,
		firstTrain: newFirstT,
		runFreq: newRuns,
		// minutesAway: ,
		// nextTrain: firstT + ,
		dateAdded: firebase.database.ServerValue.TIMESTAMP
	}
	newTrainData.set(
	{
		trainObj: trainDataObject
	});
	console.log(trainDataObject)
});
	database.ref("trainData").on("child_added", function(childSnapshot) {
		console.log(childSnapshot.val())

		let tableName = (childSnapshot.val().trainObj.trainName);
		let tableDest = (childSnapshot.val().trainObj.trainDest);
		let tableFirst = (childSnapshot.val().trainObj.firstTrain);
		let tableFreq = (childSnapshot.val().trainObj.runFreq);

      // full list of items to the well
      $("#dataWrapper").append("<tr>" + "<td>" + tableName + "</td>" + "<td>" + tableDest + "</td>" + "<td>" + tableFirst + "</td>" + "<td>" + tableFreq + "</td>" + "<td>" + tableNext + "</td>" + "<td>" + tableMin + "</td>" + "</tr>");

    // Handle the errors
    }, function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
    });