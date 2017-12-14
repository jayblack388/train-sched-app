  // Initialize Firebase
  let config = {
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

	//getting the dataObject and pushing it to firebase
	let trainDataObject = {
		trainName: name,
		trainDest: dest,
		firstTrain: firstT,
		runFreq: runs,
		dateAdded: firebase.database.ServerValue.TIMESTAMP
	}
	trainDatabase.push(
	{
		trainObj: trainDataObject
	});
	console.log(trainDataObject)
    $('.form-control').val('')

});
	database.ref("trainData").on("child_added", function(snapshot) {
		console.log(snapshot.val())

		let tableName = (snapshot.val().trainObj.trainName);
		let tableDest = (snapshot.val().trainObj.trainDest);
		let tableFirst = (snapshot.val().trainObj.firstTrain);
		let tableFreq = (snapshot.val().trainObj.runFreq);
		let tFrequency = tableFreq;

        // Time is set
        let firstTime = tableFirst;

        // First Time (pushed back 1 year to make sure it comes before current time)
        let firstTimeConverted = moment(firstTime, "hh:mm").subtract(1, "years");
        // console.log(firstTimeConverted);

        // Current Time
        let currentTime = moment();
        // console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

        // Difference between the times
        let diffTime = moment().diff(moment(firstTimeConverted), "minutes");
        // console.log("DIFFERENCE IN TIME: " + diffTime);

        // Time apart (remainder)
        let tRemainder = diffTime % tFrequency;
        // console.log(tRemainder);

        // Minute Until Train
        let tMinutesTillTrain = tFrequency - tRemainder;
        // console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

        // Next Train
        let nextTrain = moment().add(tMinutesTillTrain, "minutes");
        nextTrain = moment(nextTrain).format("HH:mm");
        // console.log("ARRIVAL TIME: " + nextTrain);
          // full list of items to the well
          //$("#dataWrapper").append("<tr>" + "<td>" + tableName + "</td>" + "<td>" + tableDest + "</td>" + "<td>" + tableFreq + "</td>" + "<td>" + nextTrain + "</td>" +"<td>" + tMinutesTillTrain + "</td>" +  "</tr>");
            let row = $("<tr>");

            let html = "<td>" + tableName + "</td>";
            html += "<td>" + tableDest + "</td>";
            html += "<td>" + tableFreq + "</td>";
            html += "<td>" + nextTrain + "</td>";
            html += "<td>" + tMinutesTillTrain + "</td>";
            row.html(html);
            $("#dataWrapper").append(row);
    }, 
    // Handle the errors
    function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
    });
