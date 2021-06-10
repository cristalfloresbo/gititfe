import { Component } from '@angular/core';
import { SplashScreen } from '@capacitor/splash-screen';
import { Platform } from "@ionic/angular";
//import { StatusBar } from "@ionic-native/status-bar/ngx";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
	constructor(
		private platform: Platform, 
		//private statusBar: StatusBar
		) {	
		this.initializeApp();
	}

  initializeApp() {
    /* To make sure we provide the fastest app loading experience
       for our users, hide the splash screen automatically
       when the app is ready to be used:

        https://capacitor.ionicframework.com/docs/apis/splash-screen#hiding-the-splash-screen
    */
   	this.platform.ready().then(() => {
		//this.statusBar.styleDefault();
	   	SplashScreen.hide();
	});}
}
