import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import {
  User,
  Community,
  TranslationElement,
} from '../../models/user.interface';
import { Router } from '@angular/router';
import { CoplaFooterComponent } from '../../components/copla-footer/copla-footer.component';
import { CommonModule, NgClass } from '@angular/common';
import { LanguageService } from '../../services/translate.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-access',
  standalone: true,
  templateUrl: './access.component.html',
  styleUrl: './access.component.css',
  imports: [
    ReactiveFormsModule,
    CoplaFooterComponent,
    NgClass,
    CommonModule,
    RouterModule,
  ],
})
export class AccessComponent implements OnInit {
  /* GET user data */
  public users: User[] = [];
  public user: User[] = [];
  public communities: Community[] = [];
  public community: Community[] = [];

  constructor(
    private apiService: ApiService,
    private router: Router,
    private languageService: LanguageService
  ) {
    this.languageService.currentLanguage.subscribe((language: string) => {
      this.currentLanguage = language;
    });
  }

  /* Change language */
  public currentLanguage!: string;
  public isEnglish: boolean = false;
  public changeLanguage() {
    this.currentLanguage = this.currentLanguage === 'es' ? 'en' : 'es';
    this.isEnglish = this.currentLanguage === 'en';
    this.languageService.changeLanguage(this.currentLanguage);
  }

  public ngOnInit() {
    this.getUsers();
  }

  public getUsers() {
    this.apiService.getUsers().subscribe((users) => {
      this.users = users;
    });
  }

  /* form data */
  public dbPassword: string = '';
  public dbUser: string = '';
  public dbUserIndex: string = '';
  public index: number = -1;
  public formUser: string = '';
  public formPassword: string = '';
  public userControl: boolean = false;
  public passControl: boolean = false;

  public accessForm = new FormGroup({
    user: new FormControl('', { nonNullable: true }),
    password: new FormControl('', { nonNullable: true }),
  });

  public nonExisentUserAlertMessage: TranslationElement = {
    es: 'Usuario inexistente',
    en: 'Non-existent user',
  };
  public voidFieldAlertMessage: TranslationElement = {
    es: 'Usuario o contraseña vacios. Inserte de nuevo',
    en: 'Empty username or password. Insert it again',
  };

  public accessGrantedAlertMessage: TranslationElement = {
    es: 'Acceso permitido',
    en: 'Access granted',
  };

  public formTitle: TranslationElement = {
    es: 'Acceso Área privada',
    en: 'Private area access',
  };

  public initialText: TranslationElement = {
    es: 'Acceda al área privada de su comunidad de vecinos',
    en: "Access to your Neighbourhood's private area",
  };

  public formBottonText: TranslationElement = {
    es: 'Acceder',
    en: 'Access',
  };

  public onSubmit(): void {
    this.formUser = this.accessForm.getRawValue().user;
    this.formPassword = this.accessForm.getRawValue().password;
    this.accessForm.reset();

    if (this.formUser != '' && this.formPassword != '') {
      for (let i = 0; i < this.users.length; i++) {
        if (this.users[i].nick === this.formUser) {
          this.index = i;
          break;
        }
      }
      if (this.index !== -1) {
        this.userControl = this.users[this.index].nick.includes(this.formUser);
        this.passControl = this.users[this.index].password.includes(
          this.formPassword
        );
        this.control(this.userControl, this.passControl);
      } else {
        alert(this.nonExisentUserAlertMessage[this.currentLanguage]);
      }
    } else {
      alert(this.voidFieldAlertMessage[this.currentLanguage]);
    }
  }

  public control(user: boolean, pass: boolean): void {
    if (user === true && pass === true) {
      /* falta desarrollar Modal */
      alert(this.accessGrantedAlertMessage[this.currentLanguage]);

      const user = [this.users[this.index]];
      sessionStorage.setItem('userId', JSON.stringify(user[0].user_id));
      sessionStorage.setItem('rol', JSON.stringify(user[0].rol));
      this.router.navigate(['/copla-home']);
      this.users = [];
    } else alert('Error de acceso');
  }

  public formInputFields: {
    fieldType: string;
    fieldId: string;
    fieldPlaceholder: string;
    fieldPlaceholder_en: string;
  }[] = [
    {
      fieldType: 'text',
      fieldId: 'user',
      fieldPlaceholder: 'Introduzca su nombre de usuario',
      fieldPlaceholder_en: 'Please enter your user name',
    },
    {
      fieldType: 'password',
      fieldId: 'password',
      fieldPlaceholder: 'Introduzca su contraseña',
      fieldPlaceholder_en: 'Please enter your password',
    },
  ];

  public accessTexts: { text: string; text_en: string; href: string }[] = [
    {
      text: 'Recuperar contraseña',
      text_en: 'Recover password',
      href: '',
    },
    {
      text: 'Registrar',
      text_en: 'Register',
      href: '/register',
    },
  ];
}
