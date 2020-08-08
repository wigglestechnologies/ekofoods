import { Component, OnInit } from '@angular/core';
import { ServerService } from '../service/server.service';
import { ToastController,Platform,LoadingController,NavController } from '@ionic/angular';
import { PayPal, PayPalPayment, PayPalConfiguration } from '@ionic-native/paypal/ngx';
import { Stripe } from '@ionic-native/stripe/ngx';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
})

export class CheckoutPage implements OnInit {

  data:any;
  address:any;
  payment:any;
  payment_id : any;
  total_amount:any;
  paypal_id:any;
  text:any;
  stripe_id:any;
  stripeView = false;
  card_no:any;
  exp_month:any;
  exp_year:any;
  cvv:any;
  otype:number = 1;
  notes:any;
  constructor(public server : ServerService,public toastController: ToastController,public loadingController: LoadingController,private nav: NavController,private payPal: PayPal,private stripe: Stripe)
  {
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

      this.presentToast("Please login for continue.");
    }
    else
    {
      this.loadData();
    }
  }

  setAddress(id)
  {
    this.address = id;
  }

  setType(id)
  {
    this.otype = id;
  }

  formVal()
  {
    if(this.otype == 1)
    {
      if(!this.address || !this.payment)
      {
        return false;
      }
      else
      {
        return true;
      }
    }
    else
    {
      if(!this.payment)
      {
        return false;
      }
      else
      {
        return true;
      }
    }
  }

  setPayment(id)
  {
    this.payment = id;

    if(id == 3)
    {
      this.stripeView = true;
    }
    else
    {
      this.stripeView = false;
    }
  }

  async loadData()
  {
  	const loading = await this.loadingController.create({
      message: 'Please wait...',
      mode: 'ios'
    });
    await loading.present();

    var lid = localStorage.getItem('lid') ? localStorage.getItem('lid') : 0;

  	this.server.getAddress(localStorage.getItem('user_id')+"?cart_no="+localStorage.getItem('cart_no')+"&lid="+lid).subscribe((response:any) => {
	
	 this.data         = response.data;
   this.total_amount = response.data.total;

   console.log(response.data.admin);

   if(response.data.admin.paypal_client_id)
   {
      this.paypal_id    = response.data.admin.paypal_client_id;
   }

   if(response.data.admin.stripe_client_id)
   {
      this.stripe_id    = response.data.admin.stripe_client_id;
   }


  	loading.dismiss();

  	});
  }

  makeOrder()
  {
    if(this.payment == 2)
    {
      this.payPaypal();
    }
    else if(this.payment == 3)
    {
      this.payWithStripe();
    }
    else
    {
      this.order();
    }
  }

  async order()
  {
    const loading = await this.loadingController.create({
      message: 'Please wait...',
      mode: 'ios'
    });
    await loading.present();

    var addr = this.otype == 1 ? this.address : "NONE";

    var allData = {user_id : localStorage.getItem('user_id'),payment : this.payment,address : addr,cart_no : localStorage.getItem('cart_no'),payment_id : this.payment_id,otype : this.otype,notes:this.notes}

    this.server.order(allData).subscribe((response:any) => {
  
    localStorage.setItem('order_data', JSON.stringify(response.data));

    this.nav.navigateRoot('/done');

    loading.dismiss();

    });
  }

  payPaypal()
  { 


        this.payPal.init({
        PayPalEnvironmentProduction: this.paypal_id,
        PayPalEnvironmentSandbox: this.paypal_id
      }).then(() => {
        // Environments: PayPalEnvironmentNoNetwork, PayPalEnvironmentSandbox, PayPalEnvironmentProduction
        this.payPal.prepareToRender('PayPalEnvironmentSandbox', new PayPalConfiguration({
          // Only needed if you get an "Internal Service Error" after PayPal login!
          //payPalShippingAddressOption: 2 // PayPalShippingAddressOptionPayPal
        })).then(() => {
          let payment = new PayPalPayment(this.total_amount, 'USD', 'Description', 'sale');
          this.payPal.renderSinglePaymentUI(payment).then((res) => {
            
            this.payment_id = res.response.id;

            if(this.payment_id)
            {
              this.order();
            }

          }, () => {
            
            this.presentToast("Paypal Transaction Cancelled");

          });
        }, () => {

          this.presentToast("Error in configuration");

        });
      }, () => {
        // 

          this.presentToast("Error in initialization, maybe PayPal isn't supported");

      });
  }

  payWithStripe()
  {
    if(this.card_no.length > 10 && this.exp_month && this.exp_year && this.cvv)
    {
        this.stripe.setPublishableKey(this.stripe_id);

        let card = {
         number: this.card_no,
         expMonth: this.exp_month,
         expYear: this.exp_year,
         cvc: this.cvv
        }

        this.stripe.createCardToken(card)
          .then(token => {
            console.log(token);
            this.makePayment(token.id);
          })
          .catch(error => {

          this.presentToast("Please enter valid payment details");

          });
    }
    else
    {
      this.presentToast("Please enter valid payment details");
    }
  }

  async makePayment(token)
  {
    const loading = await this.loadingController.create({
      message: 'Please wait...',
      mode: 'ios'
    });
    await loading.present();

    this.server.makeStripePayment("?token="+token+"&amount="+this.total_amount).subscribe((response:any) => {

    if(response.data == "done")
    {
        this.payment_id = response.id;

        if(this.payment_id)
        {
          this.order();
        }
    }
    else
    {
      this.presentToast("Something went wrong.Please try again.");
    }

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
}
