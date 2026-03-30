import { Component } from '@angular/core';
import { HeaderCardData, HeaderCards } from '../../layout/header-cards/header-cards';

@Component({
  selector: 'app-dashboard',
  imports: [HeaderCards],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  headerCards: HeaderCardData[] = [
    {
      header: 'Total Purchases',
      count: '1,245',
      hint: '+12.5% this month',
      color: 'text-green-500'
    },
    {
      header: 'Total Orders',
      count: '890',
      hint: '+8.2% this month',
      color: 'text-blue-500'
    },
    {
      header: 'Total Revenue',
      count: '$12,430',
      hint: '+5.4% this month',
      color: 'text-yellow-500'
    }
  ];
}
