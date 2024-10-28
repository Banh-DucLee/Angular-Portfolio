import { Component, Inject, inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { LanguageService } from '../../services/language/language.service';
import { Subscription } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-redirect-page',
  standalone: true,
  imports: [],
  templateUrl: './redirect-page.component.html',
  styleUrl: './redirect-page.component.scss'
})
export class RedirectPageComponent implements OnInit, OnDestroy{
  languageService: LanguageService = inject(LanguageService);

  private timeoutId!: any;

  private languageSubcription!: Subscription;
  titleText: string = '';
  descriptionText: string = '';
  buttonText: string = '';

  constructor(private router: Router, @Inject(PLATFORM_ID) private platformId: Object) { }

  ngOnInit(): void {

    if (isPlatformBrowser(this.platformId)) {
      this.timeoutId = setTimeout(() => {
        window.location.href = 'https://duclee-banh.dev';
      }, 5000);
    }
      this.languageSubcription = this.languageService.language$.subscribe((language) => {
        this.titleText = language == 'fr' ? `Ce portfolio est une version antérieure et n'est plus maintenu à jour.` : `This portfolio is outdated and no longer up-to-date.`;
        this.descriptionText = language == 'fr' ? `Vous serez automatiquement redirigé vers le nouveau portfolio dans 5 secondes.` : `You will be automatically redirected to the new portfolio in 5 seconds.`;
        this.buttonText = language == 'fr' ? `Cliquez ici pour voir l'ancien portfolio` : `Click here to view the old portfolio`;
      })
  }

  ngOnDestroy(): void {
    clearTimeout(this.timeoutId);
    if(this.languageSubcription) {
      this.languageSubcription.unsubscribe();
    }
  }

  redirectToHome() {
    this.router.navigate(['/home']);
    clearTimeout(this.timeoutId);
  }
}
