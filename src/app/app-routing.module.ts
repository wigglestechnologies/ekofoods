import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'welcome',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'list',
    loadChildren: () => import('./list/list.module').then(m => m.ListPageModule)
  },
  { path: 'welcome', loadChildren: './welcome/welcome.module#WelcomePageModule' },
  { path: 'city', loadChildren: './account/city/city.module#CityPageModule' },
  { path: 'item', loadChildren: './item/item.module#ItemPageModule' },
  { path: 'option', loadChildren: './option/option.module#OptionPageModule' },
  { path: 'info', loadChildren: './info/info.module#InfoPageModule' },
  { path: 'cart', loadChildren: './cart/cart.module#CartPageModule' },
  { path: 'offer', loadChildren: './offer/offer.module#OfferPageModule' },
  { path: 'checkout', loadChildren: './checkout/checkout.module#CheckoutPageModule' },
  { path: 'login', loadChildren: './account/login/login.module#LoginPageModule' },
  { path: 'signup', loadChildren: './account/signup/signup.module#SignupPageModule' },
  { path: 'forgot', loadChildren: './account/forgot/forgot.module#ForgotPageModule' },
  { path: 'address', loadChildren: './account/address/address.module#AddressPageModule' },
  { path: 'done', loadChildren: './done/done.module#DonePageModule' },
  { path: 'profile', loadChildren: './account/profile/profile.module#ProfilePageModule' },
  { path: 'order', loadChildren: './account/order/order.module#OrderPageModule' },
  { path: 'rate/:id', loadChildren: './account/rate/rate.module#RatePageModule' },
  { path: 'about', loadChildren: './page/about/about.module#AboutPageModule' },
  { path: 'how', loadChildren: './page/how/how.module#HowPageModule' },
  { path: 'faq', loadChildren: './page/faq/faq.module#FaqPageModule' },
  { path: 'contact', loadChildren: './page/contact/contact.module#ContactPageModule' },
  { path: 'lang', loadChildren: './lang/lang.module#LangPageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
