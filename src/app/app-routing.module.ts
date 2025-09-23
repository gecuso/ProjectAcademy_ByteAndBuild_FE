import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './componenti/home/home.component';
import { ChisiamoComponent } from './componenti/footer/chisiamo/chisiamo.component';
import { LavoraConNoiComponent } from './componenti/lavora-con-noi/lavora-con-noi.component';
import { CarrelloComponent } from './componenti/carrello/carrello.component';
import { NotfoundComponent } from './componenti/notfound/notfound.component';
import { DettaglioProdottoComponent } from './componenti/dettaglio-prodotto/dettaglio-prodotto.component';
import { ProfileComponent } from './componenti/profile/profile.component';
import { DettagliUtenteComponent } from './componenti/dettagli-utente/dettagli-utente.component';
import { RegisterComponent } from './componenti/register/register.component';
import { LoginComponent } from './login/login.component';
import { authGuard } from './auth/auth.guard';
import { ListaProdottiComponent } from './componenti/lista-prodotti/lista-prodotti.component';
import { RicercaComponent } from './componenti/ricerca/ricerca.component';


const routes: Routes = [
  {path:'', pathMatch:'full', redirectTo:'home'},
  {path: 'register' , component:RegisterComponent},
  {path: 'login' , component:LoginComponent},
  {path:'home', component:HomeComponent},
  {path:'chisiamo', component:ChisiamoComponent},
  {path:'lavoraconnoi', component:LavoraConNoiComponent},
  {path: 'carrello', component:CarrelloComponent},
  {path:'404', component:NotfoundComponent},
  {path:'profile', component:ProfileComponent},
  {path:'ricerca', component:RicercaComponent},
  {path:'dettagliUtente', component:DettagliUtenteComponent, canActivate:[authGuard]},
  {path:'dettaglio/:id', component:DettaglioProdottoComponent, canActivate:[authGuard] },
  {path:'listaProdotti', component:ListaProdottiComponent},
  {path:'listaProdotti/:id', component:ListaProdottiComponent},
  {path:'**', redirectTo:'404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
