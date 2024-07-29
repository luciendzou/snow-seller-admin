import { afterRender, Component, OnInit } from '@angular/core';
import {MatProgressBarModule} from '@angular/material/progress-bar';
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


  constructor( private router: Router, private authService: AuthService){
    afterRender(() => {
      authService.loadStorage();
    })
  }
  ngOnInit(): void {
    console.log(this.authService.user);

    if (this.authService.user && this.authService.token) {
      this.router.navigate(["/dashboard"])
    }else{
      this.router.navigate(["/login"])
    }
  }
}
