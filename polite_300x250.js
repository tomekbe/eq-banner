//---                    ---//
//*1 is Enabler Initialised 
window.onload = function(){
  if (Enabler.isInitialized()) {
    enablerInitHandler();
  } else {
    Enabler.addEventListener(studio.events.StudioEvent.INIT, enablerInitHandler);
  }
}

/*isPageLoaded = function(e) {
  if(Enabler.isVisible()) {
 
  } else {
    Enabler.addEventListener(studio.events.StudioEvent.VISIBLE, init);
  } 


}*/

//---               //
//*2 is page loaded 
enablerInitHandler = function(e) {
 if (Enabler.isPageLoaded()) {
    	pageLoadedHandler();
  	 } else {
    	Enabler.addEventListener(studio.events.StudioEvent.PAGE_LOADED,
    	pageLoadedHandler);
  }
}


// function for loading extra scripts and appending them

SMloader = function (f) {

	this.array_links = "";
	this.counter = 0;
	this.callback = f;
}

SMloader.prototype.loadJS = function (src, callback) {
    var s = document.createElement('script');
    s.src = src;
    s.async = false;
    s.onreadystatechange = s.onload = function() {
        var state = s.readyState;
        if (!callback.done && (!state || /loaded|complete/.test(state))) {
            callback.done = true;
            callback();
        }
    };
    document.getElementsByTagName('head')[0].appendChild(s);
}


SMloader.prototype.loadCSS = function(src, callback) {

	
	
	var s = document.createElement("link");
   		s.setAttribute("rel", "stylesheet");
        s.setAttribute("type", "text/css");
       	s.setAttribute("href", src);

    	s.onreadystatechange = s.onload = function() {
        var state = s.readyState;
        if (!callback.done && (!state || /loaded|complete/.test(state))) {
            callback.done = true;
            callback();
        }
    };
    document.getElementsByTagName('head')[0].appendChild(s);

}

SMloader.prototype.loadImage = function(src, callback) {
	
	//stub of the function, for loading images 


}


SMloader.prototype.loaderJS = function (array) {
	//reference to itself;
	var _self = this;
	
	var index;
	var a = array; this.array_links = a;

	for (index = 0; index < a.length; ++index) {
	    
	    this.loadJS(a[index], function() {_self.loadCheck()});

	 
	}
}


SMloader.prototype.loadCheck = function () {
	
	
	console.log(this,"oi",this.counter, this.array_links.length);
	
	this.counter ++;
	if(this.counter ==  this.array_links.length) {
		console.log(this, "the end");
		this.callback();	
		//init();
		
	}

	
	
	console.log(this,"ii",this.counter, this.array_links.length);

	
}

// * loads all the dependancies after the page has been loaded //

pageLoadedHandler = function(e) {

	var l = new SMloader(function() {});



	l.loaderJS(["https://cdnjs.cloudflare.com/ajax/libs/gsap/1.17.0/plugins/CSSPlugin.min.js",
				"https://cdnjs.cloudflare.com/ajax/libs/gsap/1.17.0/easing/EasePack.min.js",
				"https://cdnjs.cloudflare.com/ajax/libs/gsap/1.17.0/TweenLite.min.js",
				"sipp_300x250_banner.js"
				]);

	//"sipp_300x250_banner.js"

	//setTimeout(l.loaderJS(["sipp_300x250_banner.js"]),3000);
	//l.loadCSS("sipp_300x250.css", function() {"it is loaded"});


}



