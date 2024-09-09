import { afterRender, Component, OnInit } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-loading-page',
  standalone: true,
  imports: [
    MatProgressBarModule,],
  templateUrl: './loading-page.component.html',
  styleUrl: './loading-page.component.css'
})
export class LoadingPageComponent implements OnInit {


  constructor(private router: Router, private authService: AuthService) {
  }
  ngOnInit(): void {
    if (this.authService.isLoggedIn) {
      if (this.authService.checkEmailVerification) {
        this.router.navigate(["/verify-email-address"]);
      }

      this.router.navigate(["/dashboard"]);
    }

    if (!this.authService.isLoggedIn) {
      this.router.navigate(["/login"])
    }
  }
}
