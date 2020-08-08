import { Component, OnInit,ViewChild } from '@angular/core';
import { ServerService } from '../service/server.service';
import { NavController,Platform,LoadingController,IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {

@ViewChild('slides',{static:false}) slides: IonSlides;

text:any;
slideOptsTwo = {
    slidesPerView: 1,
    loop: true,
    autoplay:false,
    pagination: {
      el: '.swiper-pagination',
    }

  }

  data:any;
  getStart = false;

  constructor(public server : ServerService,public loadingController: LoadingController) { 


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

    this.server.welcome().subscribe((response:any) => {
  
    this.data = response.data;

    loading.dismiss();

    });
  }

  slideChanged()
  {
     this.slides.getActiveIndex().then(index => {

      var ind = (index*1) + 1*1;

      if(this.data.length == ind)
      {
        this.getStart = true;
      }
      else
      {
        this.getStart = false; 
      }

     });
  }
}
