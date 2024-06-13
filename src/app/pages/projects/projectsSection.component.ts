import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { LanguageService } from '../../services/language/language.service';
import { Subscription } from 'rxjs';
import { FetchAPIService } from '../../services/fetch/fetch-api.service';
import { Project } from '../../interfaces/Project.interface';
import { ProjectComponent } from '../../components/project/project.component';
import { ModalComponent } from '../../components/modal/modal.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Skill } from '../../interfaces/Skill.inteface';

@Component({
  selector: 'app-projects-section',
  standalone: true,
  imports: [ProjectComponent, ModalComponent, ReactiveFormsModule],
  templateUrl: './projectsSection.component.html',
  styleUrl: './projectsSection.component.scss'
})
export class ProjectsSectionComponent {
@ViewChild(ModalComponent) modal!: ElementRef;
  languageService: LanguageService = inject(LanguageService);
  fetchAPIService: FetchAPIService = inject(FetchAPIService);

  private languageSubcription!: Subscription;
  titleText: string = '';

  private loginSubscription!: Subscription;
  isLogin: boolean = false;

  isModalOpen: boolean = false;

  projects: Project[] = [];
  skills: Skill[] = [];
  selectedSkills: string[] = [];

  projectForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    descriptionEnglish: new FormControl('' ,[Validators.required]),
    githubUrl: new FormControl(''),
    liveDemoUrl: new FormControl('')
  })
  selectedFile: File | null = null;

  ngOnInit(): void {
      this.languageSubcription = this.languageService.language$.subscribe((language) => {
        this.titleText = language == 'fr' ? `Mes Projets` : `My Projects`;
      })
      this.loginSubscription = this.fetchAPIService.isLogin$.subscribe((log) => {
        this.isLogin = log;
      })
      this.projects = this.fetchAPIService.getProjects();
      this.skills = this.fetchAPIService.getSkills();
  }

  ngOnDestroy(): void {
      this.languageSubcription.unsubscribe();
      this.loginSubscription.unsubscribe();
  }

  addSkill(skillId: string): void {
    if (skillId && !this.selectedSkills.includes(skillId)) {
      this.selectedSkills.push(skillId);
    }
  }

  removeSkill(id: string): void {
    this.selectedSkills = this.selectedSkills.filter( obj => {
      return obj !== id;
    });
  }

  getSkillName(id: string): string {
    const name = this.skills.find( s => s._id === id)?.name!;
    return name;
  }

  onSubmit(event: Event) {
    let project: Project = {
      _id: '',
      title: this.projectForm.get('title')?.value!,
      description: this.projectForm.get('description')?.value!,
      descriptionEnglish: this.projectForm.get('descriptionEnglish')?.value!,
      githubUrl: this.projectForm.get('githubUrl')?.value!,
      liveDemoUrl: this.projectForm.get('liveDemoUrl')?.value!,
      skills: this.selectedSkills,
      imageUrl: ''
    }
    this.fetchAPIService.createProject(project, this.selectedFile!);
    this.projectForm.reset();
    this.selectedSkills = [];
  }

  onFileChange(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.selectedFile = file;
    }
  }

}
