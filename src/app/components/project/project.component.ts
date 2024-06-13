import { Component, Input, inject } from '@angular/core';
import { Project } from '../../interfaces/Project.interface';
import { RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { matCloseRound } from '@ng-icons/material-icons/round';
import { FetchAPIService } from '../../services/fetch/fetch-api.service';

@Component({
  selector: 'app-project',
  standalone: true,
  imports: [RouterLink, NgIconComponent],
  viewProviders: [provideIcons({ matCloseRound })],
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

fetchAPIService: FetchAPIService = inject(FetchAPIService);

private loginSubscription!: Subscription;
isLogin: boolean = false;

ngOnInit(): void {
  this.loginSubscription = this.fetchAPIService.isLogin$.subscribe((log) => {
    this.isLogin = log;
  })
}

ngOnDestroy(): void {

}
}
