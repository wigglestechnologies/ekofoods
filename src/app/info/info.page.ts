import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-info',
  templateUrl: './info.page.html',
  styleUrls: ['./info.page.scss'],
})
export class InfoPage implements OnInit {

  data:any;
  text:any;
  constructor() {

   this.data = JSON.parse(localStorage.getItem('menu_item'));
   this.text = JSON.parse(localStorage.getItem('app_text'));

  }

  ngOnInit() 
  {
  	
  }

}
