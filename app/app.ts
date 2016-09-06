import {Component, ViewChild} from '@angular/core';
import {ionicBootstrap, Config, Platform, MenuController, Nav} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {HelloIonicPage} from './pages/hello-ionic/hello-ionic';
import {ListPage} from './pages/list/list';
import {MangaApi} from './providers/manga-api/manga-api';


@Component({
  templateUrl: 'build/app.html',
  providers: [MangaApi]
})
class MyApp {
  @ViewChild(Nav) nav: Nav;

  // make HelloIonicPage the root (or first) page
  rootPage: any = HelloIonicPage;
  pages: Array<{title: string, component: any}>;

  constructor(
    public platform: Platform,
    public config: Config,
    public menu: MenuController,
    public mangaApi: MangaApi
  ) {
    
    this.config.set('APIURL', 'http://japi.juhe.cn/comic/');
    this.config.set('APPKEY', '39cad5a9f40b32d0d5b5dbede152254b');

    this.initializeApp();

    this.mangaApi.getCategory()
    .then(data => {
      console.log(data)
    });
    // set our app's pages
    this.pages = [
      { title: 'Hello Ionic', component: HelloIonicPage },
      { title: 'My First List', component: ListPage }
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
    this.nav.setRoot(page.component);
  }
}

ionicBootstrap(MyApp);
