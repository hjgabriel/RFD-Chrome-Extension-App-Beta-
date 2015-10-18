/*
 ___              
/ __|_  _ _ _  __ 
\__ \ || | ' \/ _|
|___/\_, |_||_\__|
     |__/         
*/
//Get all Favourites data
function load_favourites(){
	chrome.storage.local.get({fData:null}, function (card_list) {
		var F_Info = card_list.fData;
		//console.log(N_Info); 
		if(F_Info){
			//console.log('N_Info Has data');
			F_Info.forEach(function(result){
				post_cards(result,f); //cards.js
			});
		}
	});
}

function save_fav_array(fav_array){
	chrome.storage.local.set({fData: fav_array});
}

function load_fav_array(){
	var deferred = $.Deferred();
	chrome.storage.local.get({fData:[]}, function (card_list) {
		var F_Info = card_list.fData;
		//console.log(F_Info); 
		deferred.resolve(F_Info);
	});
	return deferred.promise();
}

/*
 ___      _   _            
| _ )_  _| |_| |_ ___ _ _  
| _ \ || |  _|  _/ _ \ ' \ 
|___/\_,_|\__|\__\___/_||_|
*/


//This button is the add to favourites
//dunno why only 'document' would only work. I tried "tab-content" but no luck....
$(document).on('click', ".favourite", function(){

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
	var card_Obj = new DataObj(href,aTitle,1);
	
	//change state for current and new obj and save it
	$.when(load_current_array(),load_new_array(),load_fav_array()).done(function(current_array,new_array,fav_array){
		
		fav_array.push(card_Obj);
		//current_array
		//console.log(current_array);
		var index = isDataObj_equal_Array(card_Obj, current_array);
		if(index > -1){
			current_array[index] = card_Obj;
		}
		//new_array
		index = isDataObj_equal_Array(card_Obj, new_array);
		if(index > -1){
			new_array[index] = card_Obj;
		}

		//Displays Card with updated information
		RefreshApp(current_array,new_array,fav_array); //init.js

		//save
		save(current_array,new_array,fav_array);
	});
});

//This button is used to remove favourites
$(document).on('click', ".unfavourite", function(){

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
	var card_Obj = new DataObj(href,aTitle,0);
	
	//change state for current and new obj and save it
	$.when(load_current_array(),load_new_array(),load_fav_array()).done(function(current_array,new_array,fav_array){
		
		//current_array
		//console.log(current_array);
		var index = isDataObj_equal_Array(card_Obj, current_array);
		if(index > -1){
			current_array[index] = card_Obj;
		}
		//new_array
		index = isDataObj_equal_Array(card_Obj, new_array);
		if(index > -1){
			new_array[index] = card_Obj;
		}
		//fav_array
		index = isDataObj_equal_Array(card_Obj, fav_array);
		if(index > -1){
			fav_array.splice(index, 1);
		}


		//Displays Card with updated information
		RefreshApp(current_array,new_array,fav_array); //init.js

		//save
		save(current_array,new_array,fav_array);
	});
});

//isDataFavourited tells if the data exists in the storage.
//Uses isDataObj_equal_Array DataObj.js
//needs to use jquery's deferred and promise as chrome.storage is asynchronous
// http://stackoverflow.com/questions/11585742/making-synchronous-call-to-async-function
function isDataFavourited(href,aTitle){
	var deferred = $.Deferred();
	var cardObj = new DataObj(href,aTitle);
	var F_List = new Array();
	chrome.storage.sync.get({
		Favourite_List: F_List
	}, function(items) {
		F_List = items.Favourite_List;
		
		if(F_List.length == 0){
			//console.log('nothing');
			deferred.resolve(0);
		}else{
			//console.log(isDataObj_equal_Array(cardObj, F_List));
			deferred.resolve(isDataObj_equal_Array(cardObj, F_List));
		}
	});
	return deferred.promise();
}