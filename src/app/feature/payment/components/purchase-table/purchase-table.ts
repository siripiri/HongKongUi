import { CommonModule } from '@angular/common';
import { Component, effect, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ClientStore } from '../../../client/stores/client.store';
import { AutocompleteClient } from '../../../client/components/autocomplete-client/autocomplete-client';
import { SelectionModel } from '@angular/cdk/collections';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { purchaseTable, tableSummary } from '../../model/payment.model';
import { InvoiceStore } from '../../../purchase/stores/invoice.store';
import { InvoiceModel } from '../../../purchase/model/purchase.model';
import { Observable } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';


const ELEMENT_DATA: purchaseTable[] = [
  { position: 1, invoiceNumber: '123', companyName: 'Hello', invoiceDate: '24/05/99', dueDate: '24/03/20', invoiceAmount: 123, dueAmount: 123, cashDiscount:0, netPayableAmount: 123, updatedDueAmount: 0},
  { position: 2, invoiceNumber: '123', companyName: 'Hello', invoiceDate: '24/05/99', dueDate: '24/03/20', invoiceAmount: 123, dueAmount: 123, cashDiscount:0, netPayableAmount: 123, updatedDueAmount: 0},
  { position: 3, invoiceNumber: '123', companyName: 'Hello', invoiceDate: '24/05/99', dueDate: '24/03/20', invoiceAmount: 123, dueAmount: 123, cashDiscount:0, netPayableAmount: 123, updatedDueAmount: 0},
  { position: 4, invoiceNumber: '123', companyName: 'Hello', invoiceDate: '24/05/99', dueDate: '24/03/20', invoiceAmount: 123, dueAmount: 123, cashDiscount:0, netPayableAmount: 123, updatedDueAmount: 0},
  { position: 5, invoiceNumber: '123', companyName: 'Hello', invoiceDate: '24/05/99', dueDate: '24/03/20', invoiceAmount: 123, dueAmount: 123, cashDiscount:0, netPayableAmount: 123, updatedDueAmount: 0},
  { position: 6, invoiceNumber: '123', companyName: 'Hello', invoiceDate: '24/05/99', dueDate: '24/03/20', invoiceAmount: 123, dueAmount: 123, cashDiscount:0, netPayableAmount: 123, updatedDueAmount: 0},
  { position: 7, invoiceNumber: '123', companyName: 'Hello', invoiceDate: '24/05/99', dueDate: '24/03/20', invoiceAmount: 123, dueAmount: 123, cashDiscount:0, netPayableAmount: 123, updatedDueAmount: 0},
  { position: 8, invoiceNumber: '123', companyName: 'Hello', invoiceDate: '24/05/99', dueDate: '24/03/20', invoiceAmount: 123, dueAmount: 123, cashDiscount:0, netPayableAmount: 123, updatedDueAmount: 0},
  { position: 9, invoiceNumber: '123', companyName: 'Hello', invoiceDate: '24/05/99', dueDate: '24/03/20', invoiceAmount: 123, dueAmount: 123, cashDiscount:0, netPayableAmount: 123, updatedDueAmount: 0},
  { position: 10, invoiceNumber: '123', companyName: 'Hello', invoiceDate: '24/05/99', dueDate: '24/03/20', invoiceAmount: 123, dueAmount: 123, cashDiscount:0, netPayableAmount: 123, updatedDueAmount: 0},
  { position: 11, invoiceNumber: '123', companyName: 'Hello', invoiceDate: '24/05/99', dueDate: '24/03/20', invoiceAmount: 123, dueAmount: 123, cashDiscount:0, netPayableAmount: 123, updatedDueAmount: 0},
  { position: 12, invoiceNumber: '123', companyName: 'Hello', invoiceDate: '24/05/99', dueDate: '24/03/20', invoiceAmount: 123, dueAmount: 123, cashDiscount:0, netPayableAmount: 123, updatedDueAmount: 0},
  { position: 13, invoiceNumber: '123', companyName: 'Hello', invoiceDate: '24/05/99', dueDate: '24/03/20', invoiceAmount: 123, dueAmount: 123, cashDiscount:0, netPayableAmount: 123, updatedDueAmount: 0},
]

@Component({
  selector: 'app-purchase-table',
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatTableModule,
    ReactiveFormsModule,
    MatInputModule,
    MatDatepickerModule,
    MatCheckboxModule,
    MatIconModule,
    AutocompleteClient
  ],
  templateUrl: './purchase-table.html',
  styleUrl: './purchase-table.css',
})
export class PurchaseTable implements OnInit {

  searchForm: FormGroup;
  invoices: InvoiceModel[] = [];
  datas: purchaseTable[] = [];
  private invoices$: Observable<InvoiceModel[]>;
  tableSummary: tableSummary | undefined;

  @Input() amount: FormControl | any;


