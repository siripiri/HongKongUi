import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { ClientData } from "../model/client.model";

@Injectable({ providedIn: 'root' })
export class ClientService {
    private baseUrl = '';

    clients: ClientData[] = [
        { companyName: 'A.G.R Textile', gstNo: 'GST-33BHYPK0651H1Z6', address: {street1: 'No-85/B1', street2: 'P.R.Srinivasan Street', city: 'Dharmapuri', state: 'Tamil Nadu', country: 'India', pincode: 636701}, email: 'abc@g.com', phoneNumber: '9442222460'},
    ]

    constructor(private http: HttpClient) {}

    getClients(): Observable<ClientData[]> {
        return of(this.clients);
        // return this.http.get<ClientData[]>(this.baseUrl);
    }

    createClients(client: ClientData) {
        this.clients.push(client);
        // return this.http.post<ClientData>(this.baseUrl, client);
    }

    updateClient(id: number, client: ClientData) {

    }

}
