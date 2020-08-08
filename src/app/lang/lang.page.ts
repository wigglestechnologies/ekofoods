import { Component, OnInit } from '@angular/core';
import { ServerService } from '../service/server.service';
import { ToastController,Platform,LoadingController,NavController,Events } from '@ionic/angular';

@Component({
  selector: 'app-lang',
  templateUrl: './lang.page.html',
  styleUrls: ['./lang.page.scss'],
})

export class LangPage implements OnInit {

  data:any;
  lid = "none";
  type:any;
  text:any;
  constructor(public server : ServerService,public toastController: ToastController,public loadingController: LoadingController,private nav: NavController,public events: Events)
  {
    if(localStorage.getItem('lid'))
    {
      this.lid = localStorage.getItem('lid');
    }

    this.text = JSON.parse(localStorage.getItem('app_text'));
  }

  ngOnInit()
  {
  	this.loadData();
  }

  async loadData()
  {
  	const loading = await this.loadingController.create({
      message: 'Please wait...',
      mode: 'ios'
    });
    await loading.present();

  	this.server.lang().subscribe((response:any) => {
	
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

  search(ev) {
   
    // set val to the value of the ev target
    var val = ev.target.value;

    if(val && val.length > 0)
    {
        if (val && val.trim() != '') {
        this.data = this.data.filter((item) => {
        return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
        })
      }
    }
    else
    {
        return this.loadData();
    }
   
  
  }

  setLang(id,type)
  {
    this.lid = id;
    this.type = type;
  }

  update()
  {
    this.events.publish('lang_change', this.type);

    localStorage.setItem('lid',this.lid);
    localStorage.setItem('app_type',this.type);

    this.presentToast("Language Updated Successfully");

    this.nav.navigateRoot('/home');
  }
}
