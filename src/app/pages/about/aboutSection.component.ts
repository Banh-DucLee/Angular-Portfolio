import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { LanguageService } from '../../services/language/language.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-about-section',
  standalone: true,
  imports: [],
  templateUrl: './aboutSection.component.html',
  styleUrl: './aboutSection.component.scss'
})
export class AboutSectionComponent implements OnInit, OnDestroy {
  languageService: LanguageService = inject(LanguageService);

  private lnaguageSubcription!: Subscription;
  titleText: string = '';
  descriptionText: string = '';

  ngOnInit(): void {
      this.lnaguageSubcription = this.languageService.language$.subscribe((language) => {
        this.titleText = language == 'fr' ? `À Propos` : `About`;
        this.descriptionText = language == 'fr' ? `Passionné d'informatique depuis mon plus jeune âge, j'ai appris la programmation en autodidacte avant de suivre une formation pour devenir développeur web. J'aime concrétiser mes idées en écrivant un code élégant et efficace` : `Passionate about computer science from a young age, I taught myself programming before undertaking training to become a web developer. I enjoy bringing my ideas to life by writing elegant and efficient code`;
      })
  }

  ngOnDestroy(): void {
      this.lnaguageSubcription.unsubscribe();
  }
}
