import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { InvoiceModel } from "../model/purchase.model";

@Injectable({ providedIn: 'root' })
export class InvoiceService {
  private baseUrl = 'http://localhost:8080/api/purchase';

  constructor(private http: HttpClient) { }

  getAllPurchase(): Observable<InvoiceModel[]> {
    return this.http.get<InvoiceModel[]>(this.baseUrl);
  }

  addPurchase(purchase: InvoiceModel): Observable<InvoiceModel> {
    return this.http.post<InvoiceModel>(this.baseUrl, purchase);
  }

  getPurchaseById(id: number): Observable<InvoiceModel> {
    return this.http.get<InvoiceModel>(`${this.baseUrl}/${id}`);
  }

  updatePurchaseById(id: number, purchase: InvoiceModel): Observable<InvoiceModel> {
    return this.http.put<InvoiceModel>(`${this.baseUrl}/${id}`, purchase);
  }
}
