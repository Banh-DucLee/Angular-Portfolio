import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { LanguageService } from '../../services/language/language.service';
import { FetchAPIService } from '../../services/fetch/fetch-api.service';
import { Subscription } from 'rxjs';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Contact } from '../../interfaces/Contact.interface';

@Component({
  selector: 'app-contact-section',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './contactSection.component.html',
  styleUrl: './contactSection.component.scss'
})
export class ContactSectionComponent implements OnInit, OnDestroy {
  languageService: LanguageService = inject(LanguageService);
  fetchAPIService: FetchAPIService = inject(FetchAPIService);

  private languageSubcription!: Subscription;  
  text: string = '';

  nameText: string = '';
  emailText: string = '';
  messageText: string = '';
  buttonText: string = '';

  isSend: boolean = false;
  successText: string = '';
  successButtonText: string = '';

  contactForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    message: new FormControl('', [Validators.required])
  })

  ngOnInit(): void {
    this.languageSubcription = this.languageService.language$.subscribe((language) => {
      this.text = language == 'fr' ? `Merci d'avoir pris le temps de regarder mon portfolio ! Si vous souhaitez me contacter vous pouvez utiliser le formulaire de contact ou m'envoyer un mail directement à l'adresse suivante : ` : `Thank you for taking the time to view my portfolio! If you wish to contact me, you can use the contact form or send me an email directly at the following address : `;
      this.nameText = language == 'fr' ? 'Votre nom' : 'Your name';
      this.emailText = language == 'fr' ? 'Votre adresse email' : 'Your email address';
      this.messageText = language == 'fr' ? 'Votre message' : 'Your message';
      this.buttonText = language == 'fr' ? 'Envoyer' : 'Send';
      this.successText = language == 'fr' ? 'Votre message a bien été envoyé!' : 'Your message has been sent!';
      this.successButtonText = language == 'fr' ? 'Envoyer un autre' : 'Send another';
    })
  }

  ngOnDestroy(): void {
      this.languageSubcription.unsubscribe();
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    if (this.contactForm.valid) {
      let contact: Contact = {
        _id: '',
        name: this.contactForm.get('name')?.value!,
        email: this.contactForm.get('email')?.value!,
        message: this.contactForm.get('message')?.value!
      }

      console.log(contact);
      this.fetchAPIService.sendContact(contact).subscribe(
        (data: any) => {
          console.log(data);
          this.contactForm.reset();
          this.isSend = true;
        },
        (error: any) => {
          console.error(error);
        }
      );
    }
  }
}
