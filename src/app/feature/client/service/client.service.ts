import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ClientData } from "../model/client.model";

@Injectable({ providedIn: 'root' })
export class ClientService {
    private baseUrl = 'http://localhost:8080/api/client';

    constructor(private http: HttpClient) {}

    getClients(): Observable<ClientData[]> {
        return this.http.get<ClientData[]>(this.baseUrl);
    }

    addClient(client: ClientData): Observable<ClientData> {
        console.log("add Client: ", client);
        const payload = JSON.parse(JSON.stringify(client));
        console.log("Payload: ", payload);
        return this.http.post<ClientData>(this.baseUrl, payload);
    }

    updateClient(id: number, client: ClientData) {
    }

}
