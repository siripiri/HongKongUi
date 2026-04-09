import { RouterModule, Routes } from '@angular/router';
import { Dashboard } from './application/dashboard/dashboard';
import { NgModule } from '@angular/core';
import { Purchase } from './application/purchase/purchase';
import { Invoice } from './application/invoice/invoice';
import { Client } from './feature/client/components/client/client';

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
            { path: 'invoice/:id', component: Invoice, data: { breadcrumb: 'Invoice' }}
        ]
    }
];

