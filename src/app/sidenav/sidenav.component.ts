import { CommonModule } from '@angular/common';
import { Component, computed, Input, signal } from '@angular/core';
import {MatListModule} from '@angular/material/list';
import { DashboardData, ProductsData } from './navbar';
import {MatDividerModule} from '@angular/material/divider';
import { DividerModule } from 'primeng/divider';
import { StyleClassModule } from 'primeng/styleclass';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MenuItemComponent } from "./menu-item/menu-item.component";

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [
    CommonModule,
    MatListModule,
    MatDividerModule,
    DividerModule,
    StyleClassModule,
    RouterLink,
    RouterLinkActive,
    MenuItemComponent
  ],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css'
})
export class SidenavComponent {

  sideNavCollapsed = signal(false);
  @Input() set collapsed(val:boolean){
    this.sideNavCollapsed.set(val);
  }

  dasboard = DashboardData;
  product = ProductsData;
}
