import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavBarAuthComponent } from './nav-bar-auth.component';

describe('NavBarAuthComponent', () => {
  let component: NavBarAuthComponent;
  let fixture: ComponentFixture<NavBarAuthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavBarAuthComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavBarAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
