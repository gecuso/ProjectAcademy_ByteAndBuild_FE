import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './componenti/home/home.component';
import { ChisiamoComponent } from './componenti/footer/chisiamo/chisiamo.component';
import { CarrelloComponent } from './componenti/carrello/carrello.component';
import { LaptopComponent } from './componenti/laptop/laptop.component';
import { NotfoundComponent } from './componenti/notfound/notfound.component';

import { ProfileComponent } from './componenti/profile/profile.component';
import { RegisterComponent } from './componenti/register/register.component';
import { LoginComponent } from './login/login.component';


const routes: Routes = [
  {path:'', pathMatch:'full', redirectTo:'home'},
  {path: 'register' , component:RegisterComponent},
  {path: 'login' , component:LoginComponent},
  {path:'home', component:HomeComponent},
  {path:'chisiamo', component:ChisiamoComponent},
  {path: 'carrello', component:CarrelloComponent},
  {path: 'laptop', component:LaptopComponent},
  {path:'404', component:NotfoundComponent},
  {path:'profile', component:ProfileComponent},
  {path:'**', redirectTo:'404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
