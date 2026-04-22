import { ClientData } from "../../client/model/client.model";

export interface InvoiceItem {
    id: number;
    productType: string;
    hsnCode: string;
    rate: number;
    quantity: number;
    unit: string;
    unitPrice: number;
    discount: number;
    taxableAmount: number;
    sgst: number;
    cgst: number;
    igst: number;
    totalAmount: number;
}

export interface InvoiceModel {
    id: number;
    invoiceNumber: string;
    orderNumber: string;
    status: string;
    invoiceDate: string;
    dueDate: string;
    shippingCost: number;
    taxableAmount: number;
    sgst: number;
    cgst: number;
    igst: number;
    invoiceAmount: number;
    roundOff: number;
    cashDiscount: number;
    grandTotal: number;
    dueAmount: number;
    paidAmount: number;
    client: ClientData;
    purchaseItems: InvoiceItem[];
}