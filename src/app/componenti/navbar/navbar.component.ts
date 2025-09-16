import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
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
  private authSub!: Subscription;

  categorie = [
    { nome: 'Tutti i prodotti', link: '/laptop' },
    { nome: 'Laptop', link: '/laptop' },
    { nome: 'Monitor', link: '/laptop' },
    { nome: 'Case', link: '/laptop' },
    { nome: 'Mouse', link: '/laptop' },
    { nome: 'Schede grafiche', link: '/laptop' },
    { nome: 'Schede madri', link: '/laptop' },
    { nome: 'placeholder', link: '/laptop' },
    { nome: 'placeholder', link: '/laptop' },
  ];

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    // 🔁 Sottoscriviti al BehaviorSubject
    this.authSub = this.authService.isLogged$.subscribe((status) => {
      this.isLoggedIn = status;
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
