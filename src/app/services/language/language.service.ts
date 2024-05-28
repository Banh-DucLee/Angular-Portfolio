import { Injectable, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private language = new BehaviorSubject<string>('fr');
  public language$ = this.language.asObservable();
  titleService: Title = inject(Title);
  
  public toggleLanguage(): void {
    if (this.language.value === 'fr') {
      this.language.next('en');
    } else {
      this.language.next('fr');
    }
    this.titleService.setTitle(this.language.value == 'fr' ? 'Duc-Lee Banh - Développeur Front-end' : 'Duc-Lee Banh - Developer Front-end');
  }
}
