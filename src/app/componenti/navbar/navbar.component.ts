import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriaService } from '../../services/categoria.service';
import { AuthService } from '../../auth/auth.service';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';
import { Categoria } from '../../requests/general-req/general-req.component';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit, OnDestroy {
  title = 'Byte&Build';
  elementoCercato = '';
  isLoggedIn = false;
  categorie: Categoria[] = [];
  private authSub!: Subscription;
  searchTerm: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private categoriaService: CategoriaService
  ) {}

  ngOnInit(): void {
    this.authSub = this.authService.isLogged$.subscribe((status) => {
      this.isLoggedIn = status;
    });

    this.categoriaService.getCategorie().subscribe({
      next: (categorie) => {
        // Inserisce "Tutti i prodotti" in cima alla lista
        this.categorie = [
          { id: null, descrizione: 'Tutti i prodotti' },
          ...categorie,
        ];
      },
      error: (err) => {
        console.error('Errore nel caricamento categorie:', err);
      },
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

  capitalize(text: string): string {
    //funzione per mettere la prima lettera MAIUSCOLA e dividere il testo se trova una Maiuscola
    if (!text) return '';
    const spaced = text.replace(/([A-Z])/g, ' $1'); // aggiunge uno spazio prima di ogni maiuscola
    const trimmed = spaced.trim(); // rimuove eventuali spazi iniziali
    return trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
  }

  ricerca() {
    const element = (this.elementoCercato || '').trim();
    if (!element) return;
    this.router.navigate(['/ricerca'], {
      queryParams: { descrizione: element },
    });
  }
}
