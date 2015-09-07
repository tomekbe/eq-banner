var container;
var bgExit;

var isFinished  = false;

var isComplianceShown = false;
var isExit = false;








//Function to run with any animations starting on load, or bringing in images etc
init = function() {
	
	//Assign All the elements to the element on the page
	container = document.getElementById('container_dc');


	bgExit = document.getElementById('background_exit_dc');
	vidContainer = document.getElementById('video_container_dc');
	vid = document.getElementById('video_dc');
	vidPlayBtn = document.getElementById('video_control_play_dc');
	vidReplayBtn = document.getElementById('video_control_replay_dc');
	
	readmore  = document.getElementById('read-more');
	cta_start = document.getElementById('start-cta');

	comp =document.getElementById('compliance-copy');
	compB = document.getElementById('compliance-text-B');
	compA = document.getElementById('compliance-text');


	//Bring in listeners i.e. if a user clicks or rollsover
	addListeners();
	addVideoTracking();
	
	//Show Ad
	container.style.display = "block";
	vidPlayBtn.style.display = 'block';

	
	vid.play();


	 TweenLite.to(comp, 1 , {  y:"-50px", delay:0.5,   z: 0.1,  rotationZ: 0.01, ease:Power2.easeInOut, force3D:true, onComplete:function () {

                    }
                });
}



//Add Event Listeners
addListeners = function() {
	
	bgExit.addEventListener('click', bgExitHandler, false);
	vidPlayBtn.addEventListener('click', pausePlayHandler, false);
	vid.addEventListener('ended', videoEndHandler, false);	
	vid.addEventListener('timeupdate', videoTimeUpdate, false);
	readmore.addEventListener('click', readMoreClicked, false);
	vidReplayBtn.addEventListener('click', replayHandler, false);
}

//Add Video Metrics to the HTML5 Video Elements by Loading in Video Module, and assigning to Videos
addVideoTracking = function() {
	//Add in the Video Files - These are 3 different codecs due to different browser specifications - we recommend you have all 3 filetypes. type="video/mp4"
	/*vid.innerHTML='<source id="video_1_mp4_src_dc" type="video/mp4" src="'+Enabler.getUrl("converted/ballon.mp4")+'" />'+
                   '<source id="video_1_ogg_src_dc" type="video/ogg" src="'+Enabler.getUrl("converted/ballon.ogv")+'" />'+
                   '<source id="video_1_webm_sr_dcc" type="video/webm" src="'+Enabler.getUrl("converted/ballon.webm")+'" />';*/

         	var mp4_file = document.createElement("source");
   				mp4_file.setAttribute("id", "mp4_file_id");
       			mp4_file.setAttribute("type", "video/mp4");
       			mp4_file.setAttribute("src", Enabler.getUrl("converted/ballon.mp4"));
			
			var ogg_file = document.createElement("source");
   				ogg_file.setAttribute("id", "stylesheet");
       			ogg_file.setAttribute("type", "video/ogg");
       			ogg_file.setAttribute("src", Enabler.getUrl("converted/ballon.ogv"));

       		var webm_file = document.createElement("source");
   				webm_file.setAttribute("id", "stylesheet");
       			webm_file.setAttribute("type", "video/webm");
       			webm_file.setAttribute("src", Enabler.getUrl("converted/ballon.webm"));


       			vid.appendChild(mp4_file); vid.appendChild(ogg_file); vid.appendChild(webm_file);
	Enabler.loadModule(studio.module.ModuleId.VIDEO, function() {
							studio.video.Reporter.attach('video_1', vid);
							});

}


bgExitHandler = function(e) {
	//Call Exits
	Enabler.exit('Clickthrough_EVENT');
	Enabler.counter("EVENT_VIDEO_STOP");
	//set video's first frame
	
	// reset on Exit Handler
	vid.currentTime = 99999;

	showReplay();

	isFinished  = true;
	isExit= true;
	//isComplianceShown = true;

	vid.pause();
	 
	
	
}


pausePlayHandler = function(e) {
	//alert(e);
	if (vid.paused) {
		if(!isFinished) {
			vid.play();
		}
		//Show Pause button and hide Play button
		//vidPauseBtn.style.display = 'block';
		//vidPlayBtn.style.display = 'none';
		vid.volume == 1.0;
	} else {
		//If not paused then Pause
		vid.pause();
		//Show Play button and hide Pause button
		//vidPauseBtn.style.display = 'none';
		//vidPlayBtn.style.display = 'block';
	}
}



stopHandler = function(e){

	Enabler.counter("EVENT_VIDEO_STOP");
	//set video's first frame
	vid.currentTime = 0;
	//Pause film
	vid.pause();
	//Show required buttons
	vidPauseBtn.style.display = 'none';
	vidPlayBtn.style.display = 'block';
	
	
	
}

replayHandler = function(e) {

	reset();
	//Play film
	vid.play();
	//Turn sound on
	vid.volume = 1.0;
	//Show required buttons
	//vidPauseBtn.style.display = 'block';
	//vidMuteBtn.style.display = 'block';
	


}

videoEndHandler = function(e) {

	//vid.currentTime = 26;
	vid.pause();
	
	//vidPauseBtn.style.display = 'none';
	//vidPlayBtn.style.display = 'block';
	
	
	isFinished = true;

	

	 TweenLite.to(cta_start, 0.6 , {  opacity:100, delay:0,   z: 0.1,  rotationZ: 0.01, ease:Power2.easeInOut, force3D:true, onComplete:function () {
	 				
                    }
                });
    	showReplay();


}

showReplay = function () {

	vidReplayBtn.style.display="block";
	vidReplayBtn.style.opacity = 0;
	TweenLite.to(vidReplayBtn, 0.6 , {  opacity:100, delay:0,   z: 0.1,  rotationZ: 0.01, ease:Power2.easeInOut, force3D:true, onComplete:function () {
	 				
                    }
                });
}


reset = function () {
	// resets the 
	vid.currentTime = 0;
	isFinished = false;
	
	// hides the cta button 
	TweenLite.to(cta_start, 0.3 , {  opacity:0, delay:0,   z: 0.1,  rotationZ: 0.01, ease:Power2.easeInOut, force3D:true, onComplete:function () {}}) ;
}

videoTimeUpdate = function (e) {

	//console.log(e.explicitOriginalTarget.currentTime);
	//console.log(e.target.currentTime);

	// check if it is in the middi

	if (e.target.currentTime>=0 && e.target.currentTime<=0.3) {
			// hide the playback button 
			vidPlayBtn.style.display = 'none';
			vidReplayBtn.style.display="none";
	}

	// check if it is in the middle
	if (e.target.currentTime>=12 && e.target.currentTime<=12.3 ) {

	
		compA.innerHTML = "The extent and value of any<br> SIPP tax benefits will vary.";
		compB.innerHTML = "The extent and value of any SIPP tax benefits will vary according to circumstances. All taxation rules may change. If your employer's pension scheme options change you may wish to review your financial situation. You cannot access your pension, in general, till age 55.";
	}	


}

readMoreClicked  = function () {
	//console.log("read More clicked", comp.style.y);

	if (isComplianceShown==false) {

				 compA.style.display ="none";
				 TweenLite.to(comp, 0.6 , {  y:"-250px", delay:0,   z: 0.1,  rotationZ: 0.01, ease:Power2.easeInOut, force3D:true, onComplete:function () {
				 					isComplianceShown = true;
				 					readmore.innerHTML ="Close >";
				 					pausePlayHandler();
			                    }
			     });

	} else if (isComplianceShown== true) {
				 
				 compA.style.display ="block";
				 TweenLite.to(comp, 0.6 , {  y:"-50px", delay:0,   z: 0.1,  rotationZ: 0.01, ease:Power2.easeInOut, force3D:true, onComplete:function () {
			 					isComplianceShown = false;
			 					readmore.innerHTML ="More info >";
			 					pausePlayHandler();

		                    }
		          });
	}
}

// Initialise everything 


  if(Enabler.isVisible()) {
 	 alert("is visible")
  } else {
    Enabler.addEventListener(studio.events.StudioEvent.VISIBLE, init);
  } 










