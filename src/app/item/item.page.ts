import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { OptionPage } from '../option/option.page';
import { ToastController } from '@ionic/angular';
import { ServerService } from '../service/server.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.page.html',
  styleUrls: ['./item.page.scss'],
})
export class ItemPage implements OnInit {

  data:any;
  veg = false;
  cart_no:any;
  count:any;
  text:any;
  cart:any = [];

  constructor(public modalController: ModalController,public toastController: ToastController,public server : ServerService,) { 

   this.data = JSON.parse(localStorage.getItem('menu_item'));
   this.text = JSON.parse(localStorage.getItem('app_text'));


  }

  ngOnInit() {
  }

  ionViewWillEnter()
  {
    if(localStorage.getItem('cart_no') == 'null' || localStorage.getItem('cart_no') == undefined)
    {
      this.cart_no = Math.floor(Math.random()*2000000000)+1;

      localStorage.setItem('cart_no',this.cart_no);
    }
    else
    {
      this.cart_no = localStorage.getItem('cart_no');
    }

    this.server.cartCount(this.cart_no).subscribe((response:any) => {

      this.count = response.data;
      this.cart  = response.cart;


     });
  }

  vegOnly()
  {
  	this.veg = this.veg == true ? false : true;
  }

  async showOption(item,currency) {
    const modal = await this.modalController.create({
      component: OptionPage,
      animated:true,
      mode:'ios',
      cssClass: 'my-custom-modal-css',
      backdropDismiss:false,
      componentProps: {
      'item': item,
      'currency' : currency
    }

    });

   modal.onDidDismiss().then(data=>{
      
      if(data.data.id)
      {
        this.addToCart(data.data.id,data.data.price,data.data.type,data.data.addonData); 
      }

    })

    return await modal.present();
  }

  addToCart(id,price,type = 0,addon = [])
  {
    this.presentToast("Added Successfully");

     var allData = {cart_no : this.cart_no, id : id,price : price,qtype : type,type:0,addon : addon};

     this.server.addToCart(allData).subscribe((response:any) => {

      this.count = response.data.count;
      this.cart  = response.data.cart;


     });
  }

  async presentToast(txt) {
    const toast = await this.toastController.create({
      message: txt,
      duration: 2000
    });
    toast.present();
  }

  hasCart(id)
  {
    for(var i =0;i<this.cart.length;i++)
    {
      if(this.cart[i].item_id == id)
      {
        return this.cart[i].qty;
      }
    }

    return false;
  }

  async updateCart(id,type = 0)
  {
    this.presentToast("Removed Successfully");

    this.server.updateCart(id,type+"?cart_no="+this.cart_no+"&lid="+localStorage.getItem('lid')).subscribe((response:any) => {
    
    this.cart = response.data;
    
    });
  }
}	
