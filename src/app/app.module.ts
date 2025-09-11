import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ComponentiComponent } from './componenti/componenti.component';
import { HomeComponent } from './componenti/home/home.component';
import { FormsModule } from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatBadgeModule} from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { NavbarComponent } from './componenti/navbar/navbar.component';
import { FooterComponent } from './componenti/footer/footer.component';
import { ChisiamoComponent } from './componenti/footer/chisiamo/chisiamo.component';
import { ProfileComponent } from './componenti/profile/profile.component';



@NgModule({
  declarations: [
    AppComponent,
    ComponentiComponent,
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    ChisiamoComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatIconModule,
    MatMenuModule,
    MatBadgeModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
