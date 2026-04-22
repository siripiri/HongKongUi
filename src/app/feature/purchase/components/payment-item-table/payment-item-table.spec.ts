import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentItemTable } from './payment-item-table';

describe('PaymentItemTable', () => {
  let component: PaymentItemTable;
  let fixture: ComponentFixture<PaymentItemTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentItemTable],
    }).compileComponents();

    fixture = TestBed.createComponent(PaymentItemTable);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
