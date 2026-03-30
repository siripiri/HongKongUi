import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderCard } from './header-card';

describe('HeaderCard', () => {
  let component: HeaderCard;
  let fixture: ComponentFixture<HeaderCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderCard],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
