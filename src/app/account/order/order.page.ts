import { Component, OnInit,ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServerService } from '../../service/server.service';
import { ToastController,NavController,Platform,LoadingController,AlertController } from '@ionic/angular';

@Component({
  selector: 'app-order',
  templateUrl: './order.page.html',
  styleUrls: ['./order.page.scss'],
})

export class OrderPage implements OnInit {

data:any;
text:any;

  constructor(private route: ActivatedRoute,public server : ServerService,public toastController: ToastController,private nav: NavController,public loadingController: LoadingController,public alertController: AlertController){

    this.text = JSON.parse(localStorage.getItem('app_text'));
  
  }

  ngOnInit()
  {
  }

  ionViewWillEnter()
  {
    if(!localStorage.getItem('user_id') || localStorage.getItem('user_id') == 'null')
    {
      this.nav.navigateRoot('/login');

      this.presentToast("Please login for access your profile");
    }
    else
    {
      this.loadData();
    }
  }

  async loadData()
  {
    const loading = await this.loadingController.create({
      message: 'Please wait...',
    });
    await loading.present();

    var lid = localStorage.getItem('lid') ? localStorage.getItem('lid') : 0;

    this.server.myOrder(localStorage.getItem('user_id')+"?lid="+lid).subscribe((response:any) => {
  
    this.data = response.data;

    loading.dismiss();

    });
  }

  rate()
  {
    this.nav.navigateForward('/login');
  }

  async cancelOrder(id) {
    const alert = await this.alertController.create({
      header: 'Cancel Order!',
      message: 'Are you sure? Want to cancel this order?',
      mode:'ios',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {


          }
        }, {
          text: 'Yes',
          handler: () => {
           
          	this.cnc(id);

          }
        }
      ]
    });

    await alert.present();
  }

  async cnc(id)
  {
  	const loading = await this.loadingController.create({
      message: 'Please wait...',
    });
    await loading.present();

    this.server.cancelOrder(id,localStorage.getItem('user_id')+"?lid="+localStorage.getItem('lid')).subscribe((response:any) => {
  
    this.data = response.data;

    this.presentToast("Order Cancelled Successfully.");

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
