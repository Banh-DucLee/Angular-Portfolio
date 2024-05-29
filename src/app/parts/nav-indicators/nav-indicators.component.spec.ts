import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavIndicatorsComponent } from './nav-indicators.component';

describe('NavIndicatorsComponent', () => {
  let component: NavIndicatorsComponent;
  let fixture: ComponentFixture<NavIndicatorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavIndicatorsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NavIndicatorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
