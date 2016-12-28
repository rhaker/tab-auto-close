## Tab Auto Close

Tab Auto Close is a browser extension that closes a tab after a period of user inactivity. The period of inactivity is a user-controlled input (which defaults to 1 hour).  A desktop notification will alert the 2 minutes prior to the tab auto closing. Any user activity on the page will reset the auto close timer (clicks, scrolls, keyboard typing, etc). Finally, there is a blacklist and whiteist option to prevent the auto-closing on sites that should remain open.

## Example Use Cases

Tab Auto Close is the browser equivalent to a website performing an auto-logout. It is common practice for sites like banking or stock trading platforms to log the user out after a period of inactivity. This provides a bit of security to prevent someone who has walked away from having their accounts inappropriately accessed.

The use cases for Tab Auto Close are similar and include cases along the lines of:
<ul>
<li>You walk away from your computer and your social network is open for everyone to see.</li>
<li>You walk away from your computer and won't to close tabs where you've been logged out.</li>
<li>You leave your computer open and you want to clean up tabs not being used.</li>
</ul>

## Demo

2 minute notification of tab closing
![Alt text](chrome/img/notify.gif?raw=true "Title")

Tab auto closing due to inactivity
![Alt text](chrome/img/notify.gif?raw=true "Title")

Menu of control options
![Alt text](chrome/img/notify.gif?raw=true "Title")

## Installation

You can install Tab Auto Close from the Chrome Web Store via <https://chrome.google.com/webstore/detail/spince-search/okhkfjjedepjhnfodgppdcphcmblkpjj/>

## How It Works

Any user activity on the page will reset the timer. Once a page is opened or navigated to, the auto close timer is instantiated. 

The tool also includes other features:
<ul>
<li>Blacklist of sites to prevent execution</li>
<li>Whitelist previously blacklisted sited</li>										
<li>Pause/Resume toggle to stop all execution on all sites</li>                    					
<li>Input timer defaults to 1 hour, but is an input that can be changed</li>								
<li>No browsing data sent to Spince</li>
<li>Open source code on github</li>
</ul>

## Additional Notes

New features and pull requests are appreciated. There are also plans to build Spince for other platforms (Firefox, Safari, mobile).
