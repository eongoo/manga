import { Component } from '@angular/core';
import { NavController, ToastController, NavParams } from 'ionic-angular';
import { DataService } from '../../providers/data-service/data-service';

/*
  Generated class for the ChapterContentPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/chapter-content/chapter-content.html',
  providers: [DataService]
})
export class ChapterContentPage {
  selectedChapter: any;
  comicName: string;
  response: any;
  imageList: any;

  constructor(
    private navCtrl: NavController,
    public dataService: DataService,
    public toast: ToastController,
    navParams: NavParams
  ) {

    this.selectedChapter = navParams.get('chapter');
    this.comicName = navParams.get('comicName');

    this.dataService.chapterContent(this.comicName, this.selectedChapter.id)
    .then(data => {
      this.response = data;
      if (this.response.error_code === 200) {
        this.imageList = this.response.result.imageList;
      } else {
        this.imageList = [];
        this.presentToast(this.response.reason);
      }
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
