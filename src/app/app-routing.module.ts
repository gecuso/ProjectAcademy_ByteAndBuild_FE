import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './componenti/home/home.component';
import { ChisiamoComponent } from './componenti/footer/chisiamo/chisiamo.component';
import { LavoraConNoiComponent } from './componenti/lavora-con-noi/lavora-con-noi.component';
import { CarrelloComponent } from './componenti/carrello/carrello.component';
import { LaptopComponent } from './componenti/laptop/laptop.component';
import { NotfoundComponent } from './componenti/notfound/notfound.component';
import { DettaglioProdottoComponent } from './componenti/dettaglio-prodotto/dettaglio-prodotto.component';
import { ProfileComponent } from './componenti/profile/profile.component';
import { DettagliUtenteComponent } from './componenti/dettagli-utente/dettagli-utente.component';


const routes: Routes = [
  {path:'', pathMatch:'full', redirectTo:'home'},
  {path:'home', component:HomeComponent},
  {path:'chisiamo', component:ChisiamoComponent},
  {path:'lavoraconnoi', component:LavoraConNoiComponent},
  {path: 'carrello', component:CarrelloComponent},
  {path: 'laptop', component:LaptopComponent},
  {path:'404', component:NotfoundComponent},
  {path:'profile', component:ProfileComponent},
  {path:'dettagliUtente', component:DettagliUtenteComponent},
  {path:'dettaglio/:id', component:DettaglioProdottoComponent},
  {path:'**', redirectTo:'404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
