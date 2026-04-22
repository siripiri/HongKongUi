import { Routes } from '@angular/router';
import { Dashboard } from './application/dashboard/dashboard';
import { Client } from './feature/client/components/client/client';
import { Payments } from './feature/payment/components/payments/payments';
import { AddPayment } from './feature/payment/components/add-payment/add-payment';
import { Purchase } from './feature/purchase/components/purchase/purchase';
import { Invoice } from './feature/purchase/components/invoice/invoice';

export const routes: Routes = [
    { path:'', redirectTo: 'home', pathMatch: 'full'},
    { path:'', component:  Dashboard},
    { path: 'client', data: { breadcrumb: 'Client Management'} , component: Client },
    {
        path: 'purchases',
        data: { breadcrumb: 'Purchase Management' },
        children: [
            { path: '', component: Purchase },
            { path: 'invoice', component: Invoice, data: { breadcrumb: 'Invoice' }},
            { path: 'invoice/:id', component: Invoice, data: { breadcrumb: `Invoice` }}
        ]
    },
    {
        path: 'payments',
        data: { breadcrumb: 'Payments Management' },
        children: [
            { path: '', component: Payments },
            { path: 'payment', component: AddPayment, data: { breadcrumb: 'add new payment' }},
        ]
    }
];
