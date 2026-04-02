import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

export interface InvoiceItem {
  productType: string;
  price: number;
  quantity: number;
  discount: number;
  sgst: number;
  cgst: number;
  tgst: number;
  amount: number;
}

@Component({
  selector: 'app-add-invoice-item',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './add-invoice-item.html',
  styleUrl: './add-invoice-item.css',
})
export class AddInvoiceItem {
  private fb = inject(FormBuilder);
  private dialogRef = inject(MatDialogRef<AddInvoiceItem>);

  itemForm: FormGroup = this.fb.group({
    productType: ['', Validators.required],
    price: [0, [Validators.required, Validators.min(0)]],
    quantity: [1, [Validators.required, Validators.min(1)]],
    discount: [0, [Validators.min(0), Validators.max(100)]],
    sgst: [0, [Validators.min(0), Validators.max(100)]],
    cgst: [0, [Validators.min(0), Validators.max(100)]],
    tgst: [0, [Validators.min(0), Validators.max(100)]],
    amount: [0, [Validators.required, Validators.min(0)]]
  });

  onSave() {
    if (this.itemForm.valid) {
      this.dialogRef.close(this.itemForm.value);
    }
  }

  onCancel() {
    this.dialogRef.close();
  }

  // Calculate amount automatically when price, quantity, or discount changes
  calculateAmount() {
    const price = this.itemForm.get('price')?.value || 0;
    const quantity = this.itemForm.get('quantity')?.value || 0;
    const discount = this.itemForm.get('discount')?.value || 0;

    const subtotal = price * quantity;
    const discountAmount = subtotal * (discount / 100);
    const amount = subtotal - discountAmount;

    this.itemForm.patchValue({ amount: amount });
  }
}
