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
  dataSource = new MatTableDataSource([])

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
