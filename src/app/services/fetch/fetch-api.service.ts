import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Skill } from '../../interfaces/Skill.inteface';
import { Project } from '../../interfaces/Project.interface';

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

  public getSkill(id: string): Skill {
    const endpoint = '/skills/' + id;
    let skill: Skill = {
      _id: '',
      name: '',
      imageUrl: '',
      category: ''
    };
    this.http.get<Skill>(this.url + endpoint).subscribe(
      (data: Skill) => {
        skill = data;
      },
      (error: any) => {
        console.error(error);
      }
    )

    return skill;
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

  public getProject(id: string): Project {
    const endpoint = '/projects/' + id;
    let project: Project = {
      _id: '',
      title: '',
      imageUrl: '',
      description: '',
      descriptionEnglish: '',
      githubUrl: '',
      liveDemoUrl: '',
      skills: []
    };

    this.http.get<Project>(this.url + endpoint).subscribe(
      (data: Project) => {
        project = data;
      }, 
      (error: any) => {
        console.error(error);
      }
    )

    return project;
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
}
