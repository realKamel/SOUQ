import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavBarBlankComponent } from './nav-bar-blank.component';

describe('NavBarBlankComponent', () => {
  let component: NavBarBlankComponent;
  let fixture: ComponentFixture<NavBarBlankComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavBarBlankComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavBarBlankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
