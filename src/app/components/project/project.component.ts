import { Component, Input, inject } from '@angular/core';
import { Project } from '../../interfaces/Project.interface';
import { RouterLink } from '@angular/router';
import { LanguageService } from '../../services/language/language.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-project',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './project.component.html',
  styleUrl: './project.component.scss'
})
export class ProjectComponent {
@Input() project: Project = {
  _id: '',
  title: '',
  imageUrl: '',
  description: '',
  descriptionEnglish: '',
  githubUrl: '',
  liveDemoUrl: '',
  skills: []
};

languageService: LanguageService = inject(LanguageService);

private languageSubcription!: Subscription;

ngOnInit(): void {
    this.languageSubcription = this.languageService.language$.subscribe((language) => {
      //this.titleText = language == 'fr' ? this.project.title : this.project.titleEnglish;
    })
}

ngOnDestroy(): void {
    this.languageSubcription.unsubscribe();
}
}
