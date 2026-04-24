import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { PurchaseTable } from "../purchase-table/purchase-table";

@Component({
  selector: 'app-add-payment',
  imports: [
    MatIcon,
    ReactiveFormsModule,
    CommonModule,
    MatFormFieldModule,
    MatButtonModule,
    MatTableModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatIconModule,
    PurchaseTable
],
  templateUrl: './add-payment.html',
  styleUrl: './add-payment.css',
})
export class AddPayment {

  isEditMode: boolean = false;
  isCheque: boolean = false;
  paymentForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.paymentForm = this.fb.group({
      paymentType: ['UPI'],
      amount: [0, [Validators.required]],
      paymentDate: ['', [Validators.required]],
      chequeNumber: [''],
      dueDate: [''],
      bankName: ['IOB'],
      referenceId: [''],
      purchases: this.fb.group({
        purchase: this.fb.array([], { validators: [Validators.minLength(1)] }),
        remaininAmount: [0, [Validators.required]]
      })
    });
    this.paymentForm.get('paymentType')?.valueChanges.subscribe(() => this.checkPaymentType())
  }

  checkPaymentType() {
    const paymentType = this.paymentForm.get('paymentType')?.value;
    this.isCheque = paymentType === 'Cheque' ? true : false;
  }

  get amount() {
    return this.paymentForm.get('amount') as FormControl;
  }

  get purchases() {
    return this.paymentForm.get('purchases') as FormGroup;
  }

  onSubmit() {
    if(this.paymentForm.valid) {
      console.log(this.paymentForm.value);
    }
  }
}
