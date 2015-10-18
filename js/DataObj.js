//Creating my own object
//http://stackoverflow.com/questions/15742442/declaring-array-of-objects
//http://stackoverflow.com/questions/20606456/whats-the-recommended-way-of-creating-objects-in-nodejs
//http://www.nczonline.net/blog/2009/04/13/computer-science-in-javascript-linked-list/
var DataObj = function (link,title,favourited) {
	this.link = link;
	this.title = title;
	this.isFav = favourited;
};

//Compares DataObj with the Arrays of DataObj
function isDataObj_equal_Array(obj, list){
	//console.log(list.length);
	//console.log("obj.link: " + obj.link);
	//console.log("list.length: " + list.length);
	
	for (j = 0; j < list.length; j++){
		
		if(obj.link == list[j].link){
			//console.log(obj.link);
			//console.log(list[i].link);
			//console.log(Number(i));
			return j;
		}
	}
	
	//console.log("after loop");
	return -1;
}