Parse.Cloud.afterSave("Player", function(request) {
	var player = request.object;
	if(!player.existed()) {
		// It is newly created
	  player.get("team").fetch().then(function(team) {
		  team.increment("playerCount", 1);
		  team.save();
	  });
	}
});

Parse.Cloud.afterDelete("Player", function(request) {
	var player = request.object;
	if(player.existed()) {
	  player.get("team").fetch().then(function(team) {
		  team.increment("playerCount", -1);
		  team.save();
	  });
	}
});