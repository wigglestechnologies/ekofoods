import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServerService } from '../../service/server.service';
import { ToastController,NavController,Platform,LoadingController,Events } from '@ionic/angular';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})

export class SignupPage implements OnInit {
  
  text:any;
  constructor(private route: ActivatedRoute,public server : ServerService,public toastController: ToastController,private nav: NavController,public loadingController: LoadingController,public events: Events){

   this.text = JSON.parse(localStorage.getItem('app_text'));

  }

  ngOnInit()
  {
  }

  async signup(data)
  {
    const loading = await this.loadingController.create({
      message: 'Please wait...',
    });
    await loading.present();

    this.server.signup(data).subscribe((response:any) => {
  
    if(response.msg == "error")
    {
      this.presentToast(response.error);
    }
    else
    {
      localStorage.setItem('user_id',response.user_id);
      
      this.events.publish('user_login', response.user_id);
      
      this.presentToast("Account Created Successfully.Please Continue");

      if(localStorage.getItem('cart_no'))
      {
        this.nav.navigateBack('/cart'); 
      }
      else
      {
        this.nav.navigateRoot('profile'); 
      }
    }

    loading.dismiss();

    });
  }

  async presentToast(txt) {
    const toast = await this.toastController.create({
      message: txt,
      duration: 3000,
      position : 'top',
      mode:'ios',
      color:'dark'
    });
    toast.present();
  }
}
