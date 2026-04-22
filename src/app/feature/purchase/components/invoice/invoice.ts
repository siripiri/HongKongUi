import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { InvoiceItemTable } from "../invoice-item-table/invoice-item-table";
import { PaymentItemTable } from "../payment-item-table/payment-item-table";
import { AutocompleteClient } from "../../../client/components/autocomplete-client/autocomplete-client";
import { ActivatedRoute, Router } from '@angular/router';
import { InvoiceStore } from '../../stores/invoice.store';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ClientStore } from '../../../client/stores/client.store';
import { InvoiceItem, InvoiceModel } from '../../model/purchase.model';

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
    PaymentItemTable,
    AutocompleteClient,
    MatSnackBarModule
],
  providers: [provideNativeDateAdapter()],
  templateUrl: './invoice.html'
})
export class Invoice implements OnInit {

  invoiceForm: FormGroup;
  isEditMode: boolean = false;
  editId: number | undefined;
  isSameState: boolean = true;

  constructor(private formBuilder: FormBuilder, 
    private invoiceStore: InvoiceStore,
    private clientStore: ClientStore,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {
    this.invoiceForm = this.formBuilder.group({
      invoiceNumber: [''],
      orderNumber: [''],
      status: ['UNPAID'],
      client: [''],
      invoiceDate: [null],
      dueDate: [null],
      purchaseItems: this.formBuilder.array([]),
      taxableAmount: [0],
      shippingCost: [0],
      cgst: [0],
      sgst: [0],
      igst: [0],
      roundOff: [0],
      invoiceAmount: [0],
      grandTotal: [0]
    });
    this.purchaseItems.valueChanges.subscribe(() => {
      this.calculateTaxableAmount();
    });
    this.invoiceForm.get('client')?.valueChanges.subscribe(() => this.checkState);
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if(id) {
      this.isEditMode = true;
      this.editId = parseInt(id);
      this.invoiceStore.getPurchaseById(parseInt(id)).subscribe({
        next: (invoice: InvoiceModel) => {
          console.log("API invoice:", invoice);
          this.checkState(invoice);
          this.parseForm(invoice);
        },
        error: (err) => {
          console.log("Error:", err);
          this.snackBar.open(`Failed to load invoice ${err}`, 'Close', {
            duration: 3000
          });
        }
      })
    }
    this.clientStore.loadClients();
  }

  parseForm(invoice: InvoiceModel) {
    this.invoiceForm.patchValue({
      invoiceNumber: invoice.invoiceNumber,
      orderNumber: invoice.orderNumber,
      status: invoice.status,
      client: invoice.client,
      invoiceDate: invoice.invoiceDate,
      dueDate: invoice.dueDate,
      taxableAmount: invoice.taxableAmount,
      shippingCost: invoice.shippingCost,
      purchaseItems: invoice.purchaseItems,
      cgst: invoice.cgst,
      sgst: invoice.sgst,
      igst: invoice.igst,
      roundOff: invoice.roundOff,
      invoiceAmount: invoice.invoiceAmount,
      grandTotal: invoice.grandTotal
    });
    console.log('invoice Item:', invoice.purchaseItems);
    this.invoiceForm.setControl(
      'purchaseItems',
      this.formBuilder.array(
        invoice.purchaseItems?.map(item =>
          this.createItemFormGroup(item)
        ) || []
      )
    );
  }

  createItemFormGroup(item: InvoiceItem): FormGroup {
    return this.formBuilder.group({
      id: [item?.id || null],
      productType: [item?.productType || ''],
      hsnCode: [item?.hsnCode || null],
      rate: [item?.rate || 0],
      quantity: [item?.quantity || 1],
      unit: [item?.unit || ''],
      unitPrice: [item?.unitPrice || 0],
      discount: [item?.discount || 0],
      taxableAmount: [item?.taxableAmount || 0],
      sgst: [item?.sgst || 0],
      cgst: [item?.cgst || 0],
      igst: [item?.igst || 0],
      totalAmount: [item?.totalAmount || 0]
    });
  }

  get purchaseItems() {
    return this.invoiceForm.get('purchaseItems') as FormArray;
  }

  get client() {
    return this.invoiceForm.get('client') as FormControl;
  }

  calculateTaxableAmount() {
    const invoiceItems: InvoiceItem[] = this.invoiceForm.get('purchaseItems')?.value;
    if(invoiceItems == null)
      return;
    const taxableAmt = invoiceItems.reduce((sum: number, item: InvoiceItem) => sum + item.taxableAmount, 0);
    this.invoiceForm.patchValue({taxableAmount: taxableAmt})
  }

  calculateInvoiceAmount() {
    const {
      taxableAmount = 0,
      cgst = 0,
      sgst = 0,
      igst = 0,
      roundOff = 0
    } = this.invoiceForm.value;

    const baseAmount = Number(taxableAmount) || 0;
    const cgstPct = Number(cgst) || 0;
    const sgstPct = Number(sgst) || 0;
    const igstPct = Number(igst) || 0;
    const round = Number(roundOff) || 0;

    const totalTax =
      (baseAmount * cgstPct) / 100 +
      (baseAmount * sgstPct) / 100 +
      (baseAmount * igstPct) / 100;

    const invoiceAmount = baseAmount + totalTax - round;

    this.invoiceForm.patchValue({
      invoiceAmount: + invoiceAmount.toFixed(2)
    });
  }

  checkState(invoice: any) {
    if(invoice.client.address.state.toLowerCase() == 'tamil nadu')
      this.isSameState = true
  }

  onSubmit() {
    if(this.isEditMode && this.editId) {
      console.log("edit", this.invoiceForm.value);
      this.invoiceStore.updatePurchase(this.editId, this.invoiceForm.value).subscribe({
        next: () => {
          this.snackBar.open('Invoice updated successfully', 'Close', {
            duration: 3000,
          });

          this.router.navigate(['/purchases']);
        },
        error: (err) => {
          console.error('Error updating invoice:', err);
        }
      });
    } else {
      console.log("submit Invoice: ", this.invoiceForm.value);
      this.invoiceStore.addPurchase(this.invoiceForm.value).subscribe({
        next: () => {
          this.snackBar.open('Purchase added successfully', 'Close', {
            duration: 3000,
          });
          this.router.navigate(['/purchases']);
        },
        error: (err) => {
          console.error('Error adding purchase:', err);
          this.snackBar.open('Error adding purchase', 'Close', {
            duration: 3000,
          });
        }
      });
    }
  }
}