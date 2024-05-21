import { Component, Input } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Community, User } from '../../models/user.interface';
import { ApiService } from '../../services/api.service';
import { CommonModule, NgClass } from '@angular/common';
import { LanguageService } from '../../services/translate.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule, NgClass],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  @Input() case: number = 0;

  public imageLogo: string = '../../../assets/logos/logo.png';
  public platformHeaderText: string = 'Comunidad de vecinos';
  public platformHeaderText_en: string = 'Neighbourhood';
  public communityId: string = '';
  public completeUserName: string = '';
  public userRol: string = '';
  public communityName: string | void = '';

  public userId: string = '';

  /* Users data */
  public ngOnInit() {
    this.getSessionData();
  }

  constructor(
    private apiService: ApiService,
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
    this.getUser(this.userId);
  }

  public community: Community[] = [];
  public user: User[] = [];

  public getCommunity(id: string) {
    this.apiService.getCommunity(id).subscribe((community) => {
      this.community = community;
      this.communityName = community[0].community_name;
    });
  }

  public userRol_en: string = ';';
  public getUser(id: string) {
    this.apiService.getUser(id).subscribe((user) => {
      this.user = user;
      this.completeUserName = user[0].name + ' ' + user[0].surnames;

      if (this.currentLanguage === 'es') {
        this.userRol = user[0].rol;
      } else if (this.currentLanguage === 'en') {
        switch (user[0].rol) {
          case 'Administrador':
            this.userRol_en = 'Administrator';
            break;
          case 'Usuario':
            this.userRol_en = 'User';
            break;
          case 'Recepción':
            this.userRol_en = 'Reception';
            break;
          default:
            this.userRol_en = 'Unknow';
            break;
        }
      }

      this.userRol = user[0].rol;
      this.communityName = this.getCommunity(user[0].community_id);
      sessionStorage.setItem(
        'communityId',
        JSON.stringify(user[0].community_id)
      );
    });
  }

  public getSessionData() {
    let data = sessionStorage.getItem('userId');
    if (data) {
      let jsonData = JSON.parse(data);
      this.getUser(jsonData);
    } else {
      console.log('No data found for this key');
    }
  }

  public configButtons: {
    url: string;
    url2: string;
    alt: string;
    alt_en: string;
    width: number;
  }[] = [
    {
      url: '../../../assets/icons/flag_1.png',
      url2: '../../../assets/icons/flag_2.png',
      alt: 'Traducir al inglés',
      alt_en: 'Translate to English',
      width: 25,
    },
    {
      url: '../../../assets/icons/gear.png',
      url2: '../../../assets/icons/gear.png',
      alt: 'Configuración tema',
      alt_en: 'Theme configuration',
      width: 30,
    },
  ];

  public navBottons: {
    routerLink: string;
    title_es: string;
    title_en: string;
  }[] = [
    {
      routerLink: 'home',
      title_es: 'Inicio',
      title_en: 'Home',
    },
    {
      routerLink: 'about',
      title_es: 'Nosotros',
      title_en: 'About us',
    },
    {
      routerLink: 'contact',
      title_es: 'Contacta',
      title_en: 'Contact',
    },
    {
      routerLink: 'access',
      title_es: 'Area Privada',
      title_en: 'Private area',
    },
  ];
}
