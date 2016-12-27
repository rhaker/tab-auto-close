// receive message from content script
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {

	// check if message is blacklist site
	if ( request.message === "blacklistSite" ) {  

		// change the icon to inactive
		chrome.browserAction.setIcon({path:"img/iconOff38.png"});
	
	// check if message is whitelist site or resume
	} else if ( request.message === "whitelistSite" ) {  

		// change the icon to inactive
		chrome.browserAction.setIcon({path:"img/icon.png"});
			
	// check if message is pause
	} else if ( request.message === "pause" ) {  

		// change the icon to inactive
		chrome.browserAction.setIcon({path:"img/iconPause38.png"});

	// check if message is notify
	} else if ( request.message === "notify" ) {  

		// display the notification
		displayNotify(request.tabUrl);
		
	// check if message is to close tab
	} else if ( request.message === "closetab" ) {  

		// cycle through all tabs, close matching url
		chrome.tabs.query({}, function(tabs) { 
			for (var i = 0; i < tabs.length; i++) {				
				if (tabs[i].url === request.tabUrl) {										
					// close tab
					chrome.tabs.remove(tabs[i].id);					
				}			
			}
		} );	
	
	}
	
});

function displayNotify(tabUrl) {
			
	var opt = {
		type: "basic",
		title: "Auto Tab Close in 2 Minutes",
		message: "Tab with the url: " + tabUrl.substring(0,25) + " will close in 2 minutes. Click on page to reset timer.",
		iconUrl: "./img/icon_128.png"
	}
	
	// create random id name, so next notification displays: on 11/3/13, bug prevents same id from displaying on later popups
	let randID = Math.floor((Math.random()*100000)+1);
	randID = randID.toString();
	
	chrome.notifications.create(randID, opt, creationCallback);			
	
	function creationCallback() {			
		// hide the notification after 6 seconds
		setTimeout(function(){
			chrome.notifications.clear(randID, clearCallback);	
		}, 6000);
	}
	
	function clearCallback() {
		// do nothing				
	}
}
