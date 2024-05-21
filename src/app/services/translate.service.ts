import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private language = new BehaviorSubject<string>('es');
  currentLanguage = this.language.asObservable();

  changeLanguage(language: string) {
    this.language.next(language);
  }
}
