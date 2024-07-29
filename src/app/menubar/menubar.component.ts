import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { DividerModule } from 'primeng/divider';
import { MessageService } from 'primeng/api';
import { SkeletonModule } from 'primeng/skeleton';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menubar',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    NgbModule,
    MatToolbarModule,
    AvatarModule,
    AvatarGroupModule,
    SkeletonModule,
    DividerModule,
  ],
  templateUrl: './menubar.component.html',
  styleUrl: './menubar.component.css',
  providers: [MessageService],
})
export class MenubarComponent implements OnInit {
  authService = inject(AuthService);
  UserData!: any[];
  nameUser: string = '';

  constructor(private router: Router, private messageService: MessageService,) { }

  ngOnInit(): void {

    this.getSuperAdminInfos();

  }

  logout() {
    this.authService.logout();
  }

  getSuperAdminInfos(){
    this.authService.getUsersCount().subscribe(data => {
      if (data) {
        this.nameUser = data.data[0].name;
      }
    });

  }
}
