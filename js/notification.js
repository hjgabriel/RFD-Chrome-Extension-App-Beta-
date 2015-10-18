/*
Currently, normal priority notifications (0) are displayed for 7 seconds,
higher priority (1 and 2) are displayed for 25 seconds.
*/
function Create_Notification(cardObj,notID){
	chrome.notifications.create(cardObj.link,{
  	type:'basic',
  	title: 'New Deal!',
  	message:cardObj.title,
  	iconUrl:"images/icon48.png",
  	buttons:[{title:'Open'},{title:'Dismiss'}],
  	priority: 2
	},creationCallback);

	//buttons:[{title:'Add to Favourites'},{title:'Open & Favourite'},{title:'Dismiss'}],
}

//Remove the card on the desktop after 10 seconds
function creationCallback(notID) {
	chrome.browserAction.setBadgeText({text:"New"});
	//console.log("Succesfully created " + notID + " notification");
	/*
	setTimeout(function() {
		ClearNotifier(notID);
	}, 25000);
	*/
}

function notificationClicked(notID) {
	
	chrome.tabs.create({url: notID},ClearNotifier(notID));

	/*
	$.when(load_new_array()).done(function(new_array){
		var IDNumber = parseInt(notID);
		var openurl = new_array[IDNumber].link;
		//chrome.tabs.create({url: openurl});
		chrome.tabs.create({url: openurl},ClearNotifier(notID));
	});
	*/
}

function notificationRemove(notID){
	ClearNotifier(notID);
}

function notificationBtnClick(notID, iBtn) {
	console.log("The notification '" + notID + "' had button " + iBtn + " clicked");
	if(iBtn == 0){
			notificationClicked(notID);
	}else{
		notificationRemove(notID);
	}

	//Cannot use remove from new div because that would ruin adding as favourite
	//using the current alogorithm


	/*
	$.when(load_current_array(),load_fav_array()).done(function(current_array,fav_array){
		var IDNumber = parseInt(notID);
		var card_Obj = new_array[IDNumber];
		card_Obj.isFav = 1;

		//fav_array
		fav_array.push(card_Obj);

		//current_array
		var index = isDataObj_equal_Array(card_Obj, current_array);
		if(index > -1){
			current_array[index].isFav = 1;
		}

		//new_array
		index = isDataObj_equal_Array(card_Obj, new_array);
		if(index > -1){
			new_array[index].isFav = 1;
		}

		//Currently ignoring new_array
		//save
		//save(current_array,new_array,fav_array);
		save_current_array(current_array); //current.js
		save_fav_array(fav_array); //favourite.js
	});
	*/

	ClearNotifier(notID);
}

function ClearNotifier(notID){
	chrome.notifications.clear(notID, function(wasCleared) {
			console.log("Notification " + notID + " cleared: " + wasCleared);
	});
	chrome.browserAction.setBadgeText({text:""});
}