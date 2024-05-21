import { Component } from '@angular/core';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { CommonModule, TranslationWidth } from '@angular/common';
import { AlertMessages, TranslationElement } from '../../models/user.interface';
import { LanguageService } from '../../services/translate.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css',
})
export class ContactComponent {
  contactForm = new FormGroup({
    name: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.email]),
    message: new FormControl('', Validators.required),
  });

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

  public mailtoErrorAlertMessage: AlertMessages = {
    es: 'Falta algún dato o no es correcto. Inténtelo de nuevo',
    en: 'Some data is missing or incorrect. Please try again',
  };

  public sendEmail() {
    if (this.contactForm.valid) {
      let { name, address, email, message } = this.contactForm.value;
      let subject = `Solicitud de ${name} (${address})`;
      message = message || '';
      let body = `Email: ${email}\n\n Mensaje: ${message}`;
      let emailCopla = 'josem.dominguez@hotmail.com';
      window.location.href = `mailto:${emailCopla}?subject=${encodeURIComponent(
        subject
      )}&body=${encodeURIComponent(body)}`;
    } else {
      /* pendiente modal con mensaje */
      alert(this.mailtoErrorAlertMessage[this.currentLanguage]);
    }
    this.contactForm.reset();
  }

  public initialText: TranslationElement = {
    es: '&emsp;¿Desea ampliar información o tiene dudas sobre nuestro producto o servicios? ¿Le interesa que uno de nuestros comerciales visite su comunidad, les informe en persona y les haga una demostración? No dude en contactar con nosotros por teléfono o rellenando el siguiente formulario y nos pondremos en contacto con usted para resolver todas sus necesidades',
    en: '&emsp;Would you like more information or do you have any doubts about our product or services? Would you like one of our sales representatives visit your community, inform you in person and give you a demonstration? Do not doubt in contacting us by phone or by filling the following form and we will get in contact with you to solve all your needs.',
  };

  public formTitle: TranslationElement = {
    es: 'Formulario de Contacto',
    en: 'Contact Form',
  };

  public formButtonText: TranslationElement = {
    es: 'Enviar',
    en:'Send',
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
      fieldPlaceholder: 'Su nombre y apellidos',
      fieldPlaceholder_en: 'Your name and surname',
    },
    {
      fieldType: 'text',
      fieldId: 'address',
      fieldPlaceholder: 'Dirección de su comunidad',
      fieldPlaceholder_en: 'Your community address',
    },
    {
      fieldType: 'email',
      fieldId: 'email',
      fieldPlaceholder: 'Su direccón de correo electrónico',
      fieldPlaceholder_en: 'Your e-mail address',
    },
    {
      fieldType: '',
      fieldId: 'message',
      fieldPlaceholder: 'Indíquenos sus necesidades o dudas',
      fieldPlaceholder_en: 'Please let us know your needs or questions',
    },
  ];
}
