
//Just some Variables that I need
var Main_Div = ".tab-content"; // Name of the div that contains current, new and favourites divs

var currentinfo = "#currentinfo"; // Name of the div for current rfd card information
var newinfo = "#newinfo"; // Name of the div for new rfd card information
var favouritesinfo = "#favouritesinfo"; // Name of the div for favourite rfd card information

var c = 0,n = 1,f = 2; //placeholders for current, new and favourite

//-------------------------------------------------------------

document.addEventListener('DOMContentLoaded', function () {
	startTimer();
    chrome.notifications.onClicked.addListener(notificationClicked);
  	chrome.notifications.onButtonClicked.addListener(notificationBtnClick);
  	chrome.alarms.onAlarm.addListener(onAlarm);
});

//-------------------------------------------------------------

/*  _    _  _        _    _                 __                  _    _                
  /_\  | || |  ___ | |_ | |_   ___  _ _   / _| _  _  _ _   __ | |_ (_) ___  _ _   ___
 / _ \ | || | / _ \|  _|| ' \ / -_)| '_| |  _|| || || ' \ / _||  _|| |/ _ \| ' \ (_-<
/_/ \_\|_||_| \___/ \__||_||_|\___||_|   |_|   \_,_||_||_|\__| \__||_|\___/|_||_|/__/                                                                                                          

Doesn't go anywhere else, so I left it here
*/

//need this to make DOM into a readable HTML. Used under Main.js
function toNode(html) {
	var doc = document.createElement('html');
	doc.innerHTML = html;
	return doc;
}

function RefreshApp(current_array,new_array,fav_array){
	ResetApp();

	Display_Cards(current_array,new_array,fav_array); //cards.js
	$( ".Loading" ).remove();
}
