//Produces Card UI with information
// Needs target='_blank' to open link in new tab

//link is the link of the thread
//title is the title of the thread
//type is what kind of card is it: current, new or favourites
//FavType shows whether the item is favourite or unfavourite
function make_cards(link,title,type,FavType){
	
	//Change the name/icon of the favourite button depending on which one FavType it is
	var ButtonName = "Favourite";
	var buttonDivName = 'favourite';
	if(FavType){
		ButtonName = "UnFavourite";
		buttonDivName = 'unfavourite';
	}
	
	if(type == c){
		return "<div class='card'>\
			<a href="+link+" target='_blank'>"+title+"</a>\
			<div class='card-actions'>\
					<button class='btn "+buttonDivName+"'>"+ButtonName+"</button>\
			</div>\
		</div>";
	}else if(type == n){
		return "<div class='card'>\
			<a href="+link+" target='_blank'>"+title+"</a>\
			<div class='card-actions'>\
					<button class='btn "+buttonDivName+"'>"+ButtonName+"</button>\
					<button class='btn remove'>Remove</button>\
			</div>\
		</div>";
	}else{
		return "<div class='card'>\
			<a href="+link+" target='_blank'>"+title+"</a>\
			<div class='card-actions'>\
					<button class='btn "+buttonDivName+"'>"+ButtonName+"</button>\
			</div>\
		</div>";
	}
}

// Post info onto the div (cards)
//inputs an array of objects that I made
function post_cards(data,type){
	var card = make_cards(data.link,data.title,type,data.isFav);
	if(type == c){
		$(currentinfo).append(card);
	}else if(type == n){
		$(newinfo).prepend(card);
	}else{
		$(favouritesinfo).prepend(card);
	}
}

function Display_Cards(current_array,new_array,fav_array){
	//console.log('does it work');

	// remove if the new deal array is too large
	
	while(new_array.length > 20){
		new_array.shift();
	}

	for(i = 0; i < current_array.length; i++){
		var curObj = current_array[i];
		post_cards(curObj,c);
	}

	for(i = 0; i < new_array.length; i++){
		var newObj = new_array[i];
		post_cards(newObj,n);
	}

	for(i = 0; i < fav_array.length; i++){
		var favObj = fav_array[i];
		post_cards(favObj,f);
	}
	
}