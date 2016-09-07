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
  categories: any = null;
  apiUrl: string;
  appKey: string;

  constructor(private http: Http) {
    //this.apiUrl = '/'; 
    this.apiUrl = 'https://japi.juhe.cn/comic/'; 
    this.appKey = '39cad5a9f40b32d0d5b5dbede152254b'; 
  }

  category() {
    if (this.categories) {
      return Promise.resolve(this.categories);
    }
  
    return new Promise(resolve => {
      this.http.get(this.apiUrl + 'category?key=' + this.appKey)
        .map(res => res.json())
        .subscribe(data => {
            this.categories = data;
            resolve(this.categories);
          },
          err => resolve({error_code: -1, reason: "网络错误，请稍后重试!", result: []})
        );
    });
  }

  /* 参数名   类型    是否必填    说明
   * name     string  否          漫画名称
   * type     string  否          漫画类别  
   * skip     int     否          跳过的数量  
   * finish   int     否          0代表未完结,1代表已完结,默认所有
   * */
  book(name, type, skip, finish) {
    let paramters = {name: name, type: type, skip: skip, finish: finish};
    let path = 'book';
    let APIURL = this.apiUrl + path + '?key=' + this.appKey;
    for (let p in paramters) {
      APIURL += '&' + p + '=' + paramters[p];
    }
    return new Promise(resolve => {
      this.http.get(APIURL)
        .map(res => res.json())
        .subscribe(data => {
            resolve(data);
          },
          err => resolve({error_code: -1, reason: "网络错误，请稍后重试!", result: []})
        );
    });
  }

  /* 参数名       类型    是否必填    说明
   * comicName    string  是          漫画名称
   * skip         int     否          跳过的条数  
   * */
  chapter(comicName, skip) {
    let paramters = {comicName: comicName, skip: skip};
    let path = 'chapter';
    let APIURL = this.apiUrl + path + '?key=' + this.appKey;
    for (let p in paramters) {
      APIURL += '&' + p + '=' + paramters[p];
    }
    return new Promise(resolve => {
      this.http.get(APIURL)
        .map(res => res.json())
        .subscribe(data => {
            resolve(data);
          },
          err => resolve({error_code: -1, reason: "网络错误，请稍后重试!", result: []})
        );
    });
  }


  /* 参数名       类型    是否必填    说明
   * comicName    string  是          漫画名称
   * id           int     是          章节ID 
   * */
  chapterContent(comicName, id) {
    let paramters = {comicName: comicName, id: id};
    let path = 'chapterContent';
    let APIURL = this.apiUrl + path + '?key=' + this.appKey;
    for (let p in paramters) {
      APIURL += '&' + p + '=' + paramters[p];
    }
    return new Promise(resolve => {
      this.http.get(APIURL)
        .map(res => res.json())
        .subscribe(data => {
            resolve(data);
          },
          err => resolve({error_code: -1, reason: "网络错误，请稍后重试!", result: []})
        );
    });
  }
}

