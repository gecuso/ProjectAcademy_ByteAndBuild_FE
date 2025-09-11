import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
    title = 'Byte&Build';
    searchTerm: string = '';  // definisci la proprietà
    categorie = [
    { nome: 'Laptop', link: '/laptop' },
    { nome: 'Monitor', link: '/laptop' },
    { nome: 'Case', link: '/laptop' },
    { nome: 'Mouse', link: '/laptop' },
    { nome: 'Schede grafiche', link: '/laptop' },
    { nome: 'Schede madri', link: '//laptop' },
    { nome: 'placeholder', link: '/laptop' },
    { nome: 'placeholder', link: '/laptop' },
  
    ];


}
