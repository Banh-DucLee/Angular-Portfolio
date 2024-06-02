import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { LanguageService } from '../../services/language/language.service';
import { Subscription } from 'rxjs';
import { ToggleButtonComponent } from '../../components/toggle-button/toggle-button.component';
import { NavButtonComponent } from '../nav-button/nav-button.component';
import { FetchAPIService } from '../../services/fetch/fetch-api.service';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { matLogoutRound } from '@ng-icons/material-icons/round'
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ToggleButtonComponent, NavButtonComponent, NgIconComponent],
  viewProviders: [provideIcons({matLogoutRound})],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit, OnDestroy {
  languageService: LanguageService = inject(LanguageService);
  fetchAPIService: FetchAPIService = inject(FetchAPIService);

  private languageSubscription!: Subscription;
  languageButtonIcon: string = '';

  private loginSubscription!: Subscription;
  isLogin: boolean = false;

  ngOnInit(): void {
    this.languageSubscription = this.languageService.language$.subscribe((language) => {
      this.languageButtonIcon = language.toUpperCase();
    });
    this.loginSubscription = this.fetchAPIService.isLogin$.subscribe((log) => {
      this.isLogin = log;
    });
  }

  ngOnDestroy(): void {
    this.languageSubscription.unsubscribe();
    this.loginSubscription.unsubscribe();
  }

}
