import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  AlertMessages,
  Community,
  TranslationElement,
  User,
} from '../../models/user.interface';
import { ApiService } from '../../services/api.service';
import { FormButtons, FormFieldGroup } from './register.interface';
import { CommonModule, NgClass } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RouterModule } from '@angular/router';
import { LanguageService } from '../../services/translate.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgClass,
    CommonModule,
    MatFormFieldModule,
    RouterModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  /* Form constructor */
  constructor(
    private apiService: ApiService,
    private languageService: LanguageService
  ) {
    this.profileForm = new FormGroup({
      community: new FormControl('', Validators.required),
      building: new FormControl('', Validators.required),
      floor: new FormControl('', Validators.required),
      door: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      surnames: new FormControl('', Validators.required),
      contact_phone: new FormControl('', Validators.required),
      contact_email: new FormControl('', [
        Validators.required,
        Validators.email,
      ]),
      nick: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      repitePassword: new FormControl('', Validators.required),
    });
    this.languageService.currentLanguage.subscribe(
      (language: string) => (this.currentLanguage = language)
    );
  }

  /* Form */
  public profileForm: FormGroup<{
    community: FormControl<string | null>;
    building: FormControl<string | null>;
    floor: FormControl<string | null>;
    door: FormControl<string | null>;
    name: FormControl<string | null>;
    surnames: FormControl<string | null>;
    contact_phone: FormControl<string | null>;
    contact_email: FormControl<string | null>;
    nick: FormControl<string | null>;
    password: FormControl<string | null>;
    repitePassword: FormControl<string | null>;
  }>;

  /* On submit */
  public onSubmit(): void {
    if (this.validateForm()) {
      const newUser: User = {
        user_id: '',
        nick: this.profileForm.value.nick ?? '',
        password: this.profileForm.value.password ?? '',
        rol: '',
        create_date: new Date(),
        name: this.profileForm.value.name ?? '',
        surnames: this.profileForm.value.surnames ?? '',
        community_id: this.profileForm.value.community ?? '',
        building: this.profileForm.value.building ?? '',
        floor: this.profileForm.value.floor ?? '',
        door: this.profileForm.value.door ?? '',
        contact_phone: this.profileForm.value.contact_phone ?? '',
        contact_email: this.profileForm.value.contact_email ?? '',
      };
      this.insertNewUser(newUser);
    } else {
      alert(this.voidFieldAlertMessage[this.currentLanguage]);
    }
  }

  public communities: Community[] = [];
  public ngOnInit(): void {
    this.getCommunities();
  }

  /* Change language */
  public currentLanguage!: string;
  public isEnglish: boolean = false;
  public changeLanguage() {
    this.currentLanguage = this.currentLanguage === 'es' ? 'en' : 'es';
    this.isEnglish = this.currentLanguage === 'en';
    this.languageService.changeLanguage(this.currentLanguage);
  }

  public formTitle: TranslationElement = {
    es: 'Formulario de registro',
    en: 'Registration form',
  };

  public selectInitialOption: TranslationElement = {
    es: 'Elija una comunidad...',
    en: 'Choose a community...',
  };

  public voidFieldAlertMessage: TranslationElement = {
    es: 'Rellene todos los campos',
    en: 'complete all the fields',
  };

  public invalidEmailAlertMesssage: TranslationElement = {
    es: 'Añada una dirección de correo válida',
    en: 'Add a valid email address',
  };

  public nonEqualPasswordAlertMesssage: TranslationElement = {
    es: 'Las contraseñas no coinciden',
    en: "Passwords don't match",
  };

  /* Form validator */
  public validateForm() {
    let flag: boolean = true;
    if (this.getPasswords()) {
      if (this.profileForm.controls['contact_email'].errors) {
        if (this.profileForm.controls['contact_email'].errors['required']) {
          flag = false;
        }
        if (this.profileForm.controls['contact_email'].errors['email']) {
          alert(this.invalidEmailAlertMesssage[this.currentLanguage]);
          flag = false;
        }
      }
      if (
        this.profileForm.controls['floor'].errors ||
        this.profileForm.controls['door'].errors ||
        this.profileForm.controls['name'].errors ||
        this.profileForm.controls['community'].errors ||
        this.profileForm.controls['name'].errors ||
        this.profileForm.controls['surnames'].errors ||
        this.profileForm.controls['contact_phone'].errors ||
        this.profileForm.controls['nick'].errors ||
        this.profileForm.controls['password'].errors ||
        this.profileForm.controls['repitePassword'].errors
      ) {
        flag = false;
      }
    } else {
      flag = false;
    }
    return flag;
  }

  /* Confirm equal password */
  public getPasswords(): boolean {
    let flag: boolean = true;
    const pass1 = this.profileForm.controls['password'].value;
    const pass2 = this.profileForm.controls['repitePassword'].value;
    flag = pass1 === pass2 ? true : false;
    if (!flag) alert(this.nonEqualPasswordAlertMesssage[this.currentLanguage]);
    return flag;
  }

  /* POST User*/
  public insertNewUser(user: User): void {
    this.apiService.insertNewUser(user).subscribe((data) => {
      const confirmUserCreationAlertMessage: AlertMessages = {
        es: `El usuario '${user.nick}' se ha creado correctamente`,
        en: `User '${user.nick}' has been created successfully`,
      };
      alert(confirmUserCreationAlertMessage[this.currentLanguage]);
    });
    this.profileForm.reset();
  }

  /* Get Communities */
  public getCommunities(): void {
    this.apiService.getCommunities().subscribe((communities) => {
      this.communities = communities;
      console.log(this.communities);
    });
  }
  
  /* Form data */
  public formFieldsGroup1: FormFieldGroup[] = [
    {
      type: 'text',
      id: 'name',
      placeholder: 'Escriba su nombre',
      placeholder_en: 'Enter your name',
    },
    {
      type: 'text',
      id: 'surnames',
      placeholder: 'Escriba sus apellidos',
      placeholder_en: 'Enter your surname',
    },
  ];

  public formFieldsGroup2: FormFieldGroup[] = [
    {
      type: 'text',
      id: 'building',
      placeholder: 'Portal',
      placeholder_en: 'Portal',
    },
    { type: 'text', id: 'floor', placeholder: 'Piso', placeholder_en: 'Floor' },
    { type: 'text', id: 'door', placeholder: 'Puerta', placeholder_en: 'Door' },
  ];

  public formFieldsGroup3: FormFieldGroup[] = [
    {
      type: 'text',
      id: 'contact_phone',
      placeholder: 'Teléfono de contacto',
      placeholder_en: 'Contact phone',
    },
    {
      type: 'email',
      id: 'contact_email',
      placeholder: 'Correo electrónico de contacto',
      placeholder_en: 'Contact email',
    },
  ];

  public formFieldsGroup4: FormFieldGroup[] = [
    {
      type: 'text',
      id: 'nick',
      placeholder: 'Escriba un nombre de usuario',
      placeholder_en: 'Enter a username',
    },
  ];

  public formFieldsGroup5: FormFieldGroup[] = [
    {
      type: 'password',
      id: 'password',
      placeholder: 'Escriba una contraseña',
      placeholder_en: 'Enter a password',
    },
    {
      type: 'password',
      id: 'repitePassword',
      placeholder: 'Repita la contraseña',
      placeholder_en: 'Repeat the password',
    },
  ];

  public buttons: FormButtons[] = [
    {
      type: 'submit',
      text: 'Guardar',
      text_en: 'Save',
      state: false,
      link: '/register',
    },
    {
      type: 'reset',
      text: 'Cancelar',
      text_en: 'Cancel',
      state: false,
      link: '/register',
    },
    {
      type: 'button',
      text: 'Volver',
      text_en: 'Back',
      state: false,
      link: '/access',
    },
  ];
}
