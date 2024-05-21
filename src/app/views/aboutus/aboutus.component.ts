import { Component } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import { Card } from '../../models/user.interface';
import { LanguageService } from '../../services/translate.service';

@Component({
    selector: 'app-aboutus',
    standalone: true,
    templateUrl: './aboutus.component.html',
    styleUrl: './aboutus.component.css',
    imports: [HeaderComponent ]
})
export class AboutusComponent {
  constructor(
    private languageService: LanguageService
  ) {
    this.languageService.currentLanguage.subscribe(
      (language: string) => (this.currentLanguage = language)
    );
  }

  /* Change language */
  public currentLanguage!: string;
  public isEnglish: boolean = false;
  public changeLanguage() {
    this.currentLanguage = this.currentLanguage === 'es' ? 'en' : 'es';
    this.isEnglish = this.currentLanguage === 'en';
    this.languageService.changeLanguage(this.currentLanguage);
  }

  public cards: Card[] = [
    {
      cardImageUrl: '../../../assets/images/us_1.png',
      cardImageAlt: 'Equipo de Community Platform',
      cardImageAlt_en: 'Community Platform Team',
      cardTitle: 'Nuestro equipo',
      cardTitle_en: "Our team",
      cardText: '&emsp;Somos un equipo joven y multidisciplinar que está preparado para ofrecerte el mejor soporte.',
      cardText_en: '&emsp;We are a young and multidisciplinary team that is ready to offer you the best support.',
    },
    {
      cardImageUrl: '../../../assets/images/us_2.jpg',
      cardImageAlt: 'Instalaciones de Community Platform',
      cardImageAlt_en: 'Community Platform facilities',
      cardTitle: 'Nuestras instalaciones',
      cardTitle_en: "Our facilities",
      cardText: '&emsp;Disponemos de los mejores recursos y de los equipos más modernos para que estés siempre actualizado.',
      cardText_en: '&emsp;We have the best resources and the most modern equipment so that you always will be up to date.',
    },
    {
      cardImageUrl: '../../../assets/images/us_3.jpg',
      cardImageAlt: 'Casos de éxito',
      cardImageAlt_en: 'Success stories',
      cardTitle: 'Casos de exito',
      cardTitle_en: "Success stories",
      cardText: '&emsp;Actualmente <strong>CoPla</strong> está instaurado en más de cien comunidades de vecinos en la provincia de Valencia.',
      cardText_en: '&emsp;Currently <strong>CoPla</strong> is installed in more than one hundred neighbourhood communities in the province of Valencia.',
    },
  ];
}
