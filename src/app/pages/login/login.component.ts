import { Component, inject } from '@angular/core';
import { FetchAPIService } from '../../services/fetch/fetch-api.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LanguageService } from '../../services/language/language.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  languageService: LanguageService = inject(LanguageService);
  fetchService: FetchAPIService = inject(FetchAPIService);

  private languageSubscription!: Subscription;
  passwordText: string = '';
  buttonText: string = '';

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.required])
  });


  ngOnInit(): void {
      this.languageSubscription = this.languageService.language$.subscribe((language) => {
        this.passwordText = language == 'fr' ? `Mot de Passe` : `Password`;
        this.buttonText = language == 'fr' ? `Se Connecter` : `Login`;
      })
  }

  ngOnDestroy(): void {
      this.languageSubscription.unsubscribe();
  }

  onSubmit(event: Event) {
    event.preventDefault();
    this.fetchService.login(this.loginForm.get('email')!.value!, this.loginForm.get('password')!.value!);
  }
}
