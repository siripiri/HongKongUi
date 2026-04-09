import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ClientData } from '../../model/client.model';

@Component({
  selector: 'app-add-client',
  imports: [
    MatButtonModule,
    MatFormFieldModule,
    MatIcon,
    MatInputModule,
    ReactiveFormsModule
  ],
  templateUrl: './add-client.html',
  styleUrl: './add-client.css',
})
export class AddClient {
  private fb = inject(FormBuilder);
  private dialogRef = inject(MatDialogRef<AddClient>);

  clientForm: FormGroup = this.fb.group({
    companyName: ['', Validators.required],
    gstNo: ['', Validators.required],
    address: this.fb.group({
      street1: ['', Validators.required],
      street2: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      pincode: ['', Validators.required],
    }),
    email: ['', [Validators.required, Validators.email]],
    phoneNumber: ['', [Validators.required, Validators.pattern(/^[6-9]\d{9}$/)]]
  });
  
  onCancel() {
    this.dialogRef.close();
  }

  onSave() {
    if (this.clientForm.valid) {
      const clientData: ClientData = this.clientForm.value;
      this.dialogRef.close(clientData);
      return;
    }

    this.clientForm.markAllAsTouched();
  }

}
