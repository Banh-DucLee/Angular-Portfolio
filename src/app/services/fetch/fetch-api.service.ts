import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FetchAPIService {
  private url = 'http://localhost:3333/api';
  public isLogin: boolean = false;
  constructor(private http: HttpClient) { }

  public login(email: string, password: string) {
    const endpoint = '/auth/login';
    this.http.post(this.url + endpoint, { email, password }).subscribe(
      (data: any) => {
        localStorage.setItem('token', data.token);
        this.isLogin = true;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  public logout() {
    this.isLogin = false;
    localStorage.removeItem('token');
  }
}
