import { Component, effect, ViewChild } from '@angular/core';
import { HeaderCardData, HeaderCards } from '../../../../layout/header-cards/header-cards';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { PaymentModel } from '../../model/payment.model';
import { PaymentStore } from '../../store/payment-store';
import { MatIcon } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-payments',
  imports: [
    HeaderCards,
    MatIcon,
    MatTableModule,
    MatButtonModule,
    CommonModule,
    MatPaginatorModule
  ],
  templateUrl: './payments.html',
  styleUrl: './payments.css',
})
export class Payments {
  headerCards: HeaderCardData[] = [
    {
      header: 'Total Payments',
      count: '1,245',
      hint: '+12.5% this month',
      color: 'text-green-500'
    },
    {
      header: 'Total Orders',
      count: '890',
      hint: '+8.2% this month',
      color: 'text-blue-500'
    },
    {
      header: 'Total Revenue',
      count: '$12,430',
      hint: '+5.4% this month',
      color: 'text-yellow-500'
    }
  ];

  dataColumns = [];
  displayedColumns = ['paymentType', 'amount', 'paymentDate', 'status', 'remainingAmount'];
  dataSource = new MatTableDataSource<PaymentModel>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private paymentStore: PaymentStore,
    private route: Router
  ) {
    effect(() => {
      const payments = this.paymentStore.payments();
      this.dataSource.data = payments;
    })
  }

  getValue(el: PaymentModel, column: string) {
    return el[column as keyof PaymentModel];
  }

  addPayment() {
    this.route.navigate(['payments/payment']);
  }

}

