import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Skill } from '../../interfaces/Skill.inteface';

@Injectable({
  providedIn: 'root'
})
export class FetchAPIService implements OnInit {
  private url = 'http://localhost:3333/api';
  private isLogin = new BehaviorSubject<boolean>(false);
  public isLogin$ = this.isLogin.asObservable();
  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      this.isLogin.next(true);
    }
  }
  
  public login(email: string, password: string) {
    const endpoint = '/auth/login';
    this.http.post(this.url + endpoint, { email, password }).subscribe(
      (data: any) => {
        localStorage.setItem('token', data.token);
        this.isLogin.next(true);
        this.router.navigate(['/home']);
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  public logout() {
    this.isLogin.next(false);
    localStorage.removeItem('token');
  }

  public getSkills(): Skill[] {
    const endpoint = '/skills';
    const skills: Skill[] = [];
    this.http.get<Skill[]>(this.url + endpoint).subscribe(
      (data: Skill[]) => {
        console.log(data);
        skills.push(...data);
      },
      (error: any) => {
        console.log(error);
      }
    );

    return skills;
  }

  public createSkill(name: string, category: string, image: File) {
    const endpoint = '/skills';
    const formData: FormData = new FormData();
    formData.append('name', name);
    formData.append('category', category);
    formData.append('image', image, image.name);

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http.post(this.url + endpoint, formData, { headers: headers}).subscribe(
      (data: any) => {
        console.log(data);
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  public deleteSkill(id: string) {
    const endpoint = '/skills/' + id;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http.delete(this.url + endpoint, { headers: headers}).subscribe(
      (data: any) => {
        console.log(data);
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
}
