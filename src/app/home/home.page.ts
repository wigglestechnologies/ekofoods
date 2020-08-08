import { Component, OnInit,ViewChild } from '@angular/core';
import { ServerService } from '../service/server.service';
import { NavController,Platform,LoadingController,IonSlides,Events } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
	
BannerOption = {
    initialSlide: 0,
    slidesPerView: 2.3,
    loop: true,
    centeredSlides: false,
    autoplay:false,
    speed: 500,
    spaceBetween:7,

  }

  SearchOption = {
    initialSlide: 0,
    slidesPerView: 3.5,
    loop: false,
    centeredSlides: false,
    autoplay:false,
    speed: 500,
    spaceBetween:-20,

  }

  TrendOption = {
    initialSlide: 0,
    slidesPerView: 1.4,
    loop: true,
    centeredSlides: false,
    autoplay:false,
    speed: 800,
    spaceBetween:-9,

  }

  MiddleBannerOption = {
    initialSlide: 0,
    slidesPerView: 1.3,
    loop: false,
    centeredSlides: false,
    autoplay:true,
    speed: 800,
    spaceBetween:7,

  }

  city_name:any;
  data:any;
  fakeData = [1,2,3,4,5,6,7];
  oldData:any;
  showLoading = false;
  filterPress:any;
  hasSearch = false;
  searchQuery:any;
  count:any;
  text:any;
  order:any;

  constructor(public server : ServerService,private nav: NavController,public events: Events)
  {
    
  }

  ionViewWillEnter()
  {
    if(localStorage.getItem('app_text'))
    {
      this.text = JSON.parse(localStorage.getItem('app_text'));
    }

    this.city_name = localStorage.getItem('city_name');
  
    this.server.cartCount(localStorage.getItem('cart_no')+"?user_id="+localStorage.getItem('user_id')).subscribe((response:any) => {

      this.count = response.data;
      this.order = response.order;

     });

    this.loadData(localStorage.getItem('city_id')+"?ss=ss");

  }

  ngOnInit()
  {
    this.searchQuery = null;
    this.hasSearch   = false;
  }

  nearBy()
  {
    this.data = null;
    this.loadData(localStorage.getItem('city_id')+"?lat="+localStorage.getItem('current_lat')+"&lng="+localStorage.getItem('current_lng'));
  }

  async loadData(city_id)
  {
    var lid = localStorage.getItem('lid') ? localStorage.getItem('lid') : 0;

    this.server.homepage(city_id+"&lid="+lid).subscribe((response:any) => {

    this.data = response.data;
    this.text = response.data.text;

    this.events.publish('text', this.text);
    this.events.publish('admin', response.data.admin);

    localStorage.setItem('app_text', JSON.stringify(response.data.text));
    localStorage.setItem('admin', JSON.stringify(response.data.admin));

    });
  }

  search(ev)
  {
    var val = ev.target.value;

    if(val && val.length > 0)
    {
      this.data      = null;
      this.hasSearch = val;

      this.loadData(localStorage.getItem('city_id')+"?q="+val);
    }
    else
    {
      this.ngOnInit();
      this.hasSearch = false;
    }
  }

  async dataFilter(type)
  {
    this.filterPress = type;
    await this.delay(1000);
    this.filterPress = null;

    if(type == 1)
    {
      this.data.store.sort((a,b) => {
    
        return parseFloat(b.discount_value) - parseFloat(a.discount_value);

        });
    }
    else if(type == 2)
    {
      this.data.store.sort((a,b) => {
    
        return parseFloat(a.delivery_time) - parseFloat(b.delivery_time);

        });
    }
    else if(type == 3)
    {
      this.data.store.sort((a,b) => {
    
        return parseFloat(b.trending) - parseFloat(a.trending);

        });
    }
    else if(type == 4)
    {
        this.data.store.sort((a,b) => {
    
        return parseFloat(b.id) - parseFloat(a.id);

        });
    }
    else if(type == 5)
    {
      this.data.store.sort((a,b) => {
    
        return parseFloat(b.rating) - parseFloat(a.rating);

        });
    }
    else if(type == 6)
    {
      
    }
    else if(type == 7)
    {
      
    }
  }

  async delay(ms: number) {
    
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  bannerLink(offer)
  {
    if(offer.link)
    {
      this.data = null;
      this.loadData(localStorage.getItem('city_id')+"?banner="+offer.id);
    }
  }

  doRefresh(event) {

    this.loadData(localStorage.getItem('city_id'));

    setTimeout(() => {
      
      event.target.complete();
    }, 2000);
  }

  itemPage(storeData)
  {
    if(storeData.open)
    {
      localStorage.setItem('menu_item', JSON.stringify(storeData));
    
      this.nav.navigateForward('/item');
    }
  }
}
