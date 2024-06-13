import { ChangeDetectorRef, Component, OnDestroy, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FetchAPIService } from '../../services/fetch/fetch-api.service';
import { Project } from '../../interfaces/Project.interface';
import { Skill } from '../../interfaces/Skill.inteface';
import { SkillComponent } from '../../components/skill/skill.component';
import { LanguageService } from '../../services/language/language.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-project-page',
  standalone: true,
  imports: [SkillComponent],
  templateUrl: './project-page.component.html',
  styleUrl: './project-page.component.scss'
})
export class ProjectPageComponent implements OnInit, OnDestroy {
  languageService: LanguageService = inject(LanguageService);
  fetchAPIService: FetchAPIService = inject(FetchAPIService);

  private languageSubcription!: Subscription;
  descriptionText: string = '';
  githubText: string = '';
  liveDemoText: string = '';

  project: Project = {
    _id: '',
    title: '',
    imageUrl: '',
    description: '',
    descriptionEnglish: '',
    githubUrl: '',
    liveDemoUrl: '',
    skills: []
  };

  stack: Skill[] = [];

  constructor(private route: ActivatedRoute) {}

  id: string | null = null;

  ngOnInit(): void {
      this.id = this.route.snapshot.paramMap.get('id');
      this.fetchAPIService.getProjectById(this.id!).subscribe((project: Project) => {
        this.project = project;
        this.project.skills.forEach((skill) => {
          this.fetchAPIService.getSkill(skill).subscribe((skill: Skill) => {
            this.stack.push(skill);
          })
        })
        this.languageSubcription = this.languageService.language$.subscribe((language) => {
          this.descriptionText = language == 'fr' ? project.description : project.descriptionEnglish;
          this.githubText = language == 'fr' ? `Lien GitHub` : `GitHub Link`;
          this.liveDemoText = language == 'fr' ? `Lien Démo` : `Demo Link`;
        })
      })
  }

  ngOnDestroy(): void {
      this.languageSubcription.unsubscribe();
  }
}
