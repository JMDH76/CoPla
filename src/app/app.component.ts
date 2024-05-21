import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, RouterOutlet, Router } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [
        CommonModule,
        RouterOutlet,
        HeaderComponent,
        FooterComponent,
        HttpClientModule,
        ReactiveFormsModule,
    ]
})
export class AppComponent {
  title = 'copla';

  /* Quitar los header y footer de  donde nos interesa sustituirlos */
  mostrarHeader: boolean = true;
  mostrarFooter: boolean = true;
  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const rutasSinFooter = [
          '/access',
          '/copla-home',
          '/copla-documents',
          '/copla-contact',
          '/copla-booking',
          '/copla-parcels-consult',
          '/copla-parcels-registry',
          '/copla-administration',
          '/copla-parcels',
        ]; //don't show routes
        this.mostrarFooter = !rutasSinFooter.includes(event.url);
      }
      if (event instanceof NavigationEnd) {
        const rutasSinHeader = [
          '/copla-home',
          '/copla-documents',
          '/copla-contact',
          '/copla-booking',
          '/copla-parcels-consult',
          '/copla-parcels-registry',
          '/copla-administration',
          '/copla-parcels',
        ]; //don't show routes
        this.mostrarHeader = !rutasSinHeader.includes(event.url);
      }
    });
  }
}
