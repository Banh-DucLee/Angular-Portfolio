import { Component, inject } from '@angular/core';
import { LanguageService } from '../../services/language/language.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent {
  languageService: LanguageService = inject(LanguageService);

  private lnaguageSubcription!: Subscription;
  titleText: string = '';

  ngOnInit(): void {
      this.lnaguageSubcription = this.languageService.language$.subscribe((language) => {
        this.titleText = language == 'fr' ? `Mes Projets` : `My Projects`;
      })
  }

  ngOnDestroy(): void {
      this.lnaguageSubcription.unsubscribe();
  }

}
