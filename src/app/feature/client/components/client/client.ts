import { Component, effect, inject, ViewChild } from '@angular/core';
import { HeaderCardData, HeaderCards } from '../../../../layout/header-cards/header-cards';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { Address, ClientData } from '../../model/client.model';
import { ClientStore } from '../../stores/client.store';
import { MatDialog } from '@angular/material/dialog';
import { AddClient } from '../add-client/add-client';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-client',
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
    MatNativeDateModule,
    MatPaginatorModule
  ],
  templateUrl: './client.html',
  styleUrl: './client.css',
})
export class Client {
    headerCards: HeaderCardData[] = [
      {
        header: 'Total Client',
        count: '10',
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
  
    dateFrom: Date | null = null;
    dateTo: Date | null = null;
    clientName: string = '';
    status: string = '';

    displayedColumns: string[] = ['companyName' , 'gst', 'street1', 'street2', 'city', 'state', 'country', 'pincode', 'email', 'phoneNumber'];
    dataSource = new MatTableDataSource<ClientData>([]);

    private dialog = inject(MatDialog);

    constructor(public store: ClientStore, private snackbar: MatSnackBar) {
      effect(() => {
        const clients = this.store.clients();
        this.dataSource.data = clients;
      })
    }

    ngOnInit() { 
      this.store.loadClients();
    }

    getValue(el: ClientData, item: string) {
      const addressKeys = ['street1','street2','city','state','country','pincode'];
      return addressKeys.includes(item) ? el.address[item as keyof Address] : el[item as keyof ClientData];
    }

    private handleSuccess(): void {
      this.snackbar.open(
        'Client added successfully ✅',
        'Close',
        {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top'
        }
      );
    }

    private handleError(err: any): void {
      console.error(err);

      this.snackbar.open(
        'Error adding client ❌',
        'Close',
        {
          duration: 3000
        }
      );
    }

    openAddItemDialog() {
      const dialogRef = this.dialog.open(AddClient, {
        width: '800px',
        maxWidth: '90vw',
        disableClose: true
      });

      dialogRef.afterClosed().subscribe((result: ClientData | undefined) => {
        if (!result) {
          console.log('Cancelled');
          return;
        }
        console.log('Submitting Client:', result);
        this.store.addClient(result).subscribe({
          next: () => {
            this.handleSuccess();
            this.store.loadClients();
          },
          error: (err) => {
            this.handleError(err);
          }
        });
      });
    }

    search() {}
}
