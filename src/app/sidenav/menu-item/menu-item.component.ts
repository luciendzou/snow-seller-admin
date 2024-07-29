import { trigger, transition, style, animate } from '@angular/animations';
import { Component, input, signal } from '@angular/core';
import { MenuItem } from '../helper';
import { RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-menu-item',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, MatListModule, RouterModule],
  templateUrl: './menu-item.component.html',
  styleUrl: './menu-item.component.css',
  animations: [
    trigger('expandedContractMenu', [
      transition(':enter', [
        style({ opacity: 0, height: '0px' }),
        animate('500ms ease-in-out', style({ opacity: 1, height: '*' }))
      ]),
      transition(':leave', [
        animate('500ms ease-in-out', style({ opacity: 0, height: '0px' }))
      ]),
    ])
  ]
})
export class MenuItemComponent {
  item = input.required<MenuItem>();
  collapsed = input(false);

  nestedMenuOpen = signal(false);

  toggleNested() {
    if (!this.item().subItems) {
      return;
    }
    this.nestedMenuOpen.set(!this.nestedMenuOpen());
  }
}
