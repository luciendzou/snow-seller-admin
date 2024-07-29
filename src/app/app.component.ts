import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginpageComponent } from './auth/loginpage/loginpage.component';
import { RegisterpageComponent } from './auth/registerpage/registerpage.component';
import { LoadingPageComponent } from './loading-page/loading-page.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    LoginpageComponent,
    LoadingPageComponent,
    RegisterpageComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent{
  title = 'snow-seller-admin';

}
