import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Component/home/home.component';
import { AboutComponent } from './Component/about/about.component';
import { ContactComponent } from './Component/contact/contact.component';
import { FeedBacksComponent } from './Component/feed-backs/feed-backs.component';

const routes: Routes = [
  {path : 'Home',component : HomeComponent},
  {path : 'About',component : AboutComponent},
  {path : 'Contact',component : ContactComponent},
  {path : 'Feedbacks',component : FeedBacksComponent},
  {path : '',redirectTo : '/Home' ,pathMatch : 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
