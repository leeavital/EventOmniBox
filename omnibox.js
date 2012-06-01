

/** 
 * the main class. 
 */
function Omnibox(container){
	
	var debug = function(msg){ console.log("OMNIBOX> " + msg); };
	var _container = container;
	var _input = document.createElement("input");
	var _event = new Event();
	
		
	_input.type = "text";
	_input.placeholder = "Enter Some Details";
	_container.appendChild(_input);
	
	
	/**
	 * parse the input message and return an object containing information about the event
	 * this works by splitting the input by articles like at, from, to, on etc. and then parsing each of those tokens individually.
	 */
	var _parse = function(input){
		debug("parsing: " + input);
		
		
		if(input == "" ||input == undefined){
			_clear();
		}
		
		// split by articles like at|to|from etc.
		var tokens = input.split(/\bat|to|from|on\b/gi);
		debug("tokens: " + tokens);
		
		// go through all the tokens and interpret them individually.
		for(var t in tokens){
			var token = tokens[t];
			debug("We are parsing the token: " + token);
			_parseToken(token);
		}
		
		
	}
	
	
	
	/**
	 * parse a single token--a token is a single clause containing information about the event.  Then
	 * it puts whatever parsed data is into the event.
	 *
	 * @param clause the clause containing information about the event.
	*/
	var _parseToken = function(clause){
		
		// look for time in the form d:dd
		time = clause.match(/(\d{1,2}:\d\d)|((A|P)(\.)?M)/);
		if(time){
			debug("found a match for time!");
			
			// get the time by searching for a regexp \d\d:\d\d
			time = time[0].match(/\d{1,2}:\d\d/);
			if(time){
				try{
					time = time[0];
					hr_min = time.split(":");
					hour = parseInt(hr_min[0]);
					min = parseInt(hr_min[1]);
					debug("parsed the hour:minute to be: " + hour + ":" + min); 
					_event.datetime.hour = hour;
					_event.datetime.minute = min;
				}catch(e){
					debug("there was an error in parsing the time");
				}
				
			}
			
			// get the meridian
			
		}
	
	
	};
	
	/** 
	 * get te input text 
	 */
	_getInput = this.getInput = function(){
		return _input.value;
	}
	
	/**
	 * clear any data already gathered by the omnibox. 
	 */
	var _clear = function(){
		_event = new Event();
	}

	
	
	
	
	var _getEvent = this.getEvent = function(){
		return _event;
	}
	
	
	
	
	_input.onkeyup = function(){
		_parse(_getInput());
	};
	
	
	
	
	
	
}



function Event(){

	this.name; // string
	this.datetime = new DateTime(); // DateTime();
	this.location; // Location();
	this.tags = []; // array of random words we don't know what to do with.
	this.murmer; // int
}



function DateTime(){
	this.date; // 1-31;
	this.day; // DAYS.*;
	this.month; // MONTHS.*
	this.hour;
	this.minute;
	this.merdiam; // MERIDIAM.*
}



// enum for days.
var DAYS = {
	MONDAY: {name: "monday", value: 0, code: "M"},
	TUESDAY: {name: "tuesday", value: 1, code: "T"},
	WEDNESDAY: {name: "wednesday", value: 2, code: "W"},
	THURSDAY: {name: "thursday", value: 3, code: "TH"},
	FRIDAY: {name: "friday", value: 4, code: "F"},
	SATURDAY: {name: "saturday", value: 5, code: "S"},
	SUNDAY: {name: "sunday", value: 6, code: "SUN"}
}

var MONTHS = {
	JANUARY: {name: "january", code: 0},
	FEBRUARY: {name: "february", code: 1},
	MARCH: {name: "march", code: 2},
	APRIL: {name: "april", code: 3},
	MAY: {name: "may", code: 4},
	JUNE: {name: "june", code: 5},
	JULY: {name: "july", code: 6},
	AUGUST: {name: "august", code: 7},
	SEPTEMBER: {name: "september", code: 8},
	OCTOBER: {name: "october", code: 9},
	NOVEMBER: {name: "november", code: 10},
	DECEMBER: {name: "december", code: 11}
}

var MERIDIAN = {
	AM: { name: "ante meridian", code: 0 },
	PM: { name: "post meridiam", code: 1 }
}