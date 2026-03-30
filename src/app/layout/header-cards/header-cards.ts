import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

export interface HeaderCardData {
  header: string;
  count: string;
  hint: string;
  color: string;
}

@Component({
  selector: 'app-header-cards',
  imports: [CommonModule],
  template: `
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
    <div *ngFor="let cardContent of cardContents"
         class="bg-white rounded-2xl shadow-md p-5">
      <p class="text-gray-500 text-sm">{{cardContent.header}}</p>
      <h2 class="text-2xl font-bold mt-2">{{cardContent.count}}</h2>
      <p class="text-sm mt-1" [ngClass]="cardContent.color" >{{cardContent.hint}}</p>
    </div>
  </div>`
})
export class HeaderCards {
  @Input() cardContents: HeaderCardData[] = [{
    header: '',
    count: '',
    hint: '',
    color: ''
  }];
}

