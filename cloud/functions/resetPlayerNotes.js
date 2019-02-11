Parse.Cloud.define("resetPlayerNotes", function(request, response) {
	// Set up to modify user data
	Parse.Cloud.useMasterKey();
	var q = new Parse.Query("Player");
	q.each(function (player) {
		// Update to plan value passed in
		player.set("notes", "");
		return player.save();
	}).then(function () {
		// Set the job's success status
		response.success("Player reset completed successfully.");
	}, function (error) {
		// Set the job's error status
		response.error("Uh oh, something went wrong.");
	});
});