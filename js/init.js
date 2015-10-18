//Just some Variables that I need
var Main_Div = ".tab-content"; // Name of the div that contains current, new and favourites divs

var currentinfo = "#currentinfo"; // Name of the div for current rfd card information
var newinfo = "#newinfo"; // Name of the div for new rfd card information
var favouritesinfo = "#favouritesinfo"; // Name of the div for favourite rfd card information

var c = 0,n = 1,f = 2; //placeholders for current, new and favourite

//In order to open URL in a new tab
$(document).ready(function(){
	chrome.browserAction.setBadgeText({text:""});
	load_Active_Div(); //sync.js
	load(); //sync.js

	//Restore scroll position
	//Let document.body.scrollTop = 0 first. Then, set the scrollTop back to the last scroll position
    setTimeout(function(){
    	chrome.storage.sync.get({ScrollData:0}, function (result) {
    		var ScrollData = result.ScrollData;
			//console.log(ScrollData); 
			//console.log('ScrollData Has data');
			document.body.scrollTop = ScrollData;
		});
    },100);

    //buttons
    document.getElementById('refresh').addEventListener('click', RefreshAll); //buttons.js
	document.getElementById('Clear').addEventListener('click', ClearAll);   //buttons.js

	//message from timer.js
	chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.BackgroundSays == "reloadAllDivs"){
    	$.when(load_current_array(),load_new_array(),load_fav_array()).done(function(current_array,new_array,fav_array){
    		RefreshApp(current_array,new_array,fav_array);
    	});
    }
 });
});

// http://www.kammerl.de/ascii/AsciiSignature.php  Great site for making ascii text like the one below

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

//function used to reset everything to default
function ResetApp(){
	$(currentinfo).empty();
	
	var DefaultContainer = "\
	<div class='Loading'>\
		<span>Loading... </span>\
		<img src='images/loadingLarge.gif'/>\
	</div>";
	$(Main_Div).prepend(DefaultContainer);
	$(favouritesinfo).empty();
	$(newinfo).empty();
}

function RefreshApp(current_array,new_array,fav_array){
	ResetApp();

	Display_Cards(current_array,new_array,fav_array); //cards.js
	$( ".Loading" ).remove();
}

/*
 ___                _  _  _             
/ __| __  _ _  ___ | || |(_) _ _   __ _ 
\__ \/ _|| '_|/ _ \| || || || ' \ / _` |
|___/\__||_|  \___/|_||_||_||_||_|\__, |
                                  |___/ 
								  
All related to scrolling Movements and position
*/

//Save Scroll Position
document.addEventListener('scroll', function(){
	//console.log(document.body.scrollTop);
	chrome.storage.sync.set({ScrollData: document.body.scrollTop});

	//Make the nav-bar fixed to top after scrolling
	$('#nav-wrapper').height($("#nav").height());
	$('#nav').affix({
        offset: { top: $('#nav').offset().top }
    });
});
