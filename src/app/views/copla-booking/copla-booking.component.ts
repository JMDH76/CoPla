import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { HeaderComponent } from '../../components/header/header.component';
import { CoplaFooterComponent } from '../../components/copla-footer/copla-footer.component';
import {
  AlertMessages,
  Booking,
  TranslationElement,
} from '../../models/user.interface';
import { ApiService } from '../../services/api.service';
import { CoplaAsideComponent } from '../../components/copla-aside/copla-aside.component';
import { LanguageService } from '../../services/translate.service';

@Component({
  selector: 'app-copla-booking',
  standalone: true,
  templateUrl: './copla-booking.component.html',
  styleUrl: './copla-booking.component.css',
  imports: [
    HeaderComponent,
    CoplaFooterComponent,
    ReactiveFormsModule,
    FormsModule,
    CoplaAsideComponent,
  ],
})
export class CoplaBookingComponent implements OnInit {
  public case: number = 1;
  public allBookings: Booking[] = [];
  public bookings: Booking[] = [];
  public booking: Booking[] = [];
  public availability: string = '';
  public user: string = '';
  public community: string = '';
  public bg: string = 'bg-transparent';

  @Output() caseChange = new EventEmitter<number>();
  public onCaseChange(newCase: number) {
    this.case = newCase;
    this.caseChange.emit(this.case);
  }

