import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { LanguageService } from '../../services/language/language.service';
import { Subscription } from 'rxjs';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-page-not-found',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './page-not-found.component.html',
  styleUrl: './page-not-found.component.scss'
})
export class PageNotFoundComponent implements OnInit, OnDestroy{
  languageService: LanguageService = inject(LanguageService);

  private languageSubcription!: Subscription;
  descriptionText: string = '';
  buttonText: string = '';
  

  ngOnInit(): void {
    this.languageSubcription = this.languageService.language$.subscribe((language) => {
      this.descriptionText = language == 'fr' ? 'La page que vous cherchez n\'existe pas' : 'The page you are looking for does not exist';
      this.buttonText = language == 'fr' ? 'Retour à la page l\'accueil' : 'Back to the main page';
    })
  }

  ngOnDestroy(): void {
      this.languageSubcription.unsubscribe();
  }
}
