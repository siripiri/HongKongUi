import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, effect, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
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

export type PurchaseFormGroup = FormGroup<{
  purchase: FormArray<FormGroup<{
    id: FormControl<number>;
    cashDiscount: FormControl<number>;
  }>>;
  remaininAmount: FormControl<number>;
}>;

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
    AutocompleteClient,
    FormsModule
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
  @Input() purchases!: PurchaseFormGroup;

  displayedColumn: string[] = ['select', 'position', 'invoiceNumber', 'companyName', 'invoiceDate', 'dueDate', 'invoiceAmount', 'dueAmount', 'cashDiscount', 'netPayableAmount'];
  dataSource = new MatTableDataSource<purchaseTable>([]);
  selection = new SelectionModel<purchaseTable>(true, []);

  constructor(
    private clientStore: ClientStore,
    private invoiceStore: InvoiceStore,
    private fb: FormBuilder,
    private cdRef: ChangeDetectorRef,
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

  syncSelectionToForm() {
    const formArray = this.purchases.controls.purchase;

    formArray.clear();

    this.selection.selected.forEach(row => {
      formArray.push(
        this.fb.group({
            id: new FormControl(row.id, { nonNullable: true }),
            cashDiscount: new FormControl(row.cashDiscount || 0, { nonNullable: true })
        })
      );
    });

    this.purchases.controls.remaininAmount.setValue(
      this.tableSummary?.remainingBalance || 0
    );
  }

  onRowToggle(row: purchaseTable) {
    this.selection.toggle(row);
    this.updateSummary();
    this.syncSelectionToForm();
    this.cdRef.detectChanges();
  }

  updateSummary() {
    const selectedRows = this.selection.selected;
    let amount = this.amount.value || 0;

    const result = selectedRows.reduce((data, row) => {
      const due = row.dueAmount || 0;
      const cashDis = row.cashDiscount || 0;

      data.invoiceSelected += 1;
      data.totalCashDiscount += row.cashDiscount || 0;
      data.totalInvoiceAmount += due - cashDis;

      const paying = Math.min(due, amount) - cashDis;
      data.totalPayingNow += paying;

      amount -= paying;

      return data;
    }, {
        invoiceSelected: 0,
        totalInvoiceAmount: 0,
        totalCashDiscount: 0,
        totalPayingNow: 0,
        remainingBalance: 0
    });
    result.remainingBalance = amount;
    this.tableSummary = result;
  }

  isRowSelectable(row: purchaseTable, amount: number): boolean {
    const selectedTotal = this.selection.selected
      .filter(r => r !== row)
      .reduce((sum, r) => sum + (r.dueAmount - r.cashDiscount), 0);

    const remaining = amount - selectedTotal;

    return (row.dueAmount - row.cashDiscount) <= remaining;
  }

  onDiscountChange(row: purchaseTable) {
    if (row.cashDiscount > row.dueAmount)
      row.cashDiscount = row.dueAmount;

    if (row.cashDiscount < 0)
      row.cashDiscount = 0;

    this.updateSummary();
    this.syncSelectionToForm();
  }

  handleAmountChange(amount: number) {
    const validSelections = this.selection.selected.filter(row =>
      this.isRowSelectable(row, amount)
    );
    
    this.selection.clear();
    this.selection.select(...validSelections);
  }

  convertToTableItems() {
    this.invoices.filter(invoice => ['UNPAID', 'PENDING'].includes(invoice.status))
      .forEach((invoice: InvoiceModel, index: number) => {
        const invoiceTable: purchaseTable = {
          id: invoice.id,
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
    const selectableRows = this.dataSource.data
      .filter(row => this.isRowSelectable(row, this.amount.value));

    return this.selection.selected.length === selectableRows.length;
  }

  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
    } else {
      this.dataSource.data.forEach(row => {
        if (this.isRowSelectable(row, this.amount.value)) {
          this.selection.select(row);
        }
      });
    }
    this.updateSummary();
    this.syncSelectionToForm();
  }

  checkboxLabel(row?: purchaseTable): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }
}
