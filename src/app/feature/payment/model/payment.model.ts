export interface AddPaymentModel {
    paymentType: string;
    amount: number;
    paymentDate: string;
    chequeNumber: string;
    dueDate: string;
    bankName: string;
    referenceId: string;
    purchases: {
        purchase: AddPaymentPurchaseModel;
        remainingAmount: number;
    };
}

export interface AddPaymentPurchaseModel {
    id: number;
    cashDiscount: number;
}

export interface purchaseTable {
    id: number;
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

export interface PaymentModel {
    id: number;
    paymentType: string;
    amount: number;
    status: number;
    remainingAmount: number;
    paymentDate: string;
    paymentDetails: PaymentDetailModel;
}

export interface PaymentDetailModel {
    id: number;
    referenceId: string;
    chequeNumber: string;
    dueDate: string;
    bankName: string;
}

export interface AddPaymentResponse {
    payment: PaymentModel;
    purchasePaymentList: PurchasePaymentMap[];
}

export interface PurchasePaymentMap {
    id: number;
    purchaseId: number;
    paymentId: number;
    amountApplied: number;
}
