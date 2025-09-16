import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriaService, Categoria } from '../../services/categoria.service';
import { AuthService } from '../../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit, OnDestroy {
  title = 'Byte&Build';
  searchTerm: string = '';
  isLoggedIn = false;
  categorie: Categoria[] = [];
  private authSub!: Subscription;

  constructor(private authService: AuthService, private router: Router, private categoriaService: CategoriaService,) {}

  ngOnInit(): void {
    this.authSub = this.authService.isLogged$.subscribe((status) => {
      this.isLoggedIn = status;
    });
    
    this.categoriaService.getCategorie().subscribe({
      next: (categorie) => {
        this.categorie = categorie;
      },
      error: (err) => {
        console.error('Errore nel caricamento categorie:', err);
      }
    });
  }
  

  logout(): void {
    this.authService.resetAll();
    this.router.navigate(['/home']);
  }

  ngOnDestroy(): void {
    if (this.authSub) this.authSub.unsubscribe(); 
    // con subscribe() (per ascoltare se l’utente è loggato o no)
    // Angular continua ad ascoltare anche dopo che il componente è chiuso. 
    // con onDestroy e usubscribe smette di "ascoltare se l'utente è loggato o no" evitando utilizzo di
    // memoria inutile
  }
}
