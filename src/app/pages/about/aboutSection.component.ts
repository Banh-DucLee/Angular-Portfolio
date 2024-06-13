import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { LanguageService } from '../../services/language/language.service';
import { Subscription } from 'rxjs';
import { FetchAPIService } from '../../services/fetch/fetch-api.service';
import { ModalComponent } from '../../components/modal/modal.component';
import { About } from '../../interfaces/About.interface';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Social } from '../../interfaces/Social.interface';
import { SocialComponent } from '../../components/social/social.component';

@Component({
  selector: 'app-about-section',
  standalone: true,
  imports: [SocialComponent, ModalComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './aboutSection.component.html',
  styleUrl: './aboutSection.component.scss'
})
export class AboutSectionComponent implements OnInit, OnDestroy {
  languageService: LanguageService = inject(LanguageService);
  fetchAPIService: FetchAPIService = inject(FetchAPIService);

  private languageSubcription!: Subscription;
  titleText: string = '';
  descriptionText: string = '';
  socialText: string = '';
  downloadText: string = '';

  private loginSubscription!: Subscription;
  isLogin: boolean = false;

  isModalOpen: boolean = false;

  aboutForm: FormGroup = new FormGroup({
    text: new FormControl('', [Validators.required]),
    textEnglish: new FormControl('', [Validators.required])
  })

  aboutFile: File | null = null;

  about: About = {
    _id: '',
    text: '',
    textEnglish: '',
    imageUrl: ''
  }

  socialForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    url: new FormControl('', [Validators.required])
  })
  socialFile: File | null = null;

  socials: Social[] = [];

  resumeFile: File | null = null;

  ngOnInit(): void {
    this.fetchAPIService.getAbout().subscribe((data: About[]) => {
      this.about = data[0];
      this.languageSubcription = this.languageService.language$.subscribe((language) => {
        this.titleText = language == 'fr' ? `À Propos` : `About`;
        this.descriptionText = language == 'fr' ? this.about.text : this.about.textEnglish;
        this.socialText = language == 'fr' ? `mes réseaux` : `my socials`;
        this.downloadText = language == 'fr' ? `Téléchargez mon CV` : `Download my resume`;
      })
    })
    this.socials = this.fetchAPIService.getSocials();
    this.loginSubscription = this.fetchAPIService.isLogin$.subscribe((log) => {
      this.isLogin = log;
    })
  }

  ngOnDestroy(): void {
      this.languageSubcription.unsubscribe();
  }

  onSubmitAbout(event: Event) {
    event.preventDefault();
    let newAbout: About = {
      _id: this.about._id,
      text: this.aboutForm.get('text')!.value,
      textEnglish: this.aboutForm.get('textEnglish')!.value,
      imageUrl: this.about.imageUrl
    }

    this.fetchAPIService.modifyAbout(newAbout, this.aboutFile!);
    this.aboutForm.reset();
  }

  onFileAboutChange(event: Event) {
    const file = (event.target as HTMLInputElement).files![0];
    this.aboutFile = file;
  } 

  onSubmitSocial(event: Event) {
    event.preventDefault();
    let newSocial: Social = {
      _id: '',
      name: this.socialForm.get('name')!.value,
      url: this.socialForm.get('url')!.value,
      imageUrl: ''
    }

    this.fetchAPIService.createSocial(newSocial, this.socialFile!);
    this.socialForm.reset();
  }

  onFileSocialChange(event: Event) {
    const file = (event.target as HTMLInputElement).files![0];
    this.socialFile = file;
  }

  onSubmitResume(event: Event) {
    event.preventDefault();
    this.fetchAPIService.uploadResume(this.resumeFile!);
  }

  onFileResumeChange(event: Event) {
    const file = (event.target as HTMLInputElement).files![0];
    this.resumeFile = file;
  }
}
