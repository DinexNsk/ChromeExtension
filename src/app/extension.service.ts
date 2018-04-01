import { Injectable } from '@angular/core';
import { Domain } from './domain';

import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpResponse } from '@angular/common/http';

@Injectable()
export class ExtensionService {

  constructor(private http: HttpClient) { }
  
  getUrlList():Observable<Domain[]>{
    return this.http.get<Domain[]>(`https://softomate.net/ext/employees/list.json`)
  }
}
