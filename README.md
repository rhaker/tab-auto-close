## Tab Auto Close

Tab Auto Close is a browser extension that closes a tab after a period of user inactivity. The period of inactivity is a menu-controlled input (which defaults to 1 hour).  A desktop notification will alert the user 2 minutes prior to the tab auto closing. Any activity on the page will reset the auto close timer (clicks, scrolls, keyboard typing, etc). Finally, there is a blacklist and whitelist option to prevent (or include) the auto-closing on sites that should remain open (or closed).

## Example Use Cases

Tab Auto Close is the browser equivalent to a website performing an auto-logout. It is common practice for sites like banking or stock trading platforms to log the user out after a period of inactivity. This provides a bit of security to prevent someone who has walked away (leaving an open computer) from having their accounts inappropriately accessed.

The use cases for Tab Auto Close are similar and include cases along the lines of:
<ul>
<li>You walk away from your computer and your social network is open for everyone to see.</li>
<li>You walk away from your computer and your email is open in a browser tab.</li>
<li>You want to auto close tabs where you have been auto logged out.</li>
<li>You want to clean up tabs that you haven't used recently.</li>
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
