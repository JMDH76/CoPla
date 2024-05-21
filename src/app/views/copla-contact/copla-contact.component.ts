import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { CoplaFooterComponent } from '../../components/copla-footer/copla-footer.component';
import { CoplaAsideComponent } from '../../components/copla-aside/copla-aside.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule, NgClass } from '@angular/common';
import { ApiService } from '../../services/api.service';
import {
  AlertMessages,
  Community,
  TranslationElement,
  User,
} from '../../models/user.interface';
import { LanguageService } from '../../services/translate.service';

@Component({
  selector: 'app-copla-contact',
  standalone: true,
  templateUrl: './copla-contact.component.html',
  styleUrl: './copla-contact.component.css',
  imports: [
    CommonModule,
    CoplaFooterComponent,
    HeaderComponent,
    CoplaAsideComponent,
    ReactiveFormsModule,
    NgClass,
    FormsModule,
  ],
})
export class CoplaContactComponent implements OnInit {
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

  public community: Community[] = [];
  public user: User[] = [];
  public case: number = 1;

  @Output() caseChange = new EventEmitter<number>();

  public onCaseChange(newCase: number) {
    this.case = newCase;
    this.caseChange.emit(this.case);
  }

  /* Breadcrumb */
  public breadcrumb: string = 'CoPla';
  public actualPage: TranslationElement = {
    es: 'Contactar',
    en: 'Contact',
  };

  public userName: string = '';
  public userCommunity: string = '';
  public contentText: string = '';

  public initialText: TranslationElement = {
    es: 'Mediante este formulario puede hacernos llegar sus sugerencias, reclamaciones, quejas o informar de cualquier tipo de desperfectos o incidencias.',
    en: 'Through this form you can send us your suggestions, claims, complaints or report any type of damage or incident.',
  };
  public publishAds: TranslationElement = {
    es: 'Si desea publicar un anuncio para el tablón de anuncios vecinal adjunte una imagen con un máximo de 15x15cm (relación 1:1) y una resolucion mínima de 96ppp.',
    en: 'If you wish to post an ad on the neighbourhood notice board, please attach an image with a maximum size of 15x15cm (1:1 ratio) and a minimum resolution of 96dpi.',
  };
  public formButtonText: TranslationElement = {
    es: 'Enviar',
    en: 'Send',
  };
  public formTitle: TranslationElement = {
    es: 'Contactar',
    en: 'Contact',
  };
  public formTitle2: TranslationElement = {
    es: 'Publicar un anuncio',
    en: 'Post an ad',
  };
  public uploadCorrectAlertMessage: AlertMessages = {
    es: 'Imagen subida correctamente',
    en: 'Image uploaded',
  };

  public ngOnInit() {
    this.getSessionData();
  }

  public getSessionData(): void {
    let user = sessionStorage.getItem('userId');
    let community = sessionStorage.getItem('communityId');
    if (user && community) {
      let jsonDataUser = JSON.parse(user);
      let jsonDataCommunity = JSON.parse(community);
      this.getUser(jsonDataUser);
      this.getCommunity(jsonDataCommunity);
    } else {
      console.log('No data found for this key');
    }
  }

  public getUser(id: string) {
    this.apiService.getUser(id).subscribe((user) => {
      this.user = user;
      let userN = user[0].name + ' ' + user[0].surnames;
      this.userName = userN;
    });
  }

  public getCommunity(id: string): void {
    this.apiService.getCommunity(id).subscribe((community) => {
      this.community = community;
      this.userCommunity = community[0].community_name;
    });
  }

  public sendEmail() {
    let subject = encodeURIComponent(
      this.userName + ' - ' + this.userCommunity
    );
    let body = encodeURIComponent(this.contentText);
    let mailtoLink = `mailto:josem.dominguez@hotmail.com?subject=${subject}&body=${body}`;
    window.location.href = mailtoLink;
    setTimeout(() => {
      this.contentText = '';
    }, 1000);
  }

  public selectedFiles: File[] | null = null;
  public imagePreview: string | null = null;
  public isImageSelected = false;

  public onFileSelected(event: Event) {
    const target = event.target as HTMLInputElement;
    const files: FileList = target.files as FileList;
    this.selectedFiles = Array.from(files);
    /* Show image */
    if (files.length > 0) {
      const reader = new FileReader();
      reader.onload = (e) => (this.imagePreview = e.target?.result as string);
      reader.readAsDataURL(files[0]);
      this.isImageSelected = true;
    }
  }

  @ViewChild('fileInput') fileInput: ElementRef | undefined;
  public onUpload() {
    if (this.selectedFiles) {
      this.selectedFiles.forEach((file) => {
        this.apiService.uploadImage(file).subscribe({
          next: (res) => {
            alert(this.uploadCorrectAlertMessage[this.currentLanguage]);
            this.imagePreview = '';
            this.isImageSelected = false;
          },
          error: (err) => console.error(err),
        });
      });
    }
  }

  public formInputFields: {
    fieldType: string;
    fieldId: string;
    fieldPlaceholder: string;
    fieldPlaceholder_en: string;
  }[] = [
    {
      fieldType: 'text',
      fieldId: 'name',
      fieldPlaceholder: '',
      fieldPlaceholder_en: '',
    },
    {
      fieldType: 'text',
      fieldId: 'address',
      fieldPlaceholder: '',
      fieldPlaceholder_en: '',
    },
    {
      fieldType: '',
      fieldId: 'message',
      fieldPlaceholder: 'Indíquenos sus comentarios, dudas o necesidades',
      fieldPlaceholder_en: 'Let us know your comments, questions or needs',
    },
  ];
}
