import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceItemTable } from './invoice-item-table';

describe('InvoiceItemTable', () => {
  let component: InvoiceItemTable;
  let fixture: ComponentFixture<InvoiceItemTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvoiceItemTable],
    }).compileComponents();

    fixture = TestBed.createComponent(InvoiceItemTable);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
