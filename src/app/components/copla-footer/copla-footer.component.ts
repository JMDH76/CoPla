import { Component } from '@angular/core';
import { LanguageService } from '../../services/translate.service';
@Component({
  selector: 'app-copla-footer',
  standalone: true,
  imports: [],
  templateUrl: './copla-footer.component.html',
  styleUrl: './copla-footer.component.css',
})
export class CoplaFooterComponent {
  public version: string = 'v0.0.1';
  public year: number = new Date().getFullYear();

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
}