  constructor(
    private apiService: ApiService,
    private languageService: LanguageService
  ) {
    this.reservationForm = new FormGroup({
      installation: new FormControl('Seleccione una instalación...'),
      reservationDate: new FormControl(this.getCurrentDate()),
      reservationTime: new FormControl(),
    });
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

  /* Breadcrumb */
  public breadcrumb: string = 'CoPla';
  public actualPage: TranslationElement = {
    es: 'Reservas',
    en: 'Bookings',
  };

  public ngOnInit(): void {
    this.getSessionData();
    this.getAllBookings();
    this.getBookings(this.user);
  }

  public getBookings(id: string) {
    this.apiService.getBookings(id).subscribe((book) => {
      this.bookings = book;
    });
  }

  public getAllBookings() {
    this.apiService.getAllBookings().subscribe((book) => {
      this.allBookings = book;
    });
  }

  public bookInsertedAlertMessage: AlertMessages = {
    es: 'Su reserva ha sido registrada',
    en: 'Your booking has been registered',
  };

  public bookEliminatedAlertMessage: AlertMessages = {
    es: 'Reserva eliminada correctamente',
    en: 'Reserve successfully deleted',
  };

  public deleteBooking(item: string): void {
    this.apiService.deleteBooking(item).subscribe((data) => {
      if (data) {
        alert(this.bookEliminatedAlertMessage[this.currentLanguage]);
      }
      this.ngOnInit();
    });
  }

  public insertBoking(booking: Booking): void {
    this.apiService.insertBoking(booking).subscribe((data) => {
      alert(this.bookInsertedAlertMessage[this.currentLanguage]);
    });
    this.ngOnInit();
  }

  /* Form data */
  public reservationForm: FormGroup<{
    installation: FormControl<string | null>;
    reservationDate: FormControl<string | null>;
    reservationTime: FormControl<string | null>;
  }>;

  public floatingMessage: TranslationElement = {
    es: 'El horario de reservas es de 08:00 a 22:00h',
    en: 'Booking hours are from 08:00AM to 22:00PM.',
  };

  public reservationOptions: { text: string; text_en: string }[] = [
    {
      text: 'Seleccione una instalación...',
      text_en: 'Select an installation...',
    },
    { text: 'Sala Social', text_en: 'Social Lounge' },
    { text: 'Pista de Pádel', text_en: 'Padel court' },
  ];

  public buttons: { text: string; text_en: string; state: boolean }[] = [
    { text: 'Comprobar', text_en: 'Check', state: false },
    { text: 'Reservar', text_en: 'Book', state: true },
    { text: 'Cancelar', text_en: 'Cancel', state: true },
  ];

  public voidFieldAlertMessage: AlertMessages = {
    es: 'Rellene todos los campos',
    en: 'Please fill in all the fields',
  };

  public nonReservableDateAlertMessage: AlertMessages = {
    es: 'Fecha y hora no reservables',
    en: 'Date and time not reservable',
  };

  public nonAvailableAlertMessage: TranslationElement = {
    es: 'No disponible',
    en: 'Not available',
  };

  public availableAlertMessage: TranslationElement = {
    es: 'disponible',
    en: 'available',
  };

  public timeZone: { value: string; select: string }[] = [
    { value: '08:00:00', select: '08:00 - 09:00' },
    { value: '09:00:00', select: '09:00 - 10:00' },
    { value: '10:00:00', select: '10:00 - 11:00' },
    { value: '11:00:00', select: '11:00 - 12:00' },
    { value: '12:00:00', select: '12:00 - 13:00' },
    { value: '13:00:00', select: '13:00 - 14:00' },
    { value: '14:00:00', select: '14:00 - 15:00' },
    { value: '15:00:00', select: '15:00 - 16:00' },
    { value: '16:00:00', select: '16:00 - 17:00' },
    { value: '17:00:00', select: '17:00 - 18:00' },
    { value: '18:00:00', select: '18:00 - 19:00' },
    { value: '19:00:00', select: '19:00 - 20:00' },
    { value: '20:00:00', select: '20:00 - 21:00' },
    { value: '21:00:00', select: '21:00 - 22:00' },
  ];

  public onSubmit(): void {
    this.availability = '';
  }

  /* Today date for the form init*/
  public getCurrentDate(): string {
    const date = new Date();
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }

  /* Get user and community data from sessionStorage*/
  public getSessionData() {
    let user = sessionStorage.getItem('userId');
    let community = sessionStorage.getItem('communityId');
    if (user && community) {
      this.user = JSON.parse(user);
      this.community = JSON.parse(community);
    } else {
      console.log('No se han encontrado datos');
    }
  }

  public formDateFormat(): Date {
    /* actual date and hour */
    let formDate = this.reservationForm.value.reservationDate;
    let formTime = this.reservationForm.value.reservationTime;
    let dateTime = `${formDate}T${formTime}`;
    let dateObject = new Date(dateTime);
    return dateObject;
  }

  /* Check if there ara availability */
  public checkAvailability(): void {
    const date = this.reservationForm.value.reservationDate;
    const hour = this.reservationForm.value.reservationTime;
    const today = new Date();
    const formDate = this.formDateFormat();
    const reservationTime = this.reservationForm.value.reservationTime;
    const reservationDate = this.reservationForm.value.reservationDate;
    let installation = this.reservationForm.value.installation;

    if (
      installation !== null &&
      reservationTime !== null &&
      reservationDate !== null
    ) {
      if (formDate.getTime() < today.getTime()) {
        this.availability =
          this.nonReservableDateAlertMessage[this.currentLanguage];
        this.bg = 'bg-danger text-white rounded-4';
      } else {
        for (let i = 0; i < this.allBookings.length; i++) {
          if (
            date === this.allBookings[i].booking_date &&
            hour === this.allBookings[i].booking_time
          ) {
            if (this.currentLanguage === 'es') {
              this.availability =
                installation +
                ' ' +
                this.nonAvailableAlertMessage[this.currentLanguage];
            } else if (this.currentLanguage === 'en') {
              const enValue = this.reservationOptions.find(
                (en) => en.text === installation
              );
              this.availability =
                enValue?.text_en +
                ' ' +
                this.nonAvailableAlertMessage[this.currentLanguage];
            }
            this.bg = 'bg-warning text-dark rounded-4';
            break;
          } else {
            if (this.currentLanguage === 'es') {
              this.availability =
                installation +
                ' ' +
                this.availableAlertMessage[this.currentLanguage];
            } else if (this.currentLanguage === 'en') {
              const enValue = this.reservationOptions.find(
                (en) => en.text === installation
              );
              this.availability =
                enValue?.text_en +
                ' ' +
                this.availableAlertMessage[this.currentLanguage];
            }
            this.bg = 'bg-success text-white rounded-4';
          }
        }
      }
    } else {
      /* A futuro detectar qué campos están vacíos e indicarlos */
      /* A futuro modal */
      this.availability = this.voidFieldAlertMessage[this.currentLanguage];
      this.bg = 'bg-primary text-white rounded-4';
    }
  }

  /* Buttons functions */
  public clickButton(button: number) {
    const installation = this.reservationForm.value.installation;
    switch (button) {
      case 1:
        this.availability = '';
        this.checkAvailability();
        this.buttons[button].state = true;
        this.buttons[button + 1].state = false;
        if (
          this.availability ===
          installation + ' ' + this.availableAlertMessage[this.currentLanguage]
        ) {
          this.buttons[button].state = false;
        }
        break;

      case 2 /* A futuro crear confirmación antes de borrar en modal */:
        if (
          this.availability ===
          installation + ' ' + this.availableAlertMessage[this.currentLanguage]
        ) {
          if (
            this.reservationForm.value.reservationDate &&
            this.reservationForm.value.reservationTime &&
            installation
          ) {
            const book: Booking = {
              booking_id: '',
              booking_user_id: this.user,
              booking_timestamp: new Date(),
              booking_date: this.reservationForm.value.reservationDate,
              booking_installation: installation,
              booking_time: this.reservationForm.value.reservationTime,
              booking_community_id: this.community,
            };
            this.insertBoking(book);
          } else {
            alert('Error');
          }
          this.reservationForm.reset();
          this.availability = '';
          this.bg = 'bg-transparent';
          this.buttons[button].state = true;
          this.buttons[button - 1].state = true;
        } else {
          alert(this.nonReservableDateAlertMessage[this.currentLanguage]);
        }
        break;

      case 3:
        this.reservationForm.reset();
        this.availability = '';
        this.buttons[button - 2].state = true;
        this.buttons[button - 1].state = true;
        this.bg = 'bg-transparent';
        break;

      default:
        console.log('Switch error');
    }
  }
}
