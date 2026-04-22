import { O } from "@angular/cdk/keycodes";
import { InvoiceModel } from "../../purchase/model/purchase.model";
import { ClientData } from "../../client/model/client.model";

export interface Payment {
    id: number;
    paymentType: string;
    amount: number;
    status: number;
    amountApplied: number;
    paymentDate: string;
    paymentDetails: PaymentDetails;
    purchases: InvoiceModel
}

export interface PaymentDetails {
    referenceId: string;
    chequeNumber: string;
    dueDate: string;
    bankName: string;
}

export interface purchaseTable {
    position: number;
    invoiceNumber: string;
    companyName: string;
    invoiceDate: string;
    dueDate: string;
    invoiceAmount: number;
    dueAmount: number;
    cashDiscount: number;
    netPayableAmount: number;
    updatedDueAmount: number;
}

export interface tableSummary {
    invoiceSelected: number;
    totalInvoiceAmount: number;
    totalCashDiscount: number;
    totalPayingNow: number;
    remainingBalance: number;
}

