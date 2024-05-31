import { AfterViewInit, Component, ElementRef, EventEmitter, Output, QueryList, Renderer2, ViewChildren } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './nav-button.component.html',
  styleUrl: './nav-button.component.scss'
})
export class NavButtonComponent implements AfterViewInit {
  @Output() onClick = new EventEmitter<void>();
  @ViewChildren('dotRef') dotRefs!: QueryList<ElementRef>;

  dots: Array<Number> = Array(9).fill(0);

  private timeouts: any[] = [];

  constructor(private renderer: Renderer2) {
    this.dotRefs
  }

  ngAfterViewInit(): void {
    if (!this.dotRefs) {
      console.log('no dot refs');
      return;
    }
  }

  handleClick(): void {
    this.onClick.emit();
  }



  animateDots(): void {
    this.dotRefs.forEach((dotRef, i) => {
      if (i === 0) {
        const to0a = setTimeout(() => {
          this.renderer.addClass(dotRef.nativeElement, 'dot-0-anim');
          const to0h = setTimeout(() => {
            this.renderer.addClass(dotRef.nativeElement, 'dot-0-hover');
          }, 100);
          this.timeouts.push(to0h);
        }, 200);
        this.timeouts.push(to0a);
      }

      if (i === 1) {
        const to1a = setTimeout(() => {
          this.renderer.addClass(dotRef.nativeElement, 'dot-1-anim');
          const to1h = setTimeout(() => {
            this.renderer.addClass(dotRef.nativeElement, 'dot-1-hover');
          }, 100);
          this.timeouts.push(to1h);
        }, 600);
        this.timeouts.push(to1a);
      }

      if (i === 2) {
        const to2a = setTimeout(() => {
          this.renderer.addClass(dotRef.nativeElement, 'dot-2-anim');
          const to2h = setTimeout(() => {
            this.renderer.addClass(dotRef.nativeElement, 'dot-2-hover');
          }, 100);
          this.timeouts.push(to2h);
        }, 300);
        this.timeouts.push(to2a);
      }

      if (i === 3) {
        const to3a = setTimeout(() => {
          this.renderer.addClass(dotRef.nativeElement, 'dot-3-anim');
          const to3h = setTimeout(() => {
            this.renderer.addClass(dotRef.nativeElement, 'dot-3-hover');
          }, 100);
          this.timeouts.push(to3h);
        }, 800);
        this.timeouts.push(to3a);
      }

      if (i === 4) {
        this.renderer.addClass(dotRef.nativeElement, 'dot-4-anim');
      }

      if (i === 5) {
        const to5a = setTimeout(() => {
          this.renderer.addClass(dotRef.nativeElement, 'dot-5-anim');
          const to5h = setTimeout(() => {
            this.renderer.addClass(dotRef.nativeElement, 'dot-5-hover');
          }, 100);
          this.timeouts.push(to5h);
        }, 600);
        this.timeouts.push(to5a);
      }
      
      if (i === 6) {
        const to6a = setTimeout(() => {
          this.renderer.addClass(dotRef.nativeElement, 'dot-6-anim');
          const to6h = setTimeout(() => {
            this.renderer.addClass(dotRef.nativeElement, 'dot-6-hover');
          }, 100);
          this.timeouts.push(to6h);
        }, 500);
        this.timeouts.push(to6a);
      }

      if (i === 7) {
        const to7a = setTimeout(() => {
          this.renderer.addClass(dotRef.nativeElement, 'dot-7-anim');
          const to7h = setTimeout(() => {
            this.renderer.addClass(dotRef.nativeElement, 'dot-7-hover');
          }, 100);
          this.timeouts.push(to7h);
        }, 700);
        this.timeouts.push(to7a);
      }

      if (i === 8) {
        const to8a = setTimeout(() => {
          this.renderer.addClass(dotRef.nativeElement, 'dot-8-anim');
          const to8h = setTimeout(() => {
            this.renderer.addClass(dotRef.nativeElement, 'dot-8-hover');
          }, 100);
          this.timeouts.push(to8h);
        }, 400)
        this.timeouts.push(to8a);
      }
    })
  }

  animateDotsBack(): void {
    this.clearTimeout();
    this.dotRefs.forEach((dotRef, i) => {
      if (i === 0) {
        setTimeout(() => {
          this.renderer.removeClass(dotRef.nativeElement, 'dot-0-anim');
          this.renderer.removeClass(dotRef.nativeElement, 'dot-0-hover');
        }, 100);
      }

      if (i === 1) {
        this.renderer.removeClass(dotRef.nativeElement, 'dot-1-anim');
        this.renderer.removeClass(dotRef.nativeElement, 'dot-1-hover');
      }

      if (i === 2) {
        setTimeout(() => {
          this.renderer.removeClass(dotRef.nativeElement, 'dot-2-anim');
          this.renderer.removeClass(dotRef.nativeElement, 'dot-2-hover');
        }, 100);
      }

      if (i === 3) {
        this.renderer.removeClass(dotRef.nativeElement, 'dot-3-anim');
        this.renderer.removeClass(dotRef.nativeElement, 'dot-3-hover');
      }

      if (i === 4) {
        setTimeout(() => {
          this.renderer.removeClass(dotRef.nativeElement, 'dot-4-anim');
        }, 200);
      }

      if (i === 5) {
        this.renderer.removeClass(dotRef.nativeElement, 'dot-5-anim');
        this.renderer.removeClass(dotRef.nativeElement, 'dot-5-hover');
      }
      
      if (i === 6) {
        setTimeout(() => {
          this.renderer.removeClass(dotRef.nativeElement, 'dot-6-anim');
          this.renderer.removeClass(dotRef.nativeElement, 'dot-6-hover');
        }, 100);
      }

      if (i === 7) {
        this.renderer.removeClass(dotRef.nativeElement, 'dot-7-anim');
        this.renderer.removeClass(dotRef.nativeElement, 'dot-7-hover');
      }

      if (i === 8) {
        setTimeout(() => {
          this.renderer.removeClass(dotRef.nativeElement, 'dot-8-anim');
          this.renderer.removeClass(dotRef.nativeElement, 'dot-8-hover');
        }, 100)
      }
    })
  }

  private clearTimeout(): void {
    this.timeouts.forEach(t => {
      clearTimeout(t);
    })
    this.timeouts = [];
  }
}
