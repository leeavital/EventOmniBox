/**
 * DateTime class--used to represent date times.
 */
 function DateTime(){
	this.date; // 1-31;
	this.day; // enum DAYS.*;
	this.month; // enum MONTHS.*
	this.hour;
	this.minute;
	this.merdiam; // enum MERIDIAM.*

	
	
}

// not quite sure if this works
// it needs improvements, because if there is only a day and time it breaks.
// i.e. it never prints Monday at 2:00 P.M.
// also: Friday at 10 doesn't work.
DateTime.prototype.toString = function(){
	var str = "";
	var time; 
	var strdate;
	
	if(this.hour != undefined){
		time =  this.hour;
		if(this.minute != undefined){
			time += ":" + this.minute
		}
		if(this.meridiam != undefined ){
			time += " " + this.meridiam.name;
		}
	}
	
	if(this.month != undefined  && this.date != undefined ){
		strdate = this.month.name + " " + this.date
		if(this.day != undefined ){
			strdate = this.day.name + " " + strdate;
		}
	}
	
	
	if(strdate){
		str = strdate;
		if(time){
			str += " at " + time; 
		}
	}else{
		if(time){
			str = time;
		}
	}
	
	return str;
}
