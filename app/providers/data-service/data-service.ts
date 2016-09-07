import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the DataService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class DataService {
  data: any = null;
  apiUrl: string;
  appKey: string;

  constructor(private http: Http) {
    this.apiUrl = 'https://japi.juhe.cn/comic/'; 
    this.appKey = ''; 
  }

  category() {
    if (this.data) {
      return Promise.resolve(this.data);
    }
  
    return new Promise(resolve => {
      this.http.get(this.apiUrl + 'category?key=' + this.appKey)
        .map(res => res.json())
        .subscribe(data => {
            this.data = data;
            resolve(this.data);
          },
          err => resolve({error_code: -1, reason: "http error!", result: []})
        );
    });
  }
}

