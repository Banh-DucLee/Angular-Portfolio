import { Component, HostListener, OnDestroy, OnInit, inject } from '@angular/core';
import { Router, Routes, NavigationEnd, Event } from '@angular/router';
import { routes } from '../../app.routes';
import { filter } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { ModalStatusService } from '../../services/modal/modal-status.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-nav-indicators',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './nav-indicators.component.html',
  styleUrl: './nav-indicators.component.scss'
})
export class NavIndicatorsComponent implements OnInit, OnDestroy {
  modalStatusService: ModalStatusService = inject(ModalStatusService);

  private modalSubscription!: Subscription;
  isModalOpen: boolean = false;

  public routes: Routes = routes.filter(route => route.path && route.path !== '**' && route.path !== 'login');
  public activeRoute: string = '';
  private isNavigating: boolean = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.router.events
      .pipe(
        filter((event: Event): event is NavigationEnd => event instanceof NavigationEnd)
      )
      .subscribe((event: NavigationEnd) => {
        this.activeRoute = event.urlAfterRedirects;
      });
      this.modalSubscription = this.modalStatusService.isOpen$.subscribe((modalStatus) => {
        this.isModalOpen = modalStatus;
      });
  }

  ngOnDestroy(): void {
    this.modalSubscription.unsubscribe();
  }

  navigate(path: string): void {
    this.router.navigate([path]);
  }

  @HostListener('window:wheel', ['$event']) onScroll(event: WheelEvent) {
    if (!this.isModalOpen) {
      if (!this.isNavigating && this.activeRoute !== '/login') {
        this.isNavigating = true;
        if (event.deltaY > 0) {
          this.navigateToNext();
        } else {
          this.navigateToPrevious();
        }
        setTimeout(() => this.isNavigating = false, 750);
      }
    }
  }

  navigateToNext(): void {
    const currentIndex = this.routes.findIndex(route => route.path === this.activeRoute.substring(1));
    if (currentIndex < this.routes.length - 1) {
      const nextIndex = currentIndex + 1;
      const nextRoute = this.routes[nextIndex];
      this.navigate(nextRoute.path!);
    }
  }

  navigateToPrevious(): void {
    const currentIndex = this.routes.findIndex(route => route.path === this.activeRoute.substring(1));
    if (currentIndex > 0) {
      const previousIndex = currentIndex - 1;
      const previousRoute = this.routes[previousIndex];
      this.navigate(previousRoute.path!);
    }
  }
}
