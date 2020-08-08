import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ServerService {
  
  //put /api/ after your url e.g https://www.abc.com/api/
  url = "http://eco.robustapps.com/api/";

  constructor(private http: HttpClient) { }

  welcome()
  {
  	return this.http.get(this.url+'welcome')
  	    	   .pipe(map(results => results));
  }

  city()
  {
  	return this.http.get(this.url+'city?lid='+localStorage.getItem('lid'))
  	    	   .pipe(map(results => results));
  }

  lang()
  {
    return this.http.get(this.url+'lang')
             .pipe(map(results => results));
  }

  homepage(city_id)
  {
    return this.http.get(this.url+'homepage/'+city_id)
             .pipe(map(results => results));
  }

  search(query,type,city)
  {
    return this.http.get(this.url+'search/'+query+'/'+type+'/'+city)
             .pipe(map(results => results));
  }

  addToCart(data)
  {
    return this.http.post(this.url+'addToCart',data)
             .pipe(map(results => results));
  }

  updateCart(id,type)
  {
    return this.http.get(this.url+'updateCart/'+id+'/'+type)
             .pipe(map(results => results));
  }

  cartCount(cartNo)
  {
    return this.http.get(this.url+'cartCount/'+cartNo)
             .pipe(map(results => results));
  }

  getCart(cartNo)
  {
    return this.http.get(this.url+'getCart/'+cartNo)
             .pipe(map(results => results));
  }

  getOffer(cartNo)
  {
    return this.http.get(this.url+'getOffer/'+cartNo)
             .pipe(map(results => results));
  }

  applyCoupen(id,cartNo)
  {
    return this.http.get(this.url+'applyCoupen/'+id+'/'+cartNo)
             .pipe(map(results => results));
  }

  signup(data)
  {
    return this.http.post(this.url+'signup',data)
             .pipe(map(results => results));
  }

  login(data)
  {
    return this.http.post(this.url+'login',data)
             .pipe(map(results => results));
  }

  forgot(data)
  {
    return this.http.post(this.url+'forgot',data)
             .pipe(map(results => results));
  }

  verify(data)
  {
    return this.http.post(this.url+'verify',data)
             .pipe(map(results => results));
  }

  updatePassword(data)
  {
    return this.http.post(this.url+'updatePassword',data)
             .pipe(map(results => results));
  }

  getAddress(id)
  {
    return this.http.get(this.url+'getAddress/'+id)
             .pipe(map(results => results));
  }

  myOrder(id)
  {
    return this.http.get(this.url+'myOrder/'+id)
             .pipe(map(results => results));
  }

  saveAddress(data)
  {
    return this.http.post(this.url+'addAddress',data)
             .pipe(map(results => results));
  }

  order(data)
  {
    return this.http.post(this.url+'order',data)
             .pipe(map(results => results));
  }

  userInfo(id)
  {
    return this.http.get(this.url+'userinfo/'+id)
             .pipe(map(results => results));
  }

  updateInfo(data,id)
  {
    return this.http.post(this.url+'updateInfo/'+id,data)
             .pipe(map(results => results));
  }

  cancelOrder(id,uid)
  {
    return this.http.get(this.url+'cancelOrder/'+id+'/'+uid)
             .pipe(map(results => results));
  }

  loginFb(data)
  {
    return this.http.post(this.url+'loginFb',data)
             .pipe(map(results => results));
  }

  sendChat(data)
  {
    return this.http.post(this.url+'sendChat',data)
             .pipe(map(results => results));
  }

  push()
  {
    return this.http.get(this.url+'push')
             .pipe(map(results => results));
  }

  rating(data)
  {
    return this.http.post(this.url+'rate',data)
             .pipe(map(results => results));
  }

  updateCity(data)
  {
    return this.http.post(this.url+'rate',data)
             .pipe(map(results => results));
  }

  pages()
  {
    return this.http.get(this.url+'pages?lid='+localStorage.getItem('lid')).pipe(
      map(results => results)
    );
  }

  makeStripePayment(token)
  {
    return this.http.get(this.url+'makeStripePayment'+token).pipe(
      map(results => results)
    );
  }

  getStatus(id)
  {
    return this.http.get(this.url+'getStatus/'+id).pipe(
      map(results => results)
    );
  }
}
