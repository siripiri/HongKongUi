import { RouterModule, Routes } from '@angular/router';
import { Dashboard } from './application/dashboard/dashboard';
import { NgModule } from '@angular/core';
import { Purchase } from './application/purchase/purchase';

export const routes: Routes = [
    { path:'', redirectTo: 'home', pathMatch: 'full'},
    { path:'', component:  Dashboard},
    { path:'purchases', component: Purchase}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutAppRoutingModule {}
