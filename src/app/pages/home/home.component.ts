import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { LanguageService } from '../../services/language/language.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, OnDestroy {
  languageService: LanguageService = inject(LanguageService);

  private languageSubscription!: Subscription;
  titleText: string = '';
  descriptionText: string = '';


  ngOnInit(): void {
      this.languageSubscription = this.languageService.language$.subscribe((language) => {
        this.titleText = language == 'fr' ? `Hey, je suis Duc-Lee Banh` : `Hey, I'm Banh Duc-Lee`;
        this.descriptionText = language == 'fr' ? `Je suis un développeur web axé sur le front-end, créant des interfaces de sites et d'applications web élégantes et intuitives` : `I am a front-end web developer, creating elegant and intuitive interfaces for websites and web applications`;
      })
  }

  ngOnDestroy(): void {
      this.languageSubscription.unsubscribe();
  }

}
