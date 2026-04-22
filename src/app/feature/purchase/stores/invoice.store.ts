import { Injectable, signal } from "@angular/core";
import { InvoiceModel } from "../model/purchase.model";
import { InvoiceService } from "../service/invoice.service";
import { tap } from "rxjs/operators";
import { of } from "rxjs";

@Injectable({ providedIn: 'root' })
export class InvoiceStore {
  constructor(private api: InvoiceService) {}

  purchases = signal<InvoiceModel[]>([]);
  loadingPurchase = signal(false);

  loadPurchases() {
      this.loadingPurchase.set(true);

      this.api.getAllPurchase().subscribe({
          next: (data) => {
              console.log("purchase: ", data);
              this.purchases.set(data);
              this.loadingPurchase.set(false);
          },
          error: () => this.loadingPurchase.set(false)
      }); 
  }

  addPurchase(purchase: InvoiceModel) {
    return this.api.addPurchase(purchase).pipe(
      tap(added => {
        this.purchases.update(list => [...list, added]);
      })
    );
  }

  getPurchaseById(id: number) {
    const existing = this.purchases().find(p => p.id === id);
    if(existing)
      return of(existing);
    console.log("HERE", existing);
    return this.api.getPurchaseById(id);
  }

  updatePurchase(id: number, purchase: InvoiceModel) {
    return this.api.updatePurchaseById(id, purchase).pipe(
      tap(updated => {
        this.purchases.update(list => 
          list.map(item => 
            item .id === id ? updated : item
          )
        )
      })
    );
  }
}
