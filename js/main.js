//add fav_array in the $.when.

//List of class names that could change in the future, so for quick changing:
var FindThreads = '.inner.withcategory'; //Grab all the thread information
var FindUser = '.username.understate'; // this class contains date
var FindClassTitle = 'title'; //Class that contain the date information/or link of the thread
var FindSource = 'href'; // grab the href link
var RFD_URL = "http://forums.redflagdeals.com"; //URL Link for RFD
var StickyThread = '.prefix.understate'; //check if the thread is a sticky

function PostDeals(code){
	//console.log(document);
	var node = toNode(code); //turn string into readable html source code
	//console.log(node);

	var t_List = $(node).find(FindThreads).get();  //Has the required information that I need
	//console.log(t_List);
	var current_array = new Array();
	
	$.when(load_new_array(),getLatestDate(),load_fav_array()).done(function(new_array,sLD_Result,fav_array){
		//var new_array = restored_array.slice(); // making duplicate array
		//var old_new_array = new_array.slice();;
		var new_latest_date = sLD_Result;
		var countID = new_array.length;
		var countNew = 1;
		for (i = 0; i < t_List.length; i++) {
			//check if the thread is not a sticky
			var threadObj = t_List[i];
			//console.log(threadObj);
			if(!$(threadObj).find(StickyThread)[0]){
				//Looks for the class named username understate
				var uList = $(threadObj).find(FindUser)[0];
				//console.log(uList);
				
				//grab the date of the thread
				var date = $(uList).attr(FindClassTitle);
				console.log(date);
				var Received_Date = Date_convert(date);
				console.log(Received_Date);
				var cardObj = makeCardObj(threadObj,fav_array);

				if(sLD_Result < Received_Date){

					AddCards(cardObj,new_array);
					Create_Notification(cardObj,countID++); //notification.js
					//console.log(Received_Date);
					
					//Get latest date from new receive date I've seen
					if(new_latest_date < Received_Date){
						new_latest_date = Received_Date;
					}
				}
				//console.log(cardObj);
				AddCards(cardObj,current_array);
			}
		}
		
		console.log("Should come after");
		//console.log(current_array);
		//console.log(new_array);

		$( ".Loading" ).remove();

		//save the new_latest date
		setLatestDate(new_latest_date); //new.js

		//post info on the Div
		Display_Cards(current_array,new_array,fav_array); //cards.js

		save(current_array,new_array,fav_array);
		//console.log(old_new_array);
		//console.log(new_array);
		//log chrome.storage info
		chrome.storage.local.get(function(gabe){console.log(gabe)});
		chrome.storage.sync.get(function(gabe){console.log(gabe)});
	});

}

//Might also need to check for favourites here e.g. makeCardObj(threadObj, fav_list)
function makeCardObj(threadObj,fav_array){
	//Get all the classes with 'title'
	var hList = $(threadObj).find("."+FindClassTitle)[0];
	//console.log(hList);
	
	//grab thread title <a> tag
	var aTitle = $(hList).text();
	//console.log(aTitle);
	
	//grab the href link
	var href = $(hList).attr(FindSource);
	var URLLink =RFD_URL+href;
	//console.log(URLLink);
	var cardObj = new DataObj(URLLink,aTitle,0);

	var index = isDataObj_equal_Array(cardObj, fav_array);

	if(index > -1){
			cardObj.isFav = 1;
	}

	//console.log(cardObj);
	
	return cardObj;
}

// Used to add the following info to the extension
function AddCards(cardObj,array_type){
	array_type.push(cardObj);
}

/*

https://blog.jcoglan.com/2010/08/30/the-potentially-asynchronous-loop/
http://stackoverflow.com/questions/2613310/ive-heard-global-variables-are-bad-what-alternative-solution-should-i-use
http://stackoverflow.com/questions/12359450/javascript-loop-and-wait-for-function
http://stackoverflow.com/questions/14777031/what-does-when-apply-somearray-do
http://stackoverflow.com/questions/13951456/using-deferred-with-nested-ajax-calls-in-a-loop
http://stackoverflow.com/questions/24131480/javascript-wait-for-function-in-loop-to-finish-executing-before-next-iteration
http://stackoverflow.com/questions/13951456/using-deferred-with-nested-ajax-calls-in-a-loop
http://stackoverflow.com/questions/7696747/call-asynchronous-function-inside-for-loop
http://stackoverflow.com/questions/11585742/making-synchronous-call-to-async-function
http://stackoverflow.com/questions/5187968/how-should-i-call-3-functions-in-order-to-execute-them-one-after-the-other
http://stackoverflow.com/questions/21518381/proper-way-to-wait-for-one-function-to-finish-before-continuing
*/