  displayedColumn: string[] = ['select', 'position', 'invoiceNumber', 'companyName', 'invoiceDate', 'dueDate', 'invoiceAmount', 'dueAmount', 'cashDiscount', 'netPayableAmount', 'updatedDueAmount'];
  dataSource = new MatTableDataSource<purchaseTable>([]);
  selection = new SelectionModel<purchaseTable>(true, []);

  constructor(
    private clientStore: ClientStore,
    private invoiceStore: InvoiceStore,
    private fb: FormBuilder,
  ) {
    this.searchForm = this.fb.group({
      client: [''],
      invoiceDateFrom: [''],
      invoiceDateTo: [''],
      dueDateFrom: [''],
      dueDateTo: [''],
    });

    this.invoiceStore.loadPurchases();

    this.invoices$ = toObservable(this.invoiceStore.purchases);
    effect(() => {
      const invoice = this.invoiceStore.purchases();
      this.invoices = invoice;
      this.convertToTableItems();
      this.dataSource.data = this.datas;
    });
  }

  ngOnInit(): void {
    this.clientStore.loadClients();
    this.setUpFilter();
    this.amount.valueChanges.subscribe((value: number) => {
      this.handleAmountChange(value);
    })
  }

  onRowToggle(row: purchaseTable) {
    console.log("Triggered")
    this.selection.toggle(row);
    this.updateSummary();
  }

  updateSummary() {
    const selectedRows = this.selection.selected;
    let amount = this.amount.value;
    const result = selectedRows.reduce((data, row) => {
      data.invoiceSelected += 1;
      data.totalCashDiscount += row.cashDiscount || 0;
      data.totalInvoiceAmount += row.dueAmount || 0;
      data.remainingBalance += amount - data.totalInvoiceAmount;
      data.totalPayingNow += 0;
      return data;
    }, {
      invoiceSelected: 0,
      totalInvoiceAmount: 0,
      totalCashDiscount: 0,
      totalPayingNow: 0,
      remainingBalance: 0
    })
    this.tableSummary = result;
    console.log(selectedRows);
  }

  isRowSelectable(row: purchaseTable, amount: number): boolean {
    return row.dueAmount <= amount;
  }

  handleAmountChange(amount: number) {
    const validSelections = this.selection.selected.filter(row =>
      this.isRowSelectable(row, amount)
    );
    
    this.selection.clear();
    this.selection.select(...validSelections);

     // Optional: update table values
    // this.dataSource.data = this.dataSource.data.map(row => ({
    //   ...row,
    //   updatedDueAmount:
    //     this.isRowSelectable(row, amount)
    //       ? row.dueAmount
    //       : 0
    // }));
  }

  convertToTableItems() {
    this.invoices.filter(invoice => ['UNPAID', 'PENDING'].includes(invoice.status))
      .forEach((invoice: InvoiceModel, index: number) => {
        const invoiceTable: purchaseTable = {
          position: index,
          invoiceNumber: invoice.invoiceNumber,
          companyName: invoice.client?.companyName,
          invoiceDate: invoice.invoiceDate,
          dueDate: invoice.dueDate,
          invoiceAmount: invoice.invoiceAmount,
          dueAmount: invoice.dueAmount,
          cashDiscount: invoice.cashDiscount,
          netPayableAmount: 0,
          updatedDueAmount: 0
        }
        this.datas.push(invoiceTable);
      });
  }

  setUpFilter() {
    this.dataSource.filterPredicate = (data: any, filter: string) => {
      const f = JSON.parse(filter);
      const invoiceDate = data.invoiceDate ? new Date(data.invoiceDate) : null;
      const dueDate = data.dueDate ? new Date(data.dueDate) : null;

      return (
        (!f.client || data.companyName?.toLowerCase().includes(f.client)) &&

        (!f.invoiceDateFrom || (invoiceDate && invoiceDate >= new Date(f.invoiceDateFrom))) &&
        (!f.invoiceDateTo || (invoiceDate && invoiceDate <= new Date(f.invoiceDateTo))) &&

        (!f.dueDateFrom || (dueDate && dueDate >= new Date(f.dueDateFrom))) &&
        (!f.dueDateTo || (dueDate && dueDate <= new Date(f.dueDateTo)))
      );
    };
    this.searchForm.valueChanges.subscribe(value => {
      this.dataSource.filter = JSON.stringify({
        client: (value.client.companyName || '').toLowerCase(),
        invoiceDateFrom: value.invoiceDateFrom,
        invoiceDateTo: value.invoiceDateTo,
        dueDateFrom: value.dueDateFrom,
        dueDateTo: value.dueDateTo
      });
    })
  }

  get client() {
    return this.searchForm.get('client') as FormControl;
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }
    this.selection.select(...this.dataSource.data);
  }

  checkboxLabel(row?: purchaseTable): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }
}
