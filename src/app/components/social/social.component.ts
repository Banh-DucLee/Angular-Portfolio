import { Component, Input } from '@angular/core';
import { Social } from '../../interfaces/Social.interface';

@Component({
  selector: 'app-social',
  standalone: true,
  imports: [],
  templateUrl: './social.component.html',
  styleUrl: './social.component.scss'
})
export class SocialComponent {
  @Input() social: Social = {
    _id: '',
    name: '',
    imageUrl: '',
    url: ''
  };

}
