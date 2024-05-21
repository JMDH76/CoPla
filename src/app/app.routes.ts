import { Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { AboutusComponent } from './views/aboutus/aboutus.component';
import { ContactComponent } from './views/contact/contact.component';
import { AccessComponent } from './views/access/access.component';
import { CoplaHomeComponent } from './views/copla-home/copla-home.component';
import { CoplaDocumentsComponent } from './views/copla-documents/copla-documents.component';
import { CoplaContactComponent } from './views/copla-contact/copla-contact.component';
import { CoplaBookingComponent } from './views/copla-booking/copla-booking.component';
import { CoplaParcelsConsultComponent } from './views/copla-parcels-consult/copla-parcels-consult.component';
import { CoplaParcelsRegistryComponent } from './views/copla-parcels-registry/copla-parcels-registry.component';
import { CoplaAdministrationComponent } from './views/copla-administration/copla-administration.component';
import { RegisterComponent } from './views/register/register.component';


export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutusComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'access', component: AccessComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'copla-home', component: CoplaHomeComponent },
  { path: 'copla-documents', component: CoplaDocumentsComponent },
  { path: 'copla-contact', component: CoplaContactComponent },
  { path: 'copla-booking', component: CoplaBookingComponent },
  { path: 'copla-parcels-consult', component: CoplaParcelsConsultComponent },
  { path: 'copla-parcels-registry', component: CoplaParcelsRegistryComponent },
  { path: 'copla-administration', component: CoplaAdministrationComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
];

