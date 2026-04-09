import { Component, inject } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { AddPayment } from '../add-payment/add-payment';

@Component({
  selector: 'app-payment-item-table',
  imports: [
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    CommonModule
  ],
  templateUrl: './payment-item-table.html',
  styleUrl: './payment-item-table.css',
})
export class PaymentItemTable {
  private dialog = inject(MatDialog);

  displayedColumns: string[] = ['paymentMode', 'amount', 'date', 'note'];
  dataSource = new MatTableDataSource([
    { paymentMode: 'Cash', amount: 100, date: new Date('2024-01-01'), note: 'Payment sent in cash' },
    { paymentMode: 'Credit Card', amount: 200, date: new Date('2024-01-05'), note: 'Payment sent via credit card' },
    { paymentMode: 'Bank Transfer', amount: 300, date: new Date('2024-01-10'), note: 'Payment sent via bank transfer' },
    { paymentMode: 'UPI', amount: 150, date: new Date('2024-01-15'), note: 'Payment sent via UPI' },
    { paymentMode: 'Cheque', amount: 250, date: new Date('2024-01-20'), note: 'Payment sent via cheque' },
  ])

  openAddPaymentDialog() {
    const dialogRef = this.dialog.open(AddPayment, {
      width: '800px',
      maxWidth: '90vw',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      // get result
    });
  }
}
