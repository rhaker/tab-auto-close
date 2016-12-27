/*
*
* Originally created by Ross Haker (released on December 13, 2016)
* The logic on this page is as follows:
* 1) Determine if current page is on blacklist to stop execution
* 2) If not on blacklist, check if paused
* 3) If not paused, get timer value
* 5) Set activity listeners
* 6) Start timer countdown
* 7) If there is user activity, reset start time
* 8) Send notification 120 seconds prior to close
* 9) Close if user does not reset
*
*/

// detect the protocol
const PROTOCOL = window.location.protocol;

// settings in local storage
var storage = chrome.storage.local;

// countdown seconds default
var countdown = 1000 * 60 * 60;

// create timer objects
var closeTimer;
var notifyTimer;

// check the website blacklist
storage.get('blacklist', function(items) {

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

		// check if the current website is blacklisted
		checkBlacklisted(websites);
		
    } else {

		// create original blacklist
		var newWebsites = ["*.spince.com"];
		
		// store the blacklist
		storage.set({'blacklist': JSON.stringify(newWebsites)}, function() {
			// save occurred, can send message in background
		});
		
		// get the hostname of the url to store
		let currentHostName = window.location.hostname.toString();

		// store the current hostname - retrieved to edit the blacklist
		storage.set({'currentHostName': currentHostName}, function() {
			// save occurred, can send message in background
		});
		
		// proceed to check if paused
		checkPaused();		

	}
});
		
// a function to check whether to run the extension
function checkBlacklisted(websites) {

	// get the hostname of the url to check if excluded		
	let currentHostName = window.location.hostname.toString();

	// store the current hostname - retrieved to edit the blacklist
	storage.set({'currentHostName': currentHostName}, function() {
		// save occurred, can send message in background
	});

	// check if host name is included in blacklist	
	if (websites.indexOf(currentHostName) >= 0) {
		
		// stop - blacklisted website found, send message to change icon
		chrome.runtime.sendMessage({"message": "blacklistSite"});		
		
	} else {
		
		// no blacklisted website found, send message to change icon
		chrome.runtime.sendMessage({"message": "whitelistSite"});		
		
		// split the domain to check for universal match
		let splitHostName = currentHostName.split(".");
		
		if (splitHostName.length > 2) {			
		
			// check if universal hostname match exists
			let universalHostName = "*." + splitHostName[1] + "." + splitHostName[2];				
			
			if (websites.indexOf(universalHostName) >= 0) {
			
				// stop - blacklisted website found				
				chrome.runtime.sendMessage({"message": "blacklistSite"});		
			
			} else {
			
				// proceed to check if paused
				checkPaused();		
				
			}
			
		} else {
					
			// proceed to check if paused
			checkPaused();		
			
		}
			
	}

}

// function check if extension is paused
function checkPaused() {

	// check storage
	storage.get('paused', function(items) {

		 // pull current value from storage
		if (items.paused) {
	 
			// set the value
			let paused = items.paused;							
						
			// check the value type
			if (paused === 'on') {

				// paused, stop execution
				chrome.runtime.sendMessage({"message": "pause"});				
				
			} else {
							
				// proceed to get timer value
				getTimerValue();
			
			}
									
			
		} else {
			
			// proceed to get timer value
			getTimerValue();
								
		}
	});

}

// function to pull timer value string from storage
function getTimerValue() {

	// check storage
	storage.get('timerValue', function(items) {

		 // pull current value from storage
		if (items.timerValue) {
	 
			// set the value
			let countdownLevel = items.timerValue;			
			
			// convert the storage string to an int
			countdownLevel = parseInt(countdownLevel);
						
			// check the value type
			if (countdownLevel > 0) {
							
				// start the timer
				setUserActivity(countdownLevel);
				
			} else {
			
				// timer not set, default to 60 minutes
				let countdownLevel = 1000 * 60 * 60;
				setUserActivity(countdownLevel);
			
			}								
			
		} else {
			
			// timer not set, default to 60 minutes
			let countdownLevel = 1000 * 60 * 60;
			setUserActivity(countdownLevel);
								
		}
	});

}

// function to set user activity listeners
function setUserActivity(countdownLevel) {

	// set countdown
	countdown = countdownLevel;

	document.onclick = function() {
		startCloseTimer(countdown);
	};
	document.onmousemove = function() {
		startCloseTimer(countdown);
	};
	document.onkeypress = function() {
		startCloseTimer(countdown);
	};
	document.touchstart = function() {
		startCloseTimer(countdown);
	};
	document.onscroll = function() {
		startCloseTimer(countdown);
	};

	startCloseTimer(countdown);
}

// function to start the timer
function startCloseTimer(countdownVal) {
	
	// clear any existing timers
	window.clearTimeout(notifyTimer);
	window.clearTimeout(closeTimer);					
	
	// set the default notify
	let notifyVal = 50;
	
	// set the notify count
	if (countdownVal > 120000) {
		notifyVal = countdownVal - 120000; 
		
		// start notify countdown
		notifyTimer = setTimeout(function(){		
				chrome.runtime.sendMessage({"message": "notify", "tabUrl": window.location.href.toString(),});							
			},notifyVal);
	
	} 
			
	// start close countdown
	closeTimer = setTimeout(function(){		
				chrome.runtime.sendMessage({"message": "closetab", "tabUrl": window.location.href.toString(),});							
			},countdownVal);
}
