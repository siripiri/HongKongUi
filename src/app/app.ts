import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Sidebar } from "./layout/sidebar/sidebar";
import { FinanceFacade } from './feature/payment/store/allocation-store';

@Component({
  selector: 'app-root',
  imports: [Sidebar],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  private facade = inject(FinanceFacade);
  protected readonly title = signal('HongKongUi');

  ngOnInit(): void {
    this.facade.init();
  }
}
