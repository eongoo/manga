import { Component } from '@angular/core';
import { NavController, ToastController, NavParams } from 'ionic-angular';
import { DataService } from '../../providers/data-service/data-service';
import { ChapterContentPage } from '../chapter-content/chapter-content';

/*
  Generated class for the ChapterListPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/chapter-list/chapter-list.html',
  providers: [DataService]
})
export class ChapterListPage {
  selectedBook: any;
  response: any;
  chapterList: any;

  constructor(
    private navCtrl: NavController,
    public dataService: DataService,
    public toast: ToastController,
    navParams: NavParams
  ) {

    this.selectedBook = navParams.get('book');

    this.dataService.chapter(this.selectedBook.name, '')
    .then(data => {
      this.response = data;
      if (this.response.error_code === 200) {
        this.chapterList = this.response.result.chapterList;
      } else {
        this.chapterList = [];
        this.presentToast(this.response.reason);
      }
    });
  }

  chapterTapped(event, chapter) {
    this.navCtrl.push(ChapterContentPage, {
      chapter: chapter, 
      comicName: this.selectedBook.name
    });
  }

  presentToast(message) {
    let toast = this.toast.create({
      message: message,
      position: 'middle',
      duration: 2000
    });
    toast.present();
  }
}
