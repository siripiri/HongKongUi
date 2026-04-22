import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-add-invoice-item',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatAutocompleteModule
],
  templateUrl: './add-invoice-item.html',
  styleUrl: './add-invoice-item.css',
})
export class AddInvoiceItem {
  private fb = inject(FormBuilder);
  private dialogRef = inject(MatDialogRef<AddInvoiceItem>);

  itemForm: FormGroup = this.fb.group({
    id: [0],
    productType: ['', Validators.required],
    hsnCode: [''],
    rate: [0],
    unit: ['Pcs'],
    unitPrice: [0, [Validators.required]],
    quantity: [1, [Validators.required, Validators.min(1)]],
    discount: [0, [Validators.min(0), Validators.max(100)]],
    taxableAmount: [0, [Validators.required]],
    sgst: [0, [Validators.min(0), Validators.max(100)]],
    cgst: [0, [Validators.min(0), Validators.max(100)]],
    igst: [0, [Validators.min(0), Validators.max(100)]],
    totalAmount: [0]
  });

  onSave() {
    if (this.itemForm.valid) {
      this.dialogRef.close(this.itemForm.value);
    }
  }

  onCancel() {
    this.dialogRef.close();
  }

  calculateAmount() {
    const price = this.itemForm.get('unitPrice')?.value || 0;
    const quantity = this.itemForm.get('quantity')?.value || 0;
    const discount = this.itemForm.get('discount')?.value || 0;

    const subtotal = price * quantity;
    const discountAmount = subtotal * (discount / 100);
    let amount = subtotal - discountAmount;

    this.itemForm.patchValue({ taxableAmount: amount });
  }
}
