# react-chrome-extension
This simple chrome extension written using Angular5.

# What extension supposed to do:

 1. Download list from url http://www.softomate.net/ext/employees/list.json
 2. When user visits page("domain") from list, then show "message", that injects on page:
![Message on the page](https://i.imgur.com/Ps6xM2m.png)
 3. This message can be shown no more than three times
 4. If the user has closed the message, it will no longer be displayed
 5. In popup display the list of links("domain")
 6. On the search page in google.[com|ru], bing .com  mark all sites from the list("domain") with extension icon 
![enter image description here](https://i.imgur.com/c2OAx5O.png)

## To Run An Example

Clone or download this repo.

Navigate to an example's root folder, then run:
```
npm install 
```
To build the project, run:
```
npm build
```
Then use "dist" folder like extension folder in chrome
