import { Component, OnInit } from '@angular/core';
import { NavParams } from '@ionic/angular';
import { ModalController } from '@ionic/angular';


@Component({
  selector: 'app-option',
  templateUrl: './option.page.html',
  styleUrls: ['./option.page.scss'],
})
export class OptionPage implements OnInit {

  item:any;
  currency:any;
  itemID:any;
  itemPrice:any;
  addonData:any = [];
  text:any;
  constructor(public navParams: NavParams,public modalController: ModalController) {

  this.item 	= navParams.get('item');
  this.currency = navParams.get('currency');
  this.text = JSON.parse(localStorage.getItem('app_text'));


  }

  ngOnInit() {
  }

  async addToCart()
  {
    await this.modalController.dismiss({id:this.item.id,price:this.itemPrice,type:this.itemID,addonData : this.addonData});
  }

  async closeModal() {
    
    await this.modalController.dismiss({data:true});
  }

  selectItem(type,price)
  {
    this.itemID     = type;
    this.itemPrice  = price;
  }

  addonSelect(id)
  {

    if(this.addonData.includes(id))
    {
      var ind = this.addonData.indexOf(id);

      this.addonData.splice(ind,1);
    }
    else
    {
      this.addonData.push(id);
    }

    console.log(this.addonData);
  }
}
