import {Component, ViewChild} from '@angular/core';
import {ionicBootstrap, ToastController, Platform, MenuController, Nav} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {HelloIonicPage} from './pages/hello-ionic/hello-ionic';
import {BookListPage} from './pages/book-list/book-list';
import {ListPage} from './pages/list/list';
import {DataService} from './providers/data-service/data-service';


@Component({
  templateUrl: 'build/app.html',
  providers: [DataService]
})
class MyApp {
  @ViewChild(Nav) nav: Nav;

  // make HelloIonicPage the root (or first) page
  rootPage: any = HelloIonicPage;
  pages: Array<{category: string, component: any}>;

  constructor(
    public platform: Platform,
    public menu: MenuController,
    public dataService: DataService,
    public toast: ToastController
  ) {
    

    this.initializeApp();

    this.dataService.category()
    .then(data => {
      if (data.error_code === 0) {
        data.result.forEach(category => {
          this.pages.push({ category: category, component: BookListPage}); 
        })
      } else {
        this.presentToast(data.reason)
      }
    });

    this.pages = [
      { category: 'Hello Ionic', component: HelloIonicPage },
      { category: '全部漫画', component: BookListPage},
      { category: 'My First List', component: ListPage }
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component, {category: page.category});
  }

  presentToast(message) {
    let toast = this.toast.create({
      message: message,
      position: 'middle',
      duration: 3000
    });
    toast.present();
  }
}

ionicBootstrap(MyApp);
