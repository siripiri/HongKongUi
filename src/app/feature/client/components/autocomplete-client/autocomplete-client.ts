import { Component, effect, Input, OnInit } from "@angular/core";
import { ClientData } from "../../model/client.model";
import { combineLatest, map, Observable, startWith } from "rxjs";
import { ClientStore } from "../../stores/client.store";
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import { toObservable } from "@angular/core/rxjs-interop";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatOptionModule } from "@angular/material/core";
import { MatIconModule } from "@angular/material/icon";
import { AsyncPipe, CommonModule } from "@angular/common";
import { MatInputModule } from "@angular/material/input";


@Component({
    selector: 'autocomplete-client',
    imports: [MatFormFieldModule, MatInputModule, MatAutocompleteModule, ReactiveFormsModule, MatOptionModule, MatIconModule, AsyncPipe, CommonModule],
    template: `
    <mat-form-field appearance="outline" class="w-full lg:flex-1 min-w-[150px]" subscriptSizing="dynamic">
        <mat-label>Client</mat-label>
        <input matInput [formControl]="clientName" placeholder="Search..." [matAutocomplete]="auto">
        <mat-autocomplete #auto="matAutocomplete" [displayWith]="displayFn">
            <mat-option *ngFor="let client of filteredClients | async" [value]="client">
                {{ client.companyName }}
            </mat-option>
        </mat-autocomplete>
        <mat-icon matPrefix class="text-slate-400 mr-2 !text-lg">search</mat-icon>
    </mat-form-field>
    `,
})
export class AutocompleteClient implements OnInit {

    @Input() clientName!: FormControl;

    clients: ClientData[] = [];
    filteredClients!: Observable<ClientData[]>;
    private clients$!: Observable<ClientData[]>;

    constructor(private clientStore: ClientStore) {
        this.clients$ = toObservable(this.clientStore.clients);

        effect(() => {
            const client = this.clientStore.clients();
            this.clients = client;
        });
    }

    ngOnInit() {
        this.filteredClients = combineLatest([
            this.clientName.valueChanges.pipe(startWith('')),
            this.clients$
        ]).pipe(
            map(([filterValue, clients]) => {
                let filter = '';
                if (typeof filterValue === 'string') {
                    filter = (filterValue || '').toLowerCase();
                } else if (filterValue && typeof filterValue === 'object' && filterValue.companyName) {
                    filter = filterValue.companyName.toLowerCase();
                }
                return clients.filter(client => 
                    client.companyName.toLowerCase().includes(filter)
                );
            })
        );
    }

    displayFn(client: ClientData): string {
        return client ? client.companyName : '';
    }
}
