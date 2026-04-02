import { Component } from '@angular/core';
import { HeaderCardData, HeaderCards } from '../../layout/header-cards/header-cards';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core'; // For datepicker
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { ViewChild } from '@angular/core';
import { Router } from '@angular/router';

export interface Invoice {
  invoiceNo: string;
  date: Date;
  dueDate: Date;
  client: string;
  amount: number;
  status: string;
}

@Component({
  selector: 'app-purchase',
  imports: [
    HeaderCards,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    CommonModule,
    FormsModule,
    DatePipe,
    CurrencyPipe,
    MatNativeDateModule,
    MatPaginatorModule
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './purchase.html',
  styleUrl: './purchase.css',
})
export class Purchase {
  headerCards: HeaderCardData[] = [
      {
        header: 'Total Purchases',
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
  
    @ViewChild(MatPaginator) paginator!: MatPaginator;
  
    ngAfterViewInit() {
      this.dataSource.paginator = this.paginator;
    }
  
    dateFrom: Date | null = null;
    dateTo: Date | null = null;
    clientName: string = '';
    status: string = '';
  
    displayedColumns: string[] = ['invoiceNo', 'date', 'dueDate', 'client', 'amount', 'status', 'action'];
    dataSource = new MatTableDataSource<Invoice>([
      { invoiceNo: 'INV001', date: new Date(), dueDate: new Date(), client: 'Client A', amount: 1000, status: 'Paid' },
      { invoiceNo: 'INV002', date: new Date(), dueDate: new Date(), client: 'Client B', amount: 1500, status: 'Pending' },
      { invoiceNo: 'INV003', date: new Date(), dueDate: new Date(), client: 'Client C', amount: 2000, status: 'Overdue' },
      { invoiceNo: 'INV004', date: new Date(), dueDate: new Date(), client: 'Client D', amount: 2500, status: 'Paid' }, 
      { invoiceNo: 'INV005', date: new Date(), dueDate: new Date  (), client: 'Client E', amount: 3000, status: 'Pending' },
      { invoiceNo: 'INV001', date: new Date(), dueDate: new Date(), client: 'Client A', amount: 1000, status: 'Paid' },
      { invoiceNo: 'INV002', date: new Date(), dueDate: new Date(), client: 'Client B', amount: 1500, status: 'Pending' },
      { invoiceNo: 'INV003', date: new Date(), dueDate: new Date(), client: 'Client C', amount: 2000, status: 'Overdue' },
      { invoiceNo: 'INV004', date: new Date(), dueDate: new Date(), client: 'Client D', amount: 2500, status: 'Paid' }, 
      { invoiceNo: 'INV005', date: new Date(), dueDate: new Date  (), client: 'Client E', amount: 3000, status: 'Pending' },
      { invoiceNo: 'INV001', date: new Date(), dueDate: new Date(), client: 'Client A', amount: 1000, status: 'Paid' },
      { invoiceNo: 'INV002', date: new Date(), dueDate: new Date(), client: 'Client B', amount: 1500, status: 'Pending' },
      { invoiceNo: 'INV003', date: new Date(), dueDate: new Date(), client: 'Client C', amount: 2000, status: 'Overdue' },
      { invoiceNo: 'INV004', date: new Date(), dueDate: new Date(), client: 'Client D', amount: 2500, status: 'Paid' }, 
      { invoiceNo: 'INV005', date: new Date(), dueDate: new Date  (), client: 'Client E', amount: 3000, status: 'Pending' },
      { invoiceNo: 'INV001', date: new Date(), dueDate: new Date(), client: 'Client A', amount: 1000, status: 'Paid' },
      { invoiceNo: 'INV002', date: new Date(), dueDate: new Date(), client: 'Client B', amount: 1500, status: 'Pending' },
      { invoiceNo: 'INV003', date: new Date(), dueDate: new Date(), client: 'Client C', amount: 2000, status: 'Overdue' },
      { invoiceNo: 'INV004', date: new Date(), dueDate: new Date(), client: 'Client D', amount: 2500, status: 'Paid' }, 
      { invoiceNo: 'INV005', date: new Date(), dueDate: new Date  (), client: 'Client E', amount: 3000, status: 'Pending' },
      { invoiceNo: 'INV001', date: new Date(), dueDate: new Date(), client: 'Client A', amount: 1000, status: 'Paid' },
      { invoiceNo: 'INV002', date: new Date(), dueDate: new Date(), client: 'Client B', amount: 1500, status: 'Pending' },
      { invoiceNo: 'INV003', date: new Date(), dueDate: new Date(), client: 'Client C', amount: 2000, status: 'Overdue' },
      { invoiceNo: 'INV004', date: new Date(), dueDate: new Date(), client: 'Client D', amount: 2500, status: 'Paid' }, 
      { invoiceNo: 'INV005', date: new Date(), dueDate: new Date  (), client: 'Client E', amount: 3000, status: 'Pending' },
      { invoiceNo: 'INV001', date: new Date(), dueDate: new Date(), client: 'Client A', amount: 1000, status: 'Paid' },
      { invoiceNo: 'INV002', date: new Date(), dueDate: new Date(), client: 'Client B', amount: 1500, status: 'Pending' },
      { invoiceNo: 'INV003', date: new Date(), dueDate: new Date(), client: 'Client C', amount: 2000, status: 'Overdue' },
      { invoiceNo: 'INV004', date: new Date(), dueDate: new Date(), client: 'Client D', amount: 2500, status: 'Paid' }, 
      { invoiceNo: 'INV005', date: new Date(), dueDate: new Date  (), client: 'Client E', amount: 3000, status: 'Pending' },
      { invoiceNo: 'INV001', date: new Date(), dueDate: new Date(), client: 'Client A', amount: 1000, status: 'Paid' },
      { invoiceNo: 'INV002', date: new Date(), dueDate: new Date(), client: 'Client B', amount: 1500, status: 'Pending' },
      { invoiceNo: 'INV003', date: new Date(), dueDate: new Date(), client: 'Client C', amount: 2000, status: 'Overdue' },
      { invoiceNo: 'INV004', date: new Date(), dueDate: new Date(), client: 'Client D', amount: 2500, status: 'Paid' }, 
      { invoiceNo: 'INV005', date: new Date(), dueDate: new Date  (), client: 'Client E', amount: 3000, status: 'Pending' },
      { invoiceNo: 'INV001', date: new Date(), dueDate: new Date(), client: 'Client A', amount: 1000, status: 'Paid' },
      { invoiceNo: 'INV002', date: new Date(), dueDate: new Date(), client: 'Client B', amount: 1500, status: 'Pending' },
      { invoiceNo: 'INV003', date: new Date(), dueDate: new Date(), client: 'Client C', amount: 2000, status: 'Overdue' },
      { invoiceNo: 'INV004', date: new Date(), dueDate: new Date(), client: 'Client D', amount: 2500, status: 'Paid' }, 
      { invoiceNo: 'INV005', date: new Date(), dueDate: new Date  (), client: 'Client E', amount: 3000, status: 'Pending' },
      { invoiceNo: 'INV001', date: new Date(), dueDate: new Date(), client: 'Client A', amount: 1000, status: 'Paid' },
      { invoiceNo: 'INV002', date: new Date(), dueDate: new Date(), client: 'Client B', amount: 1500, status: 'Pending' },
      { invoiceNo: 'INV003', date: new Date(), dueDate: new Date(), client: 'Client C', amount: 2000, status: 'Overdue' },
      { invoiceNo: 'INV004', date: new Date(), dueDate: new Date(), client: 'Client D', amount: 2500, status: 'Paid' }, 
      { invoiceNo: 'INV005', date: new Date(), dueDate: new Date  (), client: 'Client E', amount: 3000, status: 'Pending' },
    ]);
  
    constructor(private route: Router) {
      
    }
  
    search() {
      console.log('Searching with filters:', this.dateFrom, this.dateTo, this.clientName, this.status);
    }
  
    addInvoice() {
      this.route.navigate(['purchases/invoice']);
    }
  
    view(element: Invoice) {
      console.log('View:', element);
    }
  
    edit(element: Invoice) {
      console.log('Edit:', element);
    }
  
    delete(element: Invoice) {
      console.log('Delete:', element);
    }
}
