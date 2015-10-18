function GrabDOM(){
	var xhr = new XMLHttpRequest();
	xhr.open("GET", "http://forums.redflagdeals.com/hot-deals-f9/", true);
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4) {
       //handle the xhr response here
	   //console.log(xhr);
	   PostDeals(xhr.responseText); //main.js
	}
}
xhr.send();
}
/*
function getOriginalPostDate(href){
	var xhr = new XMLHttpRequest();
	xhr.open("GET", href, true);
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4) {
       //handle the xhr response here
	   //console.log(xhr);
	   console.log('will it work synchronously?');
	   return xhr.responseText; //main.js
	}
}
xhr.send();
}
*/