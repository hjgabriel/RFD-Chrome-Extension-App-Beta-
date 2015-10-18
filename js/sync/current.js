//Save Card Data
function save_current_array(current_array){
	chrome.storage.local.set({cData: current_array});
}

//Load Card Data
function load_current(){
	chrome.storage.local.get({cData:null}, function (card_list) {
		var C_Info = card_list.cData;
		//console.log(C_Info); 
		if(!C_Info){
			 //console.log('C_Info has no data');
			 RefreshAll(); //buttons.js
		}else{
			//console.log('C_Info Has data');
			//var CArray = C_Info;
			C_Info.forEach(function(result){
				post_cards(result,c); //cards.js
			});
		}
	});
}

function load_current_array(){
	var deferred = $.Deferred();
	chrome.storage.local.get({cData:[]}, function (card_list) {
		var C_Info = card_list.cData;
		//console.log(C_Info); 
		deferred.resolve(C_Info);
	});
	return deferred.promise();
}