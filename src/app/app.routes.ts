import { Routes } from '@angular/router';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { HomePageComponent } from './pages/home/homePage.component';
import { LoginComponent } from './pages/login/login.component';
import { ProjectPageComponent } from './pages/project-page/project-page.component';
import { RedirectPageComponent } from './pages/redirect-page/redirect-page.component';

export const routes: Routes = [
    { path: '', redirectTo: '/redirect', pathMatch: 'full' },
    { path: 'redirect', component: RedirectPageComponent },
    { path: 'home', component: HomePageComponent },
    { path: 'login', component: LoginComponent },
    { path: 'project/:id', component: ProjectPageComponent },
    { path: '**', component: PageNotFoundComponent }
];
