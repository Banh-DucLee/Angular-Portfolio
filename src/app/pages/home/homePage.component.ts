import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { LanguageService } from '../../services/language/language.service';
import { Subscription } from 'rxjs';
import { SliderHomeComponent } from '../../parts/slider/slider-home.component';
import { AboutSectionComponent } from '../about/aboutSection.component';
import { SkillsSectionComponent } from '../skills/skillsSection.component';
import { ProjectsSectionComponent } from '../projects/projectsSection.component';
import { ContactSectionComponent } from '../contact/contactSection.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [SliderHomeComponent, AboutSectionComponent, SkillsSectionComponent, ProjectsSectionComponent, ContactSectionComponent],
  templateUrl: './homePage.component.html',
  styleUrl: './homePage.component.scss'
})
export class HomePageComponent implements OnInit, OnDestroy {
  languageService: LanguageService = inject(LanguageService);

  private languageSubscription!: Subscription;
  titleText: string = '';
  descriptionText: string = '';


  ngOnInit(): void {
      this.languageSubscription = this.languageService.language$.subscribe((language) => {
        this.titleText = language == 'fr' ? `Hey, je suis Duc-Lee Banh` : `Hey, I'm Banh Duc-Lee`;
        this.descriptionText = language == 'fr' ? `un développeur web front-end` : `a front-end web developer`;
      })
  }

  ngOnDestroy(): void {
      this.languageSubscription.unsubscribe();
  }

}
