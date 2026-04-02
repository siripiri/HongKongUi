import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from "@angular/router";
import { HeaderComponent } from "../header/header";

@Component({
  selector: 'app-sidebar',
  imports: [RouterOutlet, RouterLink, HeaderComponent],
  templateUrl: './sidebar.html'
})
export class Sidebar {}
