import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AddApprovComponent } from './add-approv/add-approv.component';
import { ViewApprovComponent } from './view-approv/view-approv.component';

@Component({
  selector: 'app-approv',
  standalone: true,
  imports: [
    RouterOutlet,
    ViewApprovComponent,
    AddApprovComponent
  ],
  templateUrl: './approv.component.html',
  styleUrl: './approv.component.css'
})
export class ApprovComponent {

}
