import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule, NgClass } from '@angular/common';
import { AsideButton } from '../../models/user.interface';
import { LanguageService } from '../../services/translate.service';
import { RouterLinkActive, RouterModule } from '@angular/router';
@Component({
  selector: 'app-copla-aside',
  standalone: true,
  imports: [CommonModule, NgClass, RouterLinkActive, RouterModule],
  templateUrl: './copla-aside.component.html',
  styleUrl: './copla-aside.component.css',
})
export class CoplaAsideComponent {
  constructor(
    private languageService: LanguageService,
    private route: ActivatedRoute
  ) {
    /* this.currentLanguage = 'es'; */
    this.languageService.currentLanguage.subscribe(
      (language: string) => (this.currentLanguage = language)
    );
  }

  /* Change language */
  public currentLanguage!: string;
  public isEnglish: boolean = false;
  public changeLanguage() {
    /*  this.isEnglish = this.currentLanguage != 'es'; */

    this.currentLanguage = this.currentLanguage === 'es' ? 'en' : 'es';
    this.isEnglish = this.currentLanguage === 'en';
    this.languageService.changeLanguage(this.currentLanguage);
  }

  public rol: string = '';
  public actualRoute: string = '';

  public ngOnInit(): void {
    this.actualRoute = this.route.snapshot.url.join('/');
    this.getSessionData();
  }

  public getSessionData(): void {
    let data = sessionStorage.getItem('rol');
    if (data) {
      let jsonData = JSON.parse(data);
      this.rol = jsonData;
    } else {
      console.log('No data found for this key');
    }
  }
  public navItems: AsideButton[] = [
    { text: 'Inicio', text_en: 'Home', href: '/copla-home' },
    { text: 'Reservas', text_en: 'Bookings', href: '/copla-booking' },
    { text: 'Documentos', text_en: 'Documents', href: '/copla-documents' },
    { text: 'Contactar', text_en: 'Contact', href: '/copla-contact' },
    {
      text: 'Administración',
      text_en: 'Administration',
      href: '/copla-administration',
    },
    { text: 'Paquetería', text_en: 'Parcels', href: '' },
  ];

  public subNavItems: AsideButton[] = [
    {
      text: 'Registro',
      text_en: 'Registration',
      href: '/copla-parcels-registry',
    },
    {
      text: 'Consulta',
      text_en: 'Consultation',
      href: '/copla-parcels-consult',
    },
  ];
}
