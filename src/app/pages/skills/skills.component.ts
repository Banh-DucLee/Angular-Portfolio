import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { LanguageService } from '../../services/language/language.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.scss'
})
export class SkillsComponent implements OnInit, OnDestroy {
  languageService: LanguageService = inject(LanguageService);

  private lnaguageSubcription!: Subscription;
  titleText: string = '';

  ngOnInit(): void {
      this.lnaguageSubcription = this.languageService.language$.subscribe((language) => {
        this.titleText = language == 'fr' ? `Mes Compétences` : `My Skills`;
      })
  }

  ngOnDestroy(): void {
      this.lnaguageSubcription.unsubscribe();
  }
}
