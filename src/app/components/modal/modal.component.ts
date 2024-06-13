import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { matCloseRound } from '@ng-icons/material-icons/round';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [NgIconComponent],
  viewProviders: [provideIcons({ matCloseRound })],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {
@Input() isOpen: boolean = false;

@Output() onClick = new EventEmitter<void>();

  handleClick(): void {
    this.onClick.emit();
  }
}
