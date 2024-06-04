import { Component, OnDestroy, OnInit, ViewChild, inject } from '@angular/core';
import { LanguageService } from '../../services/language/language.service';
import { Subscription, filter } from 'rxjs';
import { ToggleButtonComponent } from '../../components/toggle-button/toggle-button.component';
import { NavButtonComponent } from '../nav-button/nav-button.component';
import { FetchAPIService } from '../../services/fetch/fetch-api.service';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { matLogoutRound, matArrowBackIosNewRound } from '@ng-icons/material-icons/round'
import { NavigationEnd, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ToggleButtonComponent, NavButtonComponent, NgIconComponent, CommonModule],
  viewProviders: [provideIcons({matLogoutRound, matArrowBackIosNewRound})],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit, OnDestroy {
  @ViewChild('navButton') private navButton!: NavButtonComponent;
  languageService: LanguageService = inject(LanguageService);
  fetchAPIService: FetchAPIService = inject(FetchAPIService);

  private languageSubscription!: Subscription;
  languageButtonIcon: string = '';
  homeText: string = '';
  aboutText: string = '';
  skillsText: string = '';
  projectsText: string = '';
  contactText: string = '';

  private loginSubscription!: Subscription;
  isLogin: boolean = false;

  currentUrl: string = '';
  isOpen: boolean = false;

  constructor (private router: Router) {}

  ngOnInit(): void {
    this.languageSubscription = this.languageService.language$.subscribe((language) => {
      this.languageButtonIcon = language.toUpperCase();
      this.homeText = language == 'fr' ? `Accueil` : `Home`;
      this.aboutText = language == 'fr' ? `À Propos` : `About`;
      this.skillsText = language == 'fr' ? `Compétences` : `Skills`;
      this.projectsText = language == 'fr' ? `Projets` : `Projects`;
      this.contactText = language == 'fr' ? `Contact` : `Contact`;
    });
    this.loginSubscription = this.fetchAPIService.isLogin$.subscribe((log) => {
      this.isLogin = log;
    });
    this.router.events
    .pipe(
      filter((event: any): event is NavigationEnd => event instanceof NavigationEnd)
    )
    .subscribe((event: NavigationEnd) => {
      this.currentUrl = event.urlAfterRedirects;
    });
  }

  ngOnDestroy(): void {
    this.languageSubscription.unsubscribe();
    this.loginSubscription.unsubscribe();
  }

  isActive(link: string): boolean {
    return this.currentUrl === link || this.currentUrl.endsWith(link);
  }

  toggleOpen(): void {
    this.isOpen = !this.isOpen;
    this.navButton.toggle();
  }
}
