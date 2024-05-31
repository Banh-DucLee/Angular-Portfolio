import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { LanguageService } from '../../services/language/language.service';
import { Subscription } from 'rxjs';
import { SliderHomeComponent } from '../../parts/slider/slider-home.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SliderHomeComponent],
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
        this.descriptionText = language == 'fr' ? `Un développeur web axé sur le front-end` : `A front-end web developer`;
      })
  }

  ngOnDestroy(): void {
      this.languageSubscription.unsubscribe();
  }

}
