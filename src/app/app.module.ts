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
import { CarrelloComponent } from './componenti/carrello/carrello.component';
import { LaptopComponent } from './componenti/laptop/laptop.component';
import {MatCardModule} from '@angular/material/card';
import { NotfoundComponent } from './componenti/notfound/notfound.component';
import {MatRadioModule} from '@angular/material/radio';
import {MatSliderModule} from '@angular/material/slider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ProfileComponent } from './componenti/profile/profile.component';
import { DettaglioProdottoComponent } from './componenti/dettaglio-prodotto/dettaglio-prodotto.component';
import { LavoraConNoiComponent } from './componenti/lavora-con-noi/lavora-con-noi.component';
import { ProdottiComponentComponent } from './componenti/prodotti-component/prodotti-component.component';
import { DettagliUtenteComponent } from './componenti/dettagli-utente/dettagli-utente.component';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';






@NgModule({
  declarations: [
    AppComponent,
    ComponentiComponent,
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    ChisiamoComponent,
    CarrelloComponent,
    LaptopComponent,
    NotfoundComponent,
    ProfileComponent,
    DettaglioProdottoComponent,
    LavoraConNoiComponent,
    ProdottiComponentComponent,
    DettagliUtenteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatIconModule,
    MatMenuModule,
    MatBadgeModule,
    MatButtonModule,
    MatCardModule,
    MatRadioModule,
    MatSliderModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
