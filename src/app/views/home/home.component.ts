import { Component } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';
import { CarouselItem } from '../../models/user.interface';
import { LanguageService } from '../../services/translate.service';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  constructor(private languageService: LanguageService) {
    this.languageService.currentLanguage.subscribe(
      (language: string) => (this.currentLanguage = language)
    );
  }

  public currentLanguage: string | undefined;
  public isEnglish: boolean = false;
  public changeLanguage() {
    this.currentLanguage = this.currentLanguage === 'es' ? 'en' : 'es';
    this.isEnglish = this.currentLanguage === 'en';
    this.languageService.changeLanguage(this.currentLanguage);
  }

  public images: CarouselItem[] = [
    {
      title: 'Community Platform',
      title_en: 'Community Platform',
      text_es:
        'CoPla le proporciona una plataforma vecinal desde la que gestionar <br> grandes comunidades de tipo residencial.',
      text_en:
        'CoPla provides you with a neighbourhood platform from which to manage <br> large residential communities.',
      url: '../../../assets/images/home_1.jpg',
    },
    {
      title: 'Reserva de instalaciones',
      title_en: 'Booking of facilities',
      text_es:
        'Gestione las reservas de todas las zonas comunes <br>que lo requieran, CoPla se adapta a las necesidades de su comunidad.',
      text_en:
        'Manage the reservations of all the common areas <br>that require it, CoPla adapts to the needs of your community.',
      url: '../../../assets/images/home_2.jpg',
    },
    {
      title: 'Comunicados y noticias',
      title_en: 'Press releases and news',
      text_es:
        'Manténgase informado sobre todas las novedades y convocatorias relacionadas<br> con su comunidad gracias a su tablón de avísos y noticias.',
      text_en:
        'Stay informed about all the news and announcements related to your community thanks to its notice and news board.',
      url: '../../../assets/images/home_3.jpg',
    },
    {
      title: 'Tablón de anuncios',
      title_en: 'Notice board',
      text_es:
        '  Gracias a su tablón de anuncios vecinal podrá publicar <br>sus propios anuncios o avisos para el resto de la comunidad.',
      text_en:
        ' Thanks to the neighbourhood noticeboard you can post <br>your own announcements or notices for the rest of the community.',
      url: '../../../assets/images/home_4.jpg',
    },
    {
      title: 'Comunicación directa',
      title_en: 'Direct communication',
      text_es:
        'Comuníquese sencilla y rápidamente con los gestores de su comunidad <br>para inforar de pequeños desperfectos, averías, consultar sus dudas o reclamar.',
      text_en:
        'Contact your community managers quickly and easily <br>to inform them of any minor damage, breakdowns, queries or complaints.',
      url: '../../../assets/images/home_5.jpg',
    },
  ];
}
