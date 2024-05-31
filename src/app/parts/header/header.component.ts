import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { LanguageService } from '../../services/language/language.service';
import { Subscription } from 'rxjs';
import { ToggleButtonComponent } from '../../components/toggle-button/toggle-button.component';
import { NavButtonComponent } from '../nav-button/nav-button.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ToggleButtonComponent, NavButtonComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit, OnDestroy {
  languageService: LanguageService = inject(LanguageService);

  private languageSubscription!: Subscription;
  languageButtonIcon: string = '';


  ngOnInit(): void {
    this.languageSubscription = this.languageService.language$.subscribe((language) => {
      this.languageButtonIcon = language.toUpperCase();
    })
  }

  ngOnDestroy(): void {
    this.languageSubscription.unsubscribe();
  }

}
