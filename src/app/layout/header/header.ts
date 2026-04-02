import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute, NavigationEnd, RouterModule } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterModule],
  template: `
  <header class="mb-8 flex items-center justify-between">
    <div>
      <h1 class="text-2xl font-bold tracking-tight text-slate-900 mb-1">
        <ng-container *ngFor="let crumb of breadcrumbs; let i = index">
          <span>{{ crumb }}</span>
          <span *ngIf="i < breadcrumbs.length - 1"> &gt; </span>
        </ng-container>
      </h1>
    </div>
  </header>`
})
export class HeaderComponent {

  breadcrumbs: string[] = [];

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.breadcrumbs = this.buildBreadcrumb(this.route.root);
      });
  }

  buildBreadcrumb(route: ActivatedRoute, breadcrumbs: string[] = []): string[] {
    if (route.routeConfig && route.routeConfig.data?.['breadcrumb']) {
      breadcrumbs.push(route.routeConfig.data['breadcrumb']);
    }

    if (route.firstChild) {
      return this.buildBreadcrumb(route.firstChild, breadcrumbs);
    }

    return breadcrumbs;
  }
}