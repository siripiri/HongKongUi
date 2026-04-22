import { Component, effect, inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule, MatOptionModule, provideNativeDateAdapter } from '@angular/material/core'; // For datepicker
import { AsyncPipe, CommonModule, formatDate } from '@angular/common';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderCardData, HeaderCards } from '../../../../layout/header-cards/header-cards';
import { InvoiceStore } from '../../stores/invoice.store';
import { InvoiceModel } from '../../model/purchase.model';
import { ClientStore } from '../../../client/stores/client.store';
import { ClientData } from '../../../client/model/client.model';
import { Observable, startWith, map, combineLatest } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

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
    MatNativeDateModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatOptionModule,
    AsyncPipe,
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

    private fb = inject(FormBuilder);

    filterForm: FormGroup = this.fb.group({
      dateFrom: [],
      dateTo: [],
      clientName: [''],
      status: []
    });
    
    dataColumns = ['companyName', 'invoiceNumber', 'status', 'invoiceDate', 'dueDate', 'taxableAmount', 'shippingCost', 'invoiceTax', 'invoiceAmount', 'dueAmount', 'paidAmount', 'grandTotal'];
    displayedColumns = [...this.dataColumns, 'action'];
    dataSource = new MatTableDataSource<InvoiceModel>([]);
    clients: ClientData[] = [];
    filteredClients!: Observable<ClientData[]>;

    constructor(private route: Router, public purchaseStore: InvoiceStore, public clientStore: ClientStore) {
      effect(() => {
        const purchases = this.purchaseStore.purchases();
        this.dataSource.data = purchases;
        const clients = this.clientStore.clients();
        this.clients = clients;
      });

      this.filteredClients = combineLatest([
        this.filterForm.get('clientName')!.valueChanges.pipe(startWith('')),
        toObservable(this.clientStore.clients)
      ]).pipe(
        map(([filterValue, clients]) => {
          const filter = (filterValue || '').toLowerCase();
          return clients.filter(client => 
            client.companyName.toLowerCase().includes(filter)
          );
        })
      );
    }

    ngOnInit() {
      this.purchaseStore.loadPurchases();
      this.clientStore.loadClients();

      this.setupFilter();
    }

    ngAfterViewInit() {
      this.dataSource.paginator = this.paginator;
    }

    getValue(el: InvoiceModel, column: string) {
      const clientKeys = ['companyName'];
      if(column === 'invoiceDate' || column === 'dueDate') {
        const dateValue = el[column as keyof InvoiceModel];
        return dateValue ? formatDate(dateValue as string | number | Date, 'dd/MM/yyyy', 'en-IN') : '-';
      }
      return clientKeys.includes(column) ? el.client.companyName : el[column as keyof InvoiceModel];
    }
  
    setupFilter() {
      console.log(this.filterForm.value);
      this.dataSource.filterPredicate = (data: any, filter: string) => {
        const f = JSON.parse(filter);
        return (
          (!f.clientName || data.client?.companyName?.toLowerCase().includes(f.clientName)) &&
          (!f.status || data.status === f.status) &&
          (!f.dateFrom || new Date(data.invoiceDate) >= new Date(f.dateFrom)) &&
          (!f.dateTo || new Date(data.invoiceDate) <= new Date(f.dateTo))
        );
      };
      this.filterForm.valueChanges.subscribe(value => {
        this.dataSource.filter = JSON.stringify({
          clientName: (value.clientName || '').toLowerCase(),
          status: value.status,
          dateFrom: value.dateFrom,
          dateTo: value.dateTo
        });
      });
    }

    search() {
      const value = this.filterForm.value;
      this.dataSource.filter = JSON.stringify({
        clientName: (value.clientName || '').toLowerCase(),
        status: value.status,
        dateFrom: value.dateFrom,
        dateTo: value.dateTo
      });
    }

    reset() {
      this.filterForm.reset({
        dateFrom: null,
        dateTo: null,
        clientName: '',
        status: null
      });
      this.dataSource.filter = JSON.stringify({
        clientName: '',
        status: null,
        dateFrom: null,
        dateTo: null
      });
    }
  
    addInvoice() {
      this.route.navigate(['purchases/invoice']);
    }
  
    view(element: InvoiceModel) {
      console.log('View Purchase:', element);
      this.route.navigate([`purchases/invoice/${element.id}`])
    }
  
    edit(element: InvoiceModel) {
      console.log('Edit Purchase: ', element);
      this.route.navigate([`purchases/invoice/${element.id}`])
    }
  
    delete(element: InvoiceModel) {
      console.log('Delete:', element);
    }
}
