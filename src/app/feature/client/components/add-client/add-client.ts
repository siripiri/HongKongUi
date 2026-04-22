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
    id: [0],
    companyName: ['', Validators.required],
    gst: [''],
    address: this.fb.group({
      id: [0],
      street1: ['', Validators.required],
      street2: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      country: ['India'],
      pincode: ['', Validators.required],
    }),
    email: [''],
    phoneNumber: ['']
  });
  
  onCancel() {
    this.dialogRef.close();
  }

  onSave() {
    if (this.clientForm.valid) {
      const clientData: ClientData = this.clientForm.value;
      console.log("Form Value", clientData)
      this.dialogRef.close(clientData);
      return;
    }

    this.clientForm.markAllAsTouched();
  }

}
