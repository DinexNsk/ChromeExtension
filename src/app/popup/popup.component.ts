import { Component, OnInit } from '@angular/core';

import { Domain } from '../domain';
import { ExtensionService } from '../extension.service';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit {

  domainList:Domain[];

  constructor(
    private extensionService: ExtensionService
  ) { }

  ngOnInit() {
    this.refreshList();
  }

  getDomainList(){
    this.extensionService.getUrlList()
      .subscribe(
        result => this.domainList = result
      )
  }
  refreshList(){
    this.getDomainList();
    setInterval(this.getDomainList, 3.6e+6)
  }
}
