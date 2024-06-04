import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { matCloseRound } from '@ng-icons/material-icons/round';
import { ModalStatusService } from '../../services/modal/modal-status.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [NgIconComponent],
  viewProviders: [provideIcons({ matCloseRound })],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent implements OnInit, OnDestroy {
  modalStatusService: ModalStatusService = inject(ModalStatusService);

  private modalSubscription!: Subscription;
  isModalOpen: boolean = false;

  ngOnInit(): void {
      this.modalSubscription = this.modalStatusService.isOpen$.subscribe((modalStatus) => {
        this.isModalOpen = modalStatus;
      })
  }

  ngOnDestroy(): void {
      this.modalSubscription.unsubscribe();
  }

  goTo(path: string) {

  }
}
