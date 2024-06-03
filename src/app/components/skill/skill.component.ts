import { Component, Input, OnDestroy, OnInit, inject } from '@angular/core';
import { Skill } from '../../interfaces/Skill.inteface';
import { FetchAPIService } from '../../services/fetch/fetch-api.service';
import { Subscription } from 'rxjs';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { matCloseRound } from '@ng-icons/material-icons/round';

@Component({
  selector: 'app-skill',
  standalone: true,
  imports: [NgIconComponent],
  viewProviders: [provideIcons({matCloseRound})],
  templateUrl: './skill.component.html',
  styleUrl: './skill.component.scss'
})
export class SkillComponent implements OnInit, OnDestroy {
@Input() skill: Skill = {
    _id: '',
    name: '',
    category:'',
    imageUrl: ''
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
      this.loginSubscription.unsubscribe();
  }
}
