import { computed, inject, Injectable, signal } from "@angular/core";
import { PurchasePaymentMap, purchaseTable } from "../model/payment.model";
import { PaymentService } from "../service/payment-service";
import { PaymentStore } from "./payment-store";
import { InvoiceStore } from "../../purchase/stores/invoice.store";
import { ClientStore } from "../../client/stores/client.store";

@Injectable({ providedIn: 'root' })
export class AllocationStore {
    private _data = signal<PurchasePaymentMap[]>([]);
    data = this._data.asReadonly();

    set(data: PurchasePaymentMap[]) {
        this._data.set(data);
    }

    add(map: PurchasePaymentMap) {
        this._data.update(list => [...list, map]);
    }
    
    addAll(map: PurchasePaymentMap[]) {
        this._data.update(list => [...list, ...map]);
    }

    byPurchase = computed(() => {
        const maps = this._data();
        return (id: number) => maps.filter(m => m.purchaseId === id);
    });

    byPayment = computed(() => {
        const maps = this._data();
        return (id: number) => maps.filter(m => m.paymentId === id);
    });
}

@Injectable({ providedIn: 'root' })
export class FinanceFacade {
    private api = inject(PaymentService);

    private allocationStore = inject(AllocationStore);
    private purchaseStore = inject(InvoiceStore);
    private clientStore = inject(ClientStore);
    private paymentStore = inject(PaymentStore);


    init() {
        this.api.getAll().subscribe(data => {
            console.log('allocation: ', data);
            this.allocationStore.set(data);
        });

        this.purchaseStore.loadPurchases();
        this.clientStore.loadClients();
        this.paymentStore.loadPayments();
    }
}