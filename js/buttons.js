//Clear Local Storage Data
//normal button methods won't work: https://developer.chrome.com/extensions/contentSecurityPolicy#JSExecution

function RefreshAll(){
	ResetApp();	//init.js
	GrabDOM();	//grabDOM.js
}

function ClearAll(){
	chrome.storage.local.clear();
	chrome.storage.sync.clear();
	$(favouritesinfo).empty();
	$(newinfo).empty();
}

/*
 _  _          _           _   _            ___           
| \| |__ ___ _(_)__ _ __ _| |_(_)___ _ _   | _ ) __ _ _ _ 
| .` / _` \ V / / _` / _` |  _| / _ \ ' \  | _ \/ _` | '_|
|_|\_\__,_|\_/|_\__, \__,_|\__|_\___/_||_| |___/\__,_|_|  
                |___/                            
*/
// for chrome.storage save type= current:0, new:1, fav:2
$(document).on('click', "li", function(){
	
	//console.log(this);
	
	var a_tag = $(this).find('a')[0];
	//console.log(a_tag);

	var href = $(a_tag).attr(FindSource);
	console.log(href);

	chrome.storage.sync.set({ActiveDiv: href});
	document.body.scrollTop = 0;
});
