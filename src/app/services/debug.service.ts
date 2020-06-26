import { AlertController } from '@ionic/angular';
import { Injectable } from '@angular/core';
//import { NativeAudio } from '@ionic-native/native-audio/ngx';


@Injectable({
    providedIn: 'root'
})
export class DebugService {

    constructor(private _alertController: AlertController) {}

    public async alertMessage(message: string) {

        const alert = await this._alertController.create({
            header: `${message}!!`,
            message: `${message}`,
            buttons: ['OK']
          });
      
        await alert.present();
    }
}