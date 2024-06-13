import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Skill } from '../../interfaces/Skill.inteface';
import { Project } from '../../interfaces/Project.interface';
import { About } from '../../interfaces/About.interface';
import { Social } from '../../interfaces/Social.interface';
import { Contact } from '../../interfaces/Contact.interface';

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
        console.error(error);
      }
    );
  }

  public logout() {
    this.isLogin.next(false);
    localStorage.removeItem('token');
  }

  public getAbout(): Observable<About[]> {
    const endpoint = '/abouts';
    let about: About[] = [];
  
    return this.http.get<About[]>(this.url + endpoint);
  }

  public createAbout(about: About, image: File): void {
    const endpoint = '/abouts';
    const formData: FormData = new FormData();
    formData.append('about', JSON.stringify(about));
    formData.append('image', image, image.name);

    const token = localStorage.getItem('token');

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http.post(this.url + endpoint, formData, { headers: headers }).subscribe(
      (data: any) => {
        console.log(data);
      },
      (error: any) => {
        console.error(error);
      }
    )
  }

  public modifyAbout(about: About, image: File): void {
    const endpoint = '/abouts/' + about._id;
    const formData: FormData = new FormData();
    formData.append('about', JSON.stringify(about));

    if (image) {
      formData.append('image', image, image.name);
    }

    const token = localStorage.getItem('token');

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http.put(this.url + endpoint, formData ,{headers: headers}).subscribe(
      (data: any) => {

      },
      (error: any) => {
        console.error(error);
      }
    )
  }

  public getSocials(): Social[] {
    const endpoint = '/socials';
    let socials: Social[] = [];

    this.http.get<Social[]>(this.url + endpoint).subscribe(
      (data: Social[]) => {
        socials.push(...data);
      },
      (error: any) => {
        console.error(error);
      }
    )

    return socials;
  }

  public getSocial(id: string): Social {
    const endpoint = '/socials/' + id;
    let social: Social = {
      _id: '',
      name: '',
      imageUrl: '',
      url: ''
    };
    this.http.get<Social>(this.url + endpoint).subscribe(
      (data: Social) => {
        social = data;
      },
      (error: any) => {
        console.error(error);
      }
    )

    return social;
  }

  public createSocial(social: Social, image: File): void {
    const endpoint = '/socials';
    const formData: FormData = new FormData();
    formData.append('social', JSON.stringify(social));
    formData.append('image', image, image.name);

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http.post(this.url + endpoint, formData, {headers: headers}).subscribe(
      (data: any) => {

      },
      (error: any) => {
        console.error(error);
      }
    )
  }

  public uploadResume(resume: File): void {
    const endpoint = '/resume';
    const formData: FormData = new FormData();
    formData.append('resume', resume, resume.name);

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    
    this.http.post(this.url + endpoint, formData, { headers: headers});
  }

  public getResume(): Observable<Blob> {
    const endpoint = '/resume';

    return this.http.get(this.url + endpoint, { responseType: 'blob' });
  }

  public getSkills(): Skill[] {
    const endpoint = '/skills';
    const skills: Skill[] = [];
    this.http.get<Skill[]>(this.url + endpoint).subscribe(
      (data: Skill[]) => {
        skills.push(...data);
      },
      (error: any) => {
        console.error(error);
      }
    );

    return skills;
  }

  public getSkill(id: string): Observable<Skill> {
    const endpoint = '/skills/' + id;
    return this.http.get<Skill>(this.url + endpoint);
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
        console.error(error);
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
        console.error(error);
      }
    );
  }

  public getProjects(): Project[] {
    const endpoint = '/projects';
    const projects: Project[] = [];

    this.http.get<Project[]>(this.url + endpoint).subscribe(
      (data: Project[]) => {
        projects.push(...data);
      }, 
      (error: any) => {
        console.error(error);
      }
    )

    return projects;
  }

  public getProjectById(id: string): Observable<Project> {
    const endpoint = '/projects/' + id;

    return this.http.get<{ project: Project }>(this.url + endpoint).pipe(map((response) => response.project));
  }

  public createProject(project: Project, image: File): void {
    const endpoint = '/projects';
    const projectJson = JSON.stringify(project);
    const formData: FormData = new FormData();
    formData.append('project', projectJson);
    formData.append('image', image, image.name);

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http.post(this.url + endpoint, formData, { headers: headers }).subscribe(
      (data: any) => {
        console.log(data);
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  public modifyProject(project: Project, image: File | null): Project {
    const endpoint = '/projects/' + project._id;
    let newProject: Project = {
      _id: '',
      title: '',
      imageUrl: '',
      description: '',
      descriptionEnglish: '',
      githubUrl: '',
      liveDemoUrl: '',
      skills: []
    };

    const formData: FormData = new FormData();
    const projectJson = JSON.stringify(project);

    formData.append('project', projectJson);

    if (image) {
      formData.append('image', image, image.name);
    }

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http.post<Project>(this.url + endpoint, formData, { headers: headers}).subscribe(
      (data: Project) => {
        newProject = data;
      },
      (error: any) => {
        console.error(error);
      }
    )

    return newProject;
  }

  public deleteProject(id: string): void {
    const endpoint = '/projects/' + id;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http.delete(this.url + endpoint, { headers: headers}).subscribe(
      (data: any) => {
        console.log(data);
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  public sendContact(contact: Contact): Observable<any> {
    const endpoint = '/contacts';

    return this.http.post(this.url + endpoint, contact);
  }

}
