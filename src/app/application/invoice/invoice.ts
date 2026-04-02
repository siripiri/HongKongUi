import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { InvoiceItemTable } from "../invoice-item-table/invoice-item-table";
import { PaymentItemTable } from "../payment-item-table/payment-item-table";

@Component({
  selector: 'app-invoice',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatDatepickerModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    InvoiceItemTable,
    PaymentItemTable
],
  providers: [provideNativeDateAdapter()],
  templateUrl: './invoice.html'
})
export class Invoice {

  formGroup: FormGroup;
  isEditMode: boolean = false;

  constructor(private formBuilder: FormBuilder) {
    this.formGroup = this.formBuilder.group({
      invoiceNo: [''],
      status: [''],
      clientName: [''],
      invoiceDate: [null],
      orderNo: [''],
      dueDate: [null]
    });
  }

  onSubmit(value: any) {
    console.log('Form submitted with value:', value);
  }

}