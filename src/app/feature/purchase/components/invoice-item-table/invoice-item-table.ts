import { CurrencyPipe, PercentPipe } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { AddInvoiceItem } from '../add-invoice-item/add-invoice-item';
import { InvoiceItem } from '../../model/purchase.model';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-invoice-item-table',
  imports: [
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    CurrencyPipe
  ],
  templateUrl: './invoice-item-table.html',
  styleUrl: './invoice-item-table.css',
})
export class InvoiceItemTable {
  private dialog = inject(MatDialog);
  @Input() purchaseItems:any;

  displayedColumns: string[] = ['productType', 'hsnCode', 'unit', 'unitPrice', 'quantity', 'discount', 'taxableAmount', /*'tax',*/ ];
  dataSource = new MatTableDataSource<InvoiceItem>([]);

  constructor(private fb: FormBuilder) {}

  ngOnChanges() {
    this.dataSource.data = this.purchaseItems.value;
    this.purchaseItems.valueChanges.subscribe((value: InvoiceItem[]) => {
      this.dataSource.data = value;
    });
  }
  
  calculateAmount(item: InvoiceItem) {
    const price = item.unitPrice || 0;
    const quantity = item.quantity || 0;
    const discount = item.discount || 0;

    const cgst = item.cgst || 0;
    const sgst = item.sgst || 0;
    const igst = item.igst || 0;

    const base = price * quantity;
    const discounted = base + ( base * (discount / 100) );

    const gst = discounted * (cgst + sgst + igst) / 100;
    return discounted + gst;
  }

  openAddItemDialog() {
    const dialogRef = this.dialog.open(AddInvoiceItem, {
      width: '800px',
      maxWidth: '90vw',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dataSource.data = [...this.dataSource.data, result];
        const item = this.fb.group({
          id: [result.id],
          productType: [result.productType],
          hsnCode: [result.hsnCode],
          rate: [result.rate],
          quantity: [result.quantity],
          unit: [result.unit],
          unitPrice: [result.unitPrice],
          discount: [result.discount],
          taxableAmount: [result.taxableAmount],
          sgst: [result.sgst],
          cgst: [result.cgst],
          igst: [result.igst],
          totalAmount: [result.totalAmount]
        })
        this.purchaseItems.push(item);
      }
    });
  }
}
