// settings in local storage
var hostName = "";
var clickFlag = "off";
var storage = chrome.storage.local;

// get the current tab's hostName
function getHostName(target) {

	// check storage
	storage.get('currentHostName', function(items) {

		 // pull current hostName from storage
		if (items.currentHostName) {
	 
			// set the hostName
			hostName = items.currentHostName;							
			
			// handle the blacklist
			editBlacklist(hostName,target);
			
		} else {

			// no hostName, close window		
			window.close();			

		}
	});
}

// get the blacklist
function editBlacklist(hostName,target) {

	// check storage
	storage.get('blacklist', function(items) {

		 // pull current hostName from storage
		if (items.blacklist) {
	 
			// get current blacklist
			var websitesList = items.blacklist;
		  
			// parse the blacklist
			websitesList = JSON.parse(websitesList);
			
			// check the type of the list			
			if (typeof(websitesList) === "string") {
			
				// parse the string at spaces
				var websites = websitesList.split(" ");
				
			} else {
			
				var websites = websitesList;
			
			}
			
			// check the target
			if (target == "red") {
			
				// check if already on list
				if (websites.indexOf(hostName) >= 0) {
				
					// close window, already on blacklist
					window.close();
				
				} else {
				
					// add hostName to websites
					websites.push(hostName);
					
					// change the icon		
					chrome.runtime.sendMessage({"message": "blacklistSite"});				
					
					// handle the blacklist
					setBlacklist(websites);
					
				}
							
			} else {

				// remove all occurrences of hostName from blacklist
				for (var i=0; i < websites.length; i++){

					if (websites[i] === hostName) websites.splice(i, 1);
						
				}
					
				// split the domain to check for universal match
				let splitHostName = hostName.split(".");
		
				if (splitHostName.length > 2) {			
				
					// check if universal hostname match exists
					let universalHostName = "*." + splitHostName[1] + "." + splitHostName[2];				

					// remove all universal occurrences of hostName from blacklist
					for (var j=0; j < websites.length; j++){
					
						if (websites[j] === universalHostName) websites.splice(j, 1);
						
					}

				}
				
				// change the icon		
				chrome.runtime.sendMessage({"message": "whitelistSite"});				
					
				// handle the blacklist
				setBlacklist(websites);				
			
			}						
			
		} else {

			// no hostName, close window		
			window.close();			

		}
		
		
	});
}

// set the new edited blacklist
function setBlacklist(websites) {
	
	// store the blacklist
	storage.set({'blacklist': JSON.stringify(websites)}, function() {
		
		// close the window
		window.close();
				
	});
		
}

// check paused
function checkPaused() {

	// check storage
	storage.get('paused', function(items) {

		 // pull current value from storage
		if (items.paused) {
	 
			// set the value
			let paused = items.paused;							
						
			// check the value type
			if (paused === 'on') {
							
				// paused, turn pause off
				setPaused('off');
				
			} else {
							
				// not paused, turn pause on
				setPaused('on');
			
			}
											
		} else {
			
			// pause not yet turned on - initialize to paused
			setPaused('on');
								
		}
	});

}

// set the new pause value in storage
function setPaused(pauseVal) {
	
	// store the blacklist
	storage.set({'paused': pauseVal}, function() {
						
		// change the icon		
		if (pauseVal === "on") {
		
			// paused, send message to change icon
			chrome.runtime.sendMessage({"message": "pause"});									
		
		} else {
		
			// not paused, send message to change icon
			chrome.runtime.sendMessage({"message": "whitelistSite"});		
		
		}
		
		// close the window
		window.close();
				
	});
		
}

function setTimer(timerVal) {

	// convert the timer to a string
	let timerValString = timerVal.toString();

	// store the blacklist
	storage.set({'timerValue': timerValString}, function() {
							
		// close the window
		window.close();
				
	});
		
}

// update the blacklist storage based on click
function click(e) {
  
  // if blacklist, add hostname to storage
  if (e.target.id == "red") {
	
		// first get the hostName
		getHostName(e.target.id);  
  
  // if whitelist, remove all occurrences of hostname from storage
  } else if (e.target.id == "green") {  
	
		// first get the hostName
		getHostName(e.target.id);
  
  // if enter new timer countdown
  } else if (e.target.id == "yellow") {  

		// prevent prompt from showing more than once
		if (clickFlag == "off") {
		
			clickFlag = "on";
			let timerValue = prompt("Enter the minutes of inactivity before tab auto closes.");
	
			// parse and validate the link
			timerValue = timerValue.replace("http://", "");
			timerValue = timerValue.replace("https://", "");
			timerValue = timerValue.replace("://", "");
			timerValue = timerValue.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&apos;/g, "'").replace(/&amp;/g, '&');
			timerValue = timerValue.replace(/<\/?[^>]+>/ig, '');
			timerValue = timerValue.trim((timerValue.replace(/\s+/g, ' ')));
			
			// convert to int
			timerValue = parseInt(timerValue);
			
			// round to integer if decimal
			timerValue = Math.round(timerValue);
									
			// make sure the timer is a positive number between 1 and 1000
			if ((timerValue > 1) && (timerValue < 1000)) {
						
				// convert the minutes to ms
				timerValue = timerValue * 1000 * 60;
				
				// handle the storage
				setTimer(timerValue);				

			} else {
			
				// not valid, close window
				window.close();
			
			}			
			
		}
  
  // if resume or pause
  } else if (e.target.id == "blue") {  

		// check if paused, toggle state		
		checkPaused();				
  		
  } else {  
					
		// close the popup window
		window.close();
  }
       
}

// set a listener for popup.html div clicks
document.addEventListener('DOMContentLoaded', function () {
	var divs = document.querySelectorAll('div');
	for (var i = 0; i < divs.length; i++) {
		divs[i].addEventListener('click', click);
	}
});
