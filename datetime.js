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
	
	
	str = "";
	str += "Day: " +   ((this.day != undefined) ? this.day.name : "not yet given") + "\n";
	str += "Month: " + ((this.month != undefined) ? this.month.name : "not yet given") + "\n";
	str += "Date: " +  ((this.day != undefined) ? this.date : "not yet given") + "\n";
	str += "Hour: " +  ((this.hour != undefined) ? this.hour : "not yet given") + "\n";
	str += "Minute: " +((this.minute != undefined) ? this.minute : "not yet given") + "\n";
	str += "Meridiam: " +((this.meridiam != undefined) ? this.meridiam.name : "not yet given") + "\n";


	return str;
	/* This fancy toString is commented out because it isn't really useful for debuging. 
	var str = "";
	var time = ""; 
	var strdate = "";
	
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
		
	}

	if(this.day != undefined ){
		strdate = this.day.name + " " + strdate;
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
	*/
}
