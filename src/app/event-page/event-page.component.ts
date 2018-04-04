/// <reference types="chrome/chrome-app"/>
import { Component, OnInit } from '@angular/core';

import { Domain } from '../domain';
import { ExtensionService } from  '../extension.service';

@Component({
  selector: 'app-event-page',
  templateUrl: './event-page.component.html',
  styleUrls: ['./event-page.component.css']
})
export class EventPageComponent implements OnInit {

  count: number = 0;
  foundIndex: number;
  sitesList:Domain[];

  constructor(
    private extensionService: ExtensionService
  ) { }

  ngOnInit() {
    this.refreshList();
    this.startListener();
  }

  startListener() {
    chrome.tabs.onUpdated.addListener(
      (tabId, changeInfo, tab) => {
        if((this.count < 3) && changeInfo.status === "complete" && this.search(tab.url, this.sitesList)){
          this.count++;
          let message = this.sitesList[this.foundIndex].message;
          chrome.tabs.sendMessage(tab.id, {messageText: message}, this.getResponse);
          chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
                this.count = request.messageText;
                sendResponse({"messageText": "answerToScript"});
          });
        }
        if(changeInfo.status === "complete" &&
          tab.url.match(/((google.(com|ru))|(bing.com))\/search/gi)!== null){
            chrome.tabs.sendMessage(tab.id, {messageObject: this.sitesList}, this.getResponse);
        }
      }
    );
  }

  getResponse(response){
    if (chrome.runtime.lastError) {
      console.log("ERROR: ", chrome.runtime.lastError);
    } else {
      console.log(response);  
    }
  }

  search(urlFull:string, arr:Domain[]):boolean{
    for (let i=0; i < arr.length; i++) {
      if (urlFull.indexOf(arr[i].name) !== -1){
        this.foundIndex = i;
        return true;
      }
    }
    return false
  } 

  getDomainList(){
    this.extensionService.getUrlList()
      .subscribe(
        result => this.sitesList = result
      )
  }

  refreshList(){
    this.getDomainList();
    chrome.alarms.create('refreshData', {periodInMinutes:60});
    chrome.alarms.onAlarm.addListener(alarms => {
      if(alarms.name === 'refreshData'){
        this.getDomainList()
      }
    })
  }
}
