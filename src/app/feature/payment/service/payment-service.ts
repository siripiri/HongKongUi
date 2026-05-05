import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AddPaymentModel, AddPaymentResponse, PaymentModel, PurchasePaymentMap } from "../model/payment.model";

@Injectable({ providedIn: 'root' })
export class PaymentService {
    private baseUrl = 'http://localhost:8080/api/payment';

    constructor(private http: HttpClient) {}

    getAllPayments(): Observable<PaymentModel[]> {
        return this.http.get<PaymentModel[]>(this.baseUrl);
    }

    addPayment(payment: AddPaymentModel): Observable<AddPaymentResponse> {
        console.log("API Payment", payment);
        return this.http.post<AddPaymentResponse>(this.baseUrl, payment);
    }

    getAll(): Observable<PurchasePaymentMap[]> {
        return this.http.get<PurchasePaymentMap[]>(`${this.baseUrl}/map`);
    }

}