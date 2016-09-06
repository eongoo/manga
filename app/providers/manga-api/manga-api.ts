import { Injectable } from '@angular/core';
import { Config } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the MangaApi provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class MangaApi {
  data: any = null;
  apiUrl: string;
  appKey: string;

  constructor(
    private http: Http,
    private config: Config 
  ) {
    this.apiUrl = 'https://japi.juhe.cn/comic/'; 
    this.appKey = '39cad5a9f40b32d0d5b5dbede152254b'; 
  }

  getCategory() {
    if (this.data) {
      return Promise.resolve(this.data);
    }
  
    return new Promise(resolve => {
      this.http.get(this.apiUrl + 'category?key=' + this.appKey)
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        });
    });
  }
}

