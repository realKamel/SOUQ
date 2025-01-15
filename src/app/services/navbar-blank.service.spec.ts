import { TestBed } from '@angular/core/testing';

import { NavbarBlankService } from './navbar-blank.service';

describe('NavbarBlankService', () => {
  let service: NavbarBlankService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NavbarBlankService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
