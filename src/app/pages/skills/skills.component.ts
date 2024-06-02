import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { LanguageService } from '../../services/language/language.service';
import { Subscription } from 'rxjs';
import { FetchAPIService } from '../../services/fetch/fetch-api.service';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.scss'
})
export class SkillsComponent implements OnInit, OnDestroy {
  languageService: LanguageService = inject(LanguageService);
  fetchAPIService: FetchAPIService = inject(FetchAPIService);

  private languageSubcription!: Subscription;  
  titleText: string = '';

  private loginSubscription!: Subscription;
  isLogin: boolean = false;

  ngOnInit(): void {
      this.languageSubcription = this.languageService.language$.subscribe((language) => {
        this.titleText = language == 'fr' ? `Mes Compétences` : `My Skills`;
      })
      this.loginSubscription = this.fetchAPIService.isLogin$.subscribe((log) => {
        this.isLogin = log;
      })
      this.fetchAPIService.getSkills();
  }

  ngOnDestroy(): void {
      this.languageSubcription.unsubscribe();
      this.loginSubscription.unsubscribe();
  }

  modify() {}
}
