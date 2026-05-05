import { computed, Injectable, signal } from "@angular/core";
import { AddPaymentModel, AddPaymentResponse, PaymentModel } from "../model/payment.model";
import { PaymentService } from "../service/payment-service";
import { AllocationStore } from "./allocation-store";
import { InvoiceStore } from "../../purchase/stores/invoice.store";
import { tap } from "rxjs/operators";
import { Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export class PaymentStore {

    constructor(
        private api: PaymentService,
        private allocationStore: AllocationStore,
        private purchaseStore: InvoiceStore,
    ) {}
    
    payments = signal<PaymentModel[]>([]);
    loadingPayment = signal(false);

    loadPayments() {
        this.loadingPayment.set(true);
        
        this.api.getAllPayments().subscribe({
            next: (data) => {
                console.log('load payments:', data);
                this.payments.set(data);
                this.loadingPayment.set(false);
            },
            error: () => this.loadingPayment.set(false)
        })
    }

    addPayment(payment: AddPaymentModel): Observable<AddPaymentResponse> {
        return this.api.addPayment(payment).pipe(
            tap(added => {
                this.payments.update(list => [...list, added.payment]);
                this.allocationStore.addAll(added.purchasePaymentList);
            })
        );
    }

    paymentsMap = computed(() => {
        const payments = this.payments();
        return new Map(payments.map(p => [p.id, p]));
    })

    getPurchasesByPayment = computed(() => {
        const allocation = this.allocationStore.byPayment();
        const purchasesMap = this.purchaseStore.purchasesMap(); 

        return (paymentId: number) => {
            return allocation(paymentId)
                .map(m => ({
                    purchase: purchasesMap.get(m.purchaseId),
                    amountApplied: m.amountApplied
                }))
                .filter(x => x.purchase);
        };
    });
}
