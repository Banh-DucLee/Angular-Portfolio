import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { LanguageService } from '../../services/language/language.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit, OnDestroy {
  languageService: LanguageService = inject(LanguageService);

  private languageSubscription!: Subscription;
  languageButtonText: string = '';

  ngOnInit(): void {
    this.languageSubscription = this.languageService.language$.subscribe((language) => {
      this.languageButtonText = language.toUpperCase();
    })
  }

  ngOnDestroy(): void {
    this.languageSubscription.unsubscribe();
  }

}
