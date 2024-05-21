import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { CoplaFooterComponent } from '../../components/copla-footer/copla-footer.component';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Doc, TranslationElement } from '../../models/user.interface';
import { CoplaAsideComponent } from '../../components/copla-aside/copla-aside.component';
import { LanguageService } from '../../services/translate.service';

@Component({
  selector: 'app-copla-documents',
  standalone: true,
  templateUrl: './copla-documents.component.html',
  styleUrl: './copla-documents.component.css',
  imports: [
    HeaderComponent,
    CoplaFooterComponent,
    ReactiveFormsModule,
    CoplaAsideComponent,
  ],
})
export class CoplaDocumentsComponent implements OnInit {
  /* Change header */
  public case: number = 1;
  @Output() caseChange = new EventEmitter<number>();
  public onCaseChange(newCase: number) {
    this.case = newCase;
    this.caseChange.emit(this.case);
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
  }

  /* Breadcrumb */
  public breadcrumb: string = 'CoPla';
  public actualPage: TranslationElement = {
    es: 'Documentos',
    en: 'Documents',
  };

  public selectOption: TranslationElement = {
    es: 'Actas',
    en: 'Minutes',
  };

  public selectOptions: { text: string; text_en: string }[] = [
    { text: 'Actas', text_en: 'Minutes' },
    {
      text: 'Estatutos y normas de la comunidad',
      text_en: 'Community statutes and rules',
    },
    { text: 'Páginas web de interés', text_en: 'Interesting websites' },
    {
      text: 'Otros documentos de interés',
      text_en: 'Other relevant documents',
    },
  ];

  public communityId: string = '0';
  public documents: Doc[] = [];
  public listDocuments: Doc[] = [];
  public commonDocuments: Doc[] = [];

  public ngOnInit(): void {
    this.getSessionData();
  }

  public getSessionData(): void {
    let data = sessionStorage.getItem('communityId');
    if (data) {
      this.communityId = JSON.parse(data);
      this.getDocument(this.communityId);
      this.getDocument('0');
    } else {
      console.log('No data found for this key');
    }
  }

  public getDocument(id: string): void {
    if (id != '0') {
      this.apiService.getDocument(id).subscribe((doc) => {
        this.documents = doc;
        this.presentDocuments(this.selectOption.es);
      });
    } else {
      this.apiService.getDocument(id).subscribe((doc) => {
        this.commonDocuments = doc;
        this.presentDocuments(this.selectOption.es);
      });
    }
  }

  public presentDocuments(type: string): void {
    this.listDocuments = [];
    switch (type) {
      case 'Actas':
        for (let document of this.documents) {
          if (document.document_type === 'minute')
            this.listDocuments.push(document);
        }
        break;
      case 'Estatutos y normas de la comunidad':
        for (let document of this.documents) {
          if (document.document_type === 'community standards')
            this.listDocuments.push(document);
        }
        break;
      case 'Otros documentos de interés':
        for (let document of this.documents) {
          if (document.document_type === 'others')
            this.listDocuments.push(document);
        }
        for (let document of this.commonDocuments) {
          if (document.document_type === 'others')
            this.listDocuments.push(document);
        }
        break;
      case 'Páginas web de interés':
        for (let document of this.documents) {
          if (document.document_type === 'web')
            this.listDocuments.push(document);
        }
        for (let document of this.commonDocuments) {
          if (document.document_type === 'web')
            this.listDocuments.push(document);
        }
        break;
      default:
        alert('No existen documentos');
    }
  }

  public selectValue(event: Event) {
    const selectedElement = event.target as HTMLSelectElement;
    this.selectOption.es =
      this.selectOptions[parseInt(selectedElement.value) - 1].text;
    this.selectOption.en =
      this.selectOptions[parseInt(selectedElement.value) - 1].text_en;
    this.listDocuments = [];
    this.presentDocuments(this.selectOption.es);
  }

  public selectValues: { type: string; bdName: string; selected: string }[] = [
    {
      type: 'Actas',
      bdName: 'minute',
      selected: 'selected',
    },
    {
      type: 'Estatutos y normas de la comunidad',
      bdName: 'community standards',
      selected: '',
    },
    {
      type: 'Otros documentos de interés',
      bdName: 'others',
      selected: '',
    },
    {
      type: 'Páginas web de interés',
      bdName: 'web',
      selected: '',
    },
  ];
}
