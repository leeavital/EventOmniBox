

/** 
 * the main class. 
 */
function Omnibox(container){
	
	var debug = function(msg){ console.log("OMNIBOX> " + msg); };
	var _container = container;
	var _input = document.createElement("input");
	var _event = new Event();
	var _onEventChange;
	



	_input.type = "text";
	_input.placeholder = "Enter Some Details";
	_container.appendChild(_input);


	// REGULAR EXPRESSIONS.
	// many of these are generic and more specific ones should be generated server side based on location.
	
	// regular expression for an address--matches addresses in the forms:
	// 100 John street 
	// 160 Park Point
	var _rxpAddress = /(\d+)(\s+)([a-zA-Z]+\s?)*/gi;
	
	/**
	 * parse the input message and return an object containing information about the event
	 * this works by splitting the input by articles like at, from, to, on etc. and then parsing each of those tokens individually.
	 */
	var _parse = function(input){		
	

		if(input == "" ||input == undefined){
			_clear();
		}
		
		
		// there's got to be a better solution to this, but at the time
		// old parsed tags stay in the tag list. So "Magic Tournament" has tags:
		//"m", "ma", "mag" etc. without this reset.
		_event.tags = [];

		// split by articles like at|to|from etc.
		var tokens = input.split(/\b(near|at|to|from|on)\b/gi);
		debug("we will parse the tokens " + tokens);
		
		// go through all the tokens and interpret them individually.
		for(var t in tokens){
			var token = tokens[t];
			_parseToken(token);
		}
		
		
		if(typeof _onEventChange == "function"){
			try{
				_onEventChange(_event);
			}
			catch(e){
				debug("there was a problem with oneventchange, either it's method signature does not match: function(Event e), or the function threw an uncaugh exception");
			}
		}
		
		
	}
	
	
	
	/**
	 * parse a single token--a token is a single clause containing information about the event.  Then
	 * it puts whatever parsed data is into the event.
	 *
	 * @param clause the clause containing information about the event.
	*/
	var _parseToken = function(clause){
	
		//debug("parsing the token: " + clause);
		var interpreted = false;
		var timeparsed = false;

		// look for time in the form d:dd
		time = clause.match(/(\d{1,2}:\d\d)/);
		if(time){
			//:debug("found a match for time!");
			wholetime = time[0];
			
			// get the time by searching for a regexp \d\d:\d\d
			time = wholetime.match(/\d{1,2}:\d\d/);
			if(time){
				time = time[0];
				try{
					hr_min = time.split(":");
					hour = parseInt(hr_min[0]);
					min = parseInt(hr_min[1]);
					_event.datetime.hour = hour;
					_event.datetime.minute = min;
				}catch(e){
					debug("there was an error in parsing the time");
				}
				
			}
			interpreted = true;
			timeparsed = true;
		}
		
		
		// look for time in the form of a single number or "noon" or "midnight".
		time = clause.match(/(^\s*(\d|10|11|12)\s*$)|noon|midnight/gi)
		if(time){
			time = time[0];
			//debug("found a time: " + time);
			if(time.toLowerCase() == "midnight"){
				_event.datetime.hour = 12;
				_event.datetime.minute = 0;
				_event.datetime.meridiam = MERIDIAM.AM;
			}
			else if(time.toLowerCase() == "noon"){
				_event.datetime.hour = 12;
				_event.datetime.minute = 0;
				_event.datetime.meridiam = MERIDIAM.PM;
			}else{
				time = parseInt(time);
				_event.datetime.hour = time;
			}
			interpreted = true;
			timeparsed = true;
		}
		
		
		// get the meridiam.
		meridiam = clause.match(/\s(A|P)(\.)?M\s?/i);
		if(meridiam){
			//debug("matched a meridiam");
			meridiam = meridiam[0];
			if(meridiam.match(/A(\.)?M(\.)?/i)){
				_event.datetime.meridiam = MERIDIAM.AM;
			}
			else if(meridiam.match(/P(\.)?M(\.)?/i)){
				_event.datetime.meridiam = MERIDIAM.PM;
			}
			
			interpreted = true;
			timeparsed = true;
		}
		
		
		// get the day (mon-sun)
		day = clause.match(/monday|tuesday|wednesday|thrusday|friday|saturday|sunday|mon|tues|wed|thurs|fri|sat|sun/gi);
		if(day){
			day = day[0];
			//debug("we found a day: " + day);
			
			if(day.match(/mon(day)?/gi)){
				_event.datetime.day = DAYS.MONDAY;
			}else if(day.match(/tues(day)?/gi)){
				_event.datetime.day = DAYS.TUESDAY;
			}else if(day.match(/wednes(day)?/gi)){
				_event.datetime.day = DAYS.WEDNESDAY;
			}else if(day.match(/thurs(day)?/gi)){
				_event.datetime.day = DAYS.THURSDAY;
			}else if(day.match(/fri(day)?/gi)){
				_event.datetime.day = DAYS.FRIDAY;
			}else if(day.match(/satur(day)?/gi)){
				_event.datetime.day = DAYS.SATURDAY;
			}else if(day.match(/sun(day)?/gi)){
				_event.datetime.day = DAYS.SUNDAY;
			}
			interpreted = true;
			timeparsed = true;
		}
		
		
		// get the month;
		monthdate = clause.match(/(jan(uary)?|feb(ruary)?|mar(ch)?|apr(ril)?|may|june|jul(y)?|aug(ust)?|sep(tember)?|oct(ober)?|(nov|dec)(ember)?)((\s)+(the)?(\s)*(\d{1,2}))?/gi);
		if(monthdate){
			month = monthdate[0];
			
			if(month.match(/jan(uary)?/gi)){
				_event.datetime.month = MONTHS.JANUARY;
			}else if(month.match(/feb(ruary)?/gi)){
				_event.datetime.month = MONTHS.FEBRUARY;
			}else if(month.match(/mar(ch)?/gi)){
				_event.datetime.month = MONTHS.MARCH;
			}else if(month.match(/may/gi)){
				_event.datetime.month = MONTHS.MAY;
			}else if(month.match(/jun/gi)){
				_event.datetime.month = MONTHS.JUNE;
			}else if(month.match(/apr(il)?/gi)){
				_event.datetime.month = MONTHS.APRIL;
			}else if(month.match(/jul(y)?/gi)){
				_event.datetime.month = MONTHS.JULY;
			}else if(month.match(/aug(ust)?/gi)){
				_event.datetime.month = MONTHS.AUGUST;
			}else if(month.match(/sep(tember)??/gi)){
				_event.datetime.month = MONTHS.SEPTEMBER;
			}else if(month.match(/oct(ober)?/gi)){
				_event.datetime.month = MONTHS.OCTOBER;
			}else if(month.match(/nov(ember)?/gi)){
				_event.datetime.month = MONTHS.NOVEMBER;
			}else if(month.match(/dec(ember)?/gi)){
				_event.datetime.month = MONTHS.DECEMBER;
			}
			
			
			
			date = month.match(/(\d){1,2}/);
			if(date){
				date = date[0];
				//debug("found a date: " + date);
				try{
					date = parseInt(date);
				}catch(e){
					debug("it couldn't be parsed!");
				}
				_event.datetime.date = date;
			}
			interpreted = true;
			timeparsed = true;
		}


		date = clause.match(/(\d{1,2})(th|st|nd|rd)/i);
		if(date){
			date = date[0];
			//debug("found a date: " + date);
			date = date.match(/\d{1,2}/)[0];
			_event.datetime.date = parseInt(date);

			interpreted = true;
			timeparsed = true;
		}

		if(timeparsed){
			return;
		}
	

		address = clause.match(_rxpAddress);
		if(address){
			//debug("found an address: " + address)
			address = address[0];
			_event.location.location = address;
			
			interpreted = true;
		}
	
	
		// if there were no matches, add it to the tags.
		if(!interpreted){
			_event.tags.push(clause);
		}
	};
	
	/** 
	 * get the input text 
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
	
	
	
	this.setEventChange = function(e){
		_onEventChange = e;
	}
	

	this.setInputAttributes = function(attributes){
		
		for(attr in attributes){
			if(attr in _input){
				_input[attr] = attributes[attr];
			}else{
				_input.dataset[attr] = attributes[attr];
			}
		}
	}
	
	_input.onkeyup = function(){
		_parse(_getInput());
	};
		
}









