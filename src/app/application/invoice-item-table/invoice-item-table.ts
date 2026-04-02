import { CurrencyPipe, PercentPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AddInvoiceItem, InvoiceItem } from '../add-invoice-item/add-invoice-item';

@Component({
  selector: 'app-invoice-item-table',
  imports: [
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    CurrencyPipe,
    PercentPipe
  ],
  templateUrl: './invoice-item-table.html',
  styleUrl: './invoice-item-table.css',
})
export class InvoiceItemTable {
  private dialog = inject(MatDialog);

  displayedColumns: string[] = ['itemNo', 'productType', 'price', 'quantity', 'discount', 'sgst', 'cgst', 'tgst', 'amount'];
  dataSource = new MatTableDataSource([
    { itemNo: '1', productType: 'Product A', price: 100, quantity: 2, discount: 10, sgst: 5, cgst: 5, tgst: 10, amount: 190 },
    { itemNo: '2', productType: 'Product B', price: 200, quantity: 1, discount: 20, sgst: 10, cgst: 10, tgst: 20, amount: 380 },
    { itemNo: '3', productType: 'Product C', price: 150, quantity: 3, discount: 15, sgst: 7.5, cgst: 7.5, tgst: 15, amount: 427.5 },
    { itemNo: '4', productType: 'Product D', price: 250, quantity: 1, discount: 25, sgst: 12.5, cgst: 12.5, tgst: 25, amount: 475 },
    { itemNo: '5', productType: 'Product E', price: 300, quantity: 2, discount: 30, sgst: 15, cgst: 15, tgst: 30, amount: 570 },
    { itemNo: '6', productType: 'Product F', price: 120, quantity: 4, discount: 12, sgst: 6, cgst: 6, tgst: 12, amount: 422.4 },
  ]);

  openAddItemDialog() {
    const dialogRef = this.dialog.open(AddInvoiceItem, {
      width: '800px',
      maxWidth: '90vw',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Add item number and add to data source
        const newItem: InvoiceItem = {
          ...result,
          itemNo: (this.dataSource.data.length + 1).toString()
        };
        // this.dataSource.data = [...this.dataSource.data, newItem];
      }
    });
  }
}
