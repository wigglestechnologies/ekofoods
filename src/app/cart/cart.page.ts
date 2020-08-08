import { Component, OnInit } from '@angular/core';
import { ServerService } from '../service/server.service';
import { ToastController,Platform,LoadingController,NavController,ModalController } from '@ionic/angular';
import { OfferPage } from '../offer/offer.page';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})

export class CartPage implements OnInit {

  data:any;
  fakeData = [1,2,3,4,5,6,7];
  discount:any;
  text:any;

  constructor(public modalController: ModalController,public server : ServerService,public toastController: ToastController,public loadingController: LoadingController,private nav: NavController)
  {
   this.text = JSON.parse(localStorage.getItem('app_text'));
  }

  ngOnInit()
  {
  	this.loadData();
  }

  async loadData()
  {
    var lid = localStorage.getItem('lid') ? localStorage.getItem('lid') : 0;

  	this.server.getCart(localStorage.getItem('cart_no')+"?lid="+lid).subscribe((response:any) => {
	
	  this.data = response.data;

  	});
  }

  async updateCart(id,type)
  {
    const loading = await this.loadingController.create({
      message: 'Please wait...',
      mode:'ios'
    });
    await loading.present();

    this.server.updateCart(id,type+"?lid="+localStorage.getItem('lid')).subscribe((response:any) => {
    
    this.data = response.data;
    
    loading.dismiss();

    });
  }
 
 async presentToast(txt) {
    const toast = await this.toastController.create({
      message: txt,
      duration: 2000,
      position : 'bottom'
    });
    toast.present();
  }

  async coupen() {
    const modal = await this.modalController.create({
      component: OfferPage,
      animated:true,
      mode:'ios',
      cssClass: 'my-custom-modal-css',
      backdropDismiss:false,
      

    });

   modal.onDidDismiss().then(data=>{
    
   console.log(data.data.id);

    if(data.data.id)
    {
      this.applyCoupen(data.data.id);
    }

    })

    return await modal.present();
  }

async applyCoupen(id)
{
  const loading = await this.loadingController.create({
      message: 'Please wait...',
      mode:'ios'
    });
    await loading.present();

    this.server.applyCoupen(id,localStorage.getItem('cart_no')+"?lid="+localStorage.getItem('lid')).subscribe((response:any) => {
    
    if(response.msg == "done")
    {
      this.data = response.data;
    }
    else
    {
      this.presentToast(response.msg);
    }
    
    loading.dismiss();

    });
}


}
