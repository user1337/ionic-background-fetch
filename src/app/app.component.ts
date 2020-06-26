import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import BackgroundFetch, { BackgroundFetchStatus } from 'cordova-plugin-background-fetch';
import { DebugService } from './services/debug.service';
import { Vibration } from '@ionic-native/vibration/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,

    private _vibration: Vibration,
    private _debugService: DebugService,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      this.iOSBackground();
    });
  }

  private iOSBackground() {

    BackgroundFetch.configure(

      (taskId: string) => {

        this._debugService.alertMessage("success - taskId: "+ taskId);
        this._vibration.vibrate(6000);

        BackgroundFetch.finish(taskId);
      },

      (status: BackgroundFetchStatus) => {
        this._debugService.alertMessage("error - status "+ JSON.stringify(status));
        this._vibration.vibrate(6000);
      },

      {
        minimumFetchInterval: 15
      }

    );


    BackgroundFetch.scheduleTask({
      taskId: "com.transistorsoft.customtask",
      periodic: true,
      delay: 10000
    });

  }
}
