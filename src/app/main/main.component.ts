import { Router, RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { LoadingPageComponent } from "../loading-page/loading-page.component";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MenubarComponent } from '../menubar/menubar.component';
import { SidenavComponent } from '../sidenav/sidenav.component';
import { CommonModule } from '@angular/common';
import { SkeletonModule } from 'primeng/skeleton';
import { afterRender, Component, computed, OnInit, signal } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    ButtonModule,
    MatToolbarModule,
    MatSidenavModule,
    NgbModule,
    MenubarComponent,
    SkeletonModule,
    SidenavComponent,
    LoadingPageComponent
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent implements OnInit{
  title: string = '';
  Logo: any;
  isLoading: boolean = true;
  collapsed = signal(false);

  constructor( private router: Router, private authService : AuthService) {
  }

  sidenavWidth = computed(() => this.collapsed() ? '85px' : '270px');

  ngOnInit(): void {
    if (!this.authService.user && !this.authService.token) {
      this.router.navigate(["/login"]);
    }else{
      this.authService.getUsersCount().subscribe(data => {

        if (data) {
          this.title = data.data[0].entreprise;
          this.Logo = data.data[0].logo;

          this.isLoading = false;
        }
      });
    }

  }

}
