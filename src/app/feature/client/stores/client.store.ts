import { Injectable, signal } from "@angular/core";
import { ClientService } from "../service/client.service";
import { ClientData } from "../model/client.model";
import { tap } from "rxjs";

@Injectable({ providedIn: 'root' })
export class ClientStore {    
    constructor(private api: ClientService) {}

    clients = signal<ClientData[]>([]);
    loading = signal(false);

    loadClients() {
        this.loading.set(true);

        this.api.getClients().subscribe({
            next: (data) => {
                console.log(data);
                this.clients.set(data);
                this.loading.set(false);
            },
            error: () => this.loading.set(false)
        });
    }

    addClient(client: ClientData) {
        return this.api.addClient(client).pipe(
            tap((added: ClientData) => {
                this.clients.update(list => [...list, added]);
            })
        );
    }
}
