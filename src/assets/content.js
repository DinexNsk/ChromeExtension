/// <reference types="chrome/chrome-app"/>


chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.messageText) {
        sendResponse({ "messageText": 'AnswerToBackground' });    
        createElement(request.messageText);
    }
    if(request.messageObject){
        console.log(request.messageObject);
        sendResponse({ "messageObject": 'got the object' });
        createIcon(request.messageObject);
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

function createIcon(arr) {
    let childs = document.body.querySelectorAll('h2 a, h3 a');
    for(let i=0; i<childs.length; i++){
        /* innerHtml special for bing, that have 2 a-links in one header tag*/
        if(search(childs[i].href, arr) && childs[i].innerHTML!==""){
            let img = document.createElement('img');
            img.src = chrome.runtime.getURL("/assets/img/fav.png");
            img.alt = "can't load img";
            img.style.height = "20px";
            img.style.width = "20px";
            childs[i].parentElement.insertBefore(img,childs[i].parentElement.firstChild);
            console.log('yep')
        }
    }
}
function search(urlFull, arr){
    for (let i=0; i < arr.length; i++) {
      if (urlFull.indexOf(arr[i].domain) !== -1){
        return true;
      }
    }
    return false
  } 