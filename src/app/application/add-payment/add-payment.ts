import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatStepperModule } from '@angular/material/stepper';
import { MatSelect, MatOption } from "@angular/material/select";
import { validate } from '@angular/forms/signals';
import { MatDatepickerModule } from '@angular/material/datepicker';

@Component({
  selector: 'app-add-payment',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatStepperModule,
    MatSelect,
    MatOption,
    MatDatepickerModule
  ],
  templateUrl: './add-payment.html',
  styleUrl: './add-payment.css',
})
export class AddPayment {
  private fb = inject(FormBuilder);
  private dialogRef = inject(MatDialogRef<AddPayment>);

  firstForm: FormGroup<{paymentType: FormControl<string>}> = this.fb.group({
    paymentType: this.fb.control('Cash', {
      validators: [Validators.required],
      nonNullable: true
    })
  }) 

  secondForm: FormGroup = this.fb.group({
    chequeNo: [],
    bankName: [],
    status: [],
    chequeDate: [],
    referenceId: [],
    amount: [],
    date: [],
  })

  onSave() {
    this.dialogRef.close();
  }
}
