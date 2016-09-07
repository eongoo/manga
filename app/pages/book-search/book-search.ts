import { Component } from '@angular/core';
import { NavController, ToastController, NavParams } from 'ionic-angular';
import { DataService } from '../../providers/data-service/data-service';
import { ChapterListPage } from '../chapter-list/chapter-list';

/*
  Generated class for the BookSearchPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/book-search/book-search.html',
  providers: [DataService]
})
export class BookSearchPage {
  selectedCategory: any;
  response: any;
  bookList: any;

  constructor(
    private navCtrl: NavController, 
    public dataService: DataService,
    public toast: ToastController,
    navParams: NavParams
  ) {
    this.selectedCategory = navParams.get('category');

    if (!this.selectedCategory) {
      this.selectedCategory = '';
    }

  }

  getBooks(ev) {
    var val = ev.target.value;

    this.dataService.book(val, this.selectedCategory, '', '')
    .then(data => {
      this.response = data;
      if (this.response.error_code === 200) {
        this.bookList = this.response.result.bookList;
      } else {
        this.bookList = [];
        this.presentToast(this.response.reason);
      }
    });
  }

  bookTapped(event, book) {
    this.navCtrl.push(ChapterListPage, {
      book: book 
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
