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
import { BrowserStorageService } from '../services/browser-storage.service';

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
export class MainComponent implements OnInit {
  title: string = '';
  Logo: any;
  isLoading: boolean = true;
  collapsed = signal(false);
  Admin: any;
  user:any;

  constructor(
    private router: Router,
    private LocalStorage: BrowserStorageService,
    private authService: AuthService) {

     this.user = JSON.parse(this.LocalStorage.get('user')!);
     this.getUsers();
  }

  sidenavWidth = computed(() => this.collapsed() ? '85px' : '270px');

  ngOnInit(): void {
    if (!this.authService.uid && !this.authService.isLoggedIn) {
      this.isLoading=false;
      this.router.navigate(["/login"]);
    } else {
      if (this.authService.checkEmailVerification) {
        this.router.navigate(["/verify-email-address"]);
      }
      this.isLoading=false;

    }

  }

  async getUsers() {

    this.Admin = await this.authService.getUsersCount(this.user.uid);
    this.Logo = this.Admin[0].sigle
 }

}
