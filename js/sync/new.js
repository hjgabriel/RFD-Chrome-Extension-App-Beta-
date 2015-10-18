/*
 ___              
/ __|_  _ _ _  __ 
\__ \ || | ' \/ _|
|___/\_, |_||_\__|
     |__/         
*/
//Chrome.storage does not like storing date()
//https://code.google.com/p/chromium/issues/detail?id=161319
//I will store strings instead and convert them to date when I need to do it

function load_new(){
	chrome.storage.local.get({nData:null}, function (card_list) {
		var N_Info = card_list.nData;
		//console.log(N_Info); 
		if(N_Info){
			//console.log('N_Info Has data');
			N_Info.forEach(function(result){
				post_cards(result,n); //cards.js
			});
		}
	});
}

function save_new_array(new_array){
	chrome.storage.local.set({nData: new_array});
}

function load_new_array(){
	var deferred = $.Deferred();
	chrome.storage.local.get({nData:[]}, function (card_list) {
		var N_Info = card_list.nData;
		//console.log(N_Info); 
		deferred.resolve(N_Info);
	});
	return deferred.promise();
}

//save latest date
function setLatestDate(date){
	var sLast_Date = date.toString();
	chrome.storage.sync.set({Last_Seen: sLast_Date});
}

//cannot save 'date' object, so i have to save it as a string
function getLatestDate(){
	var deferred = $.Deferred();
	
	//var Last_Date = new Date("sept 10, 2014 11:30");
	var Last_Date = new Date();

	//today's deals
	var string_Date = Last_Date.toDateString();
	Last_Date = new Date(string_Date);
	//console.log(Last_Date);
	//end

	var sLast_Date = Last_Date.toString();
	
	chrome.storage.sync.get({
    	Last_Seen: sLast_Date
  	}, function(items) {
		
  		sLast_Date = items.Last_Seen;
		var d = new Date(sLast_Date);
		
		console.log(d);
		deferred.resolve(d);
  	});
	return deferred.promise();
}

/*
 ___      _   _            
| _ )_  _| |_| |_ ___ _ _  
| _ \ || |  _|  _/ _ \ ' \ 
|___/\_,_|\__|\__\___/_||_|
*/

$(document).on('click', ".remove", function(){
	
	//Finds <a>
	var a_tag = $(this).parent().prev();
	//console.log(a_tag[0]);
	//grab thread title <a> tag
	var aTitle = $(a_tag).text();
	//console.log(aTitle);
	
	//grab the href link
	var href = $(a_tag).attr(FindSource);
	//console.log(URLLink);
	
	//make a favourite obj using my object
	var N_Obj = new DataObj(href,aTitle);
	
	chrome.storage.local.get({nData: []}, function (result) {

		var N_List = result.nData;
		var index = isDataObj_equal_Array(N_Obj, N_List);
		//console.log(index);
		if (index > -1) {
			//The second parameter of splice is the number of elements to remove.
    		N_List.splice(index, 1);
    		//console.log(N_List);
    		save_new_array(N_List); //Save the removed array
		}
	});

	//Remove Card from the Div
	var cardDiv = a_tag.parent()[0];
	//console.log(cardDiv);
	$(cardDiv).remove();

});

/*
 ___       _          
|   \ __ _| |_ ___ ___
| |) / _` |  _/ -_|_-<
|___/\__,_|\__\___/__/
*/
function Create_Date(Month,Day,Year,Time){
	var D_String = Month+" "+Day+" "+Year+" "+Time;
	var New_Date = new Date(D_String);
	return New_Date;
}

//Check for new deals by looking at the date and time
// e.g. Started by DrAlex on Aug 13th, 2014 09:23 PM
//I maybe have to force the time limit to be a 1 min limit as I cannot see the seconds of the thread being created
//Only check today's or yesterdays deals. Will ignore deals from 2 days ago
function Date_convert(date){
	var Date_Time = date; //regex? maybe
	var DTArray = Date_Time.split(" ");
	
	while (DTArray.length > 5){
		DTArray.shift();
	}

	var Month = DTArray[0]; //Aug
	var Day = DTArray[1].substr(0,2); //13
	
	//note cases for 1st as in single digit numbers
	if(!isFinite(Day)){
		Day = Day.substr(0,1);
	}
	//console.log(Day);
	var Year = DTArray[2]; //2014
	//console.log(Year);
	var Time = DTArray[3]; //09:23
	
	//if the time is written in am pm, change to 24-hours
	if(DTArray[4] == 'PM' && (parseInt(Time.substr(0,2)) < 12)){
		var convert = parseInt(Time.substr(0,2)) + 12;
		convert = convert.toString();
		Time = convert+Time.substring(2,5);
	}

	//If the time is 12 AM, aka midnight, set the time to 0
	if(DTArray[4] == 'AM' && (parseInt(Time.substr(0,2)) == 12)){
		Time = "00"+Time.substring(2,5);
	}

	var Received_Date = Create_Date(Month,Day,Year,Time); //convert to data object
	//console.log(Received_Date);
	
	return Received_Date;
}

function isDataNewThread(Latest_Date,date){
	//console.log(sLast_Date);
	var Received_Date = Date_convert(date);
	
	if(Latest_Date < Received_Date){
			return 1;
		}else{
			return 0;
		}
	
}

/*
function isOriginialPostNew(cardObj,sLD_Result){
		//console.log(cardObj);
		getOriginalPostDate(cardObj.link);
		return 1;
}
*/