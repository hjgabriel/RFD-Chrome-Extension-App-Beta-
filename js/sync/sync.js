function save(current_array,new_array,fav_array) {  
	save_current_array(current_array); //current.js
	save_new_array(new_array); //new.js
	save_fav_array(fav_array); //favourite.js
}

function load() {
	load_current(); //current.js
	load_new(); //new.js
	load_favourites(); //favourite.js
}

//Show which Div is the active class
function load_Active_Div(){
	chrome.storage.sync.get({ActiveDiv:"#current"}, function (result) {
    		var href = result.ActiveDiv;
    		console.log(href);
    		
    		//console.log($("ul#nav li:nth-child(1)"));
			if(href == "#current"){
				$("ul#nav li:nth-child(1)").addClass('active');
			}else if(href == "#new"){
				$("ul#nav li:nth-child(2)").addClass('active');
			}else{
				$("ul#nav li:nth-child(3)").addClass('active');
			}

			$("div"+href).addClass('active');
	});
}