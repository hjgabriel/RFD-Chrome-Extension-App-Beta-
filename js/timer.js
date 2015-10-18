function startTimer(){
	$.when(load_options()).done(function(refreshinterval){
		var intRefresh = parseInt(refreshinterval);
		console.log(refreshinterval);
		//for testing
		//intRefresh = 0.1;
		if(refreshinterval != 'Never'){
			chrome.alarms.create('timer', {periodInMinutes: intRefresh});
		}
	});
}

function onAlarm(alarm) {
	console.log('Got alarm', alarm);
	GrabDOM();
	//send to init.js
	chrome.extension.sendMessage({BackgroundSays: "reloadAllDivs"});
}

function load_options(){
	var deferred = $.Deferred();
	chrome.storage.sync.get({
		TimeRefresh: '1',
		DeskNotify: true
	}, function(items) {
		var refreshinterval = items.TimeRefresh;
		deferred.resolve(refreshinterval);
	});
	return deferred.promise();
}