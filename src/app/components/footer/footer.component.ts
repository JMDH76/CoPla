import { Component } from '@angular/core';
import { LanguageService } from '../../services/translate.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent {
  constructor(private languageService: LanguageService) {
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

  public companyName: string = 'Community Platform';
  public companyAddress: string =
    'C/ de les Barques, 1<br>46002 Valencia<br>96 555 555 555<br>copla&#64;copla.es';
  public copyrigth: string =
    '&copy;&nbsp;2024<br>Todos los derechos reservados';
  public copyrigth_en: string="&copy;&nbsp;2024<br>All rights reserved";

  public companyMap: {
    url: string;
    href: string;
    alt: string;
    alt_en: string;
  } = {
    url: '../../../assets/images/map.png',
    href: 'https://maps.app.goo.gl/8Tj6YDZV6cTm32e39',
    alt: 'mapa con la ubicación  de la empresa',
    alt_en: 'map with the location of the company',
  };
  public imageLogo: string = '../../../assets/logos/logo.png';
  public termsTexts: { text_es: string; text_en: string; format: string }[] = [
    {
      text_es: 'Política de privacidad',
      text_en: 'Privacy policy',
      format: 'col-6 text-end my-3',
    },
    {
      text_es: 'Términos y condiciones',
      text_en: 'Terms and Conditions',
      format: 'col-6 text-start my-3',
    },
  ];
  public socialImages: {
    url: string;
    alt: string;
    alt_en: string;
  }[] = [
    {
      url: '.../../../../../assets/icons/instagram.png',
      alt: 'Logotipo de Instagram',
      alt_en: 'Instagram logo',
    },
    {
      url: '.../../../../../assets/icons/facebook.png',
      alt: 'Logotipo de Facebook',
      alt_en: 'Facebookk logo',
    },
    {
      url: '.../../../../../assets/icons/youtube.png',
      alt: 'Logotipo de Youtube',
      alt_en: 'Youtube logo',
    },
    {
      url: '.../../../../../assets/icons/x.png',
      alt: 'Logotipo X',
      alt_en: 'X logo',
    },
  ];
}
