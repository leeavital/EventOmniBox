EventOmniBox
============

A javascript tool used to get information about events from a single text-box.



Usage
=====


    var obox = new OmniBox(document.body);
    obox.setInputAttributes({
		className: "primary-input", // css id
		somedata: "data" // this will go into dataset
    });
    obox.setEventChange(function(event){
		// do something with the event.
    })



Authors
-------

+ Lee Avital