EventOmniBox
============

A javascript tool used to get information about events from a single text-box.



Usage
=====


    // create a new omnibox with the input box in document.body
    var obox = new OmniBox(document.body);
    
    // set some attributes of the input box. These can be build in attributes or 
    //dataset attributes.
    obox.setInputAttributes({
    	className: "primary-input", // css id
    	somedata: "data" // this will go into dataset
    });
    
    
    // give an event handler to the omnibox, this function will execute everytime 
    //the event read by the omnibox changes
    obox.setEventChange(function(event){
    	// do something with the event.
    })

    
    
Authors
-------
+ Lee Avital
