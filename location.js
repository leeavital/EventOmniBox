/**
 * generic class used to represent locations--contains nothing but the string representation of 
 * the location right now.
 */
function Location(loc){
	this.location = null;
	
	if(loc != undefined){
		this.location = loc;
	}

	this.toString = function(){
		return this.location;
	}
}
