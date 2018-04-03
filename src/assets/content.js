/// <reference types="chrome/chrome-app"/>


chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.messageText) {
        sendResponse({ "messageText": 'AnswerToBackground' });    
        createElement(request.messageText);
    }
});

function createElement(message) {
    /* style link*/
    let link = document.createElement('link');
    link.id = 'messageLink'
    link.href = chrome.runtime.getURL("/assets/content.css"); 
    link.type = 'text/css'; 
    link.rel = 'stylesheet'; 
    document.head.appendChild(link);
    /* Addind main block */
    let div = document.createElement('div');
    div.id = 'messageBox';
    div.className = "message";
    div.innerHTML = message;
    document.documentElement.insertBefore(div, document.documentElement.lastChild);
    /* Adding close-icon */
    let close = document.createElement('div');
    close.className = "close"
    close.innerHTML = '<strong>x</strong>';
    close.addEventListener('click', removeItem);
    let k = document.getElementById('messageBox');
    k.appendChild(close);
    document.body.style.transform = "translateY(0)";
}

/* delete Message-box and style-link */
function removeItem(){
    let item = document.getElementById('messageBox');
    document.documentElement.removeChild(item);
    item = document.getElementById('messageLink');
    console.log(item);
    document.head.removeChild(item);
    chrome.runtime.sendMessage({messageText: 3}, getResponse);
}

function getResponse(response) {
    if (chrome.runtime.lastError) {
      console.log("ERROR: ", chrome.runtime.lastError);
    } else {
      console.log(response);  
    }
  }