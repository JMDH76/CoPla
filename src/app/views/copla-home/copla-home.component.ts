import {
  Component,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { CoplaFooterComponent } from '../../components/copla-footer/copla-footer.component';
import { CoplaAsideComponent } from '../../components/copla-aside/copla-aside.component';
import {
  Notice,
  TranslationElement,
} from '../../models/user.interface';
import { ApiService } from '../../services/api.service';
import { LanguageService } from '../../services/translate.service';

declare var bootstrap: any;

@Component({
  selector: 'app-copla-home',
  standalone: true,
  templateUrl: './copla-home.component.html',
  styleUrl: './copla-home.component.css',
  imports: [HeaderComponent, CoplaFooterComponent, CoplaAsideComponent],
})
export class CoplaHomeComponent implements OnInit {
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
  }

  /* modals */
  public openModalNotices(i: number): void {
    let myModal = new bootstrap.Modal(
      document.getElementById('carouselModal' + i)
    );
    myModal.show();
  }

  public openModalAds(i: number): void {
    let myModal = new bootstrap.Modal(
      document.getElementById('carouselModal2' + i)
    );
    myModal.show();
  }

  /* Header change */
  public case: number = 1;
  @Output() caseChange = new EventEmitter<number>();
  public onCaseChange(newCase: number) {
    this.case = newCase;
    this.caseChange.emit(this.case);
  }

  /* Breadcrumb */
  public breadcrumb: string = 'CoPla';
  public actualPage: TranslationElement = {
    es: 'Inicio',
    en: 'Home',
  };

  public newsTitle: TranslationElement = {
    es: 'Noticias',
    en: 'News',
  };
  public noticeBoard: TranslationElement = {
    es: 'Tablón de anuncios',
    en: 'Notice board',
  };
  /* Get sesion data */
  public ngOnInit(): void {
    this.getSessionData();
  }
  public getSessionData() {
    let community = sessionStorage.getItem('communityId');
    if (community) {
      this.community = JSON.parse(community);
      this.getAllNotices();
    } else {
      console.log('No se han encontrado datos');
    }
  }

  /* Get notices and ads */
  public allNotices: Notice[] = [];
  public community: string = '';

  public carousel1_Items: Notice[] = [];
  public carousel2_Items: Notice[] = [];

  public getAllNotices() {
    this.apiService.getAllNotices().subscribe((not) => {
      this.allNotices = not;
      this.noticesUrl();
    });
  }

  /* Extract urls */
  public noticesUrl() {
    this.allNotices.forEach((notice) => {
      if (notice.notice_type === 'comunicado') {
        this.carousel1_Items.push(notice);
      } else {
        this.carousel2_Items.push(notice);
      }
    });
  }
}
