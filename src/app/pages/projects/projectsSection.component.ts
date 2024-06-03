import { Component, inject } from '@angular/core';
import { LanguageService } from '../../services/language/language.service';
import { Subscription } from 'rxjs';
import { FetchAPIService } from '../../services/fetch/fetch-api.service';

@Component({
  selector: 'app-projects-section',
  standalone: true,
  imports: [],
  templateUrl: './projectsSection.component.html',
  styleUrl: './projectsSection.component.scss'
})
export class ProjectsSectionComponent {
  languageService: LanguageService = inject(LanguageService);
  fetchAPIService: FetchAPIService = inject(FetchAPIService);

  private languageSubcription!: Subscription;
  titleText: string = '';

  private loginSubscription!: Subscription;
  isLogin: boolean = false;

  ngOnInit(): void {
      this.languageSubcription = this.languageService.language$.subscribe((language) => {
        this.titleText = language == 'fr' ? `Mes Projets` : `My Projects`;
      })
      this.loginSubscription = this.fetchAPIService.isLogin$.subscribe((log) => {
        this.isLogin = log;
      })
  }

  ngOnDestroy(): void {
      this.languageSubcription.unsubscribe();
      this.loginSubscription.unsubscribe();
  }

  modify() {
    
  }

}
