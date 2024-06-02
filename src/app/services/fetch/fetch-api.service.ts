import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

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

  public getSkills() {
    const endpoint = '/skills';
    this.http.get(this.url + endpoint).subscribe(
      (data: any) => {
        console.log(data);
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
}
