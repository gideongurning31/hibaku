import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout';
import { AuthService } from 'src/app/utils/service/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  @ViewChild('sidenav') sidenav: MatSidenav;
  profile: UserProfile;
  navMenu: Array<Menu>;
  showFiller: boolean;

  constructor(private router: Router, private authService: AuthService, private observer: BreakpointObserver) {}

  ngOnInit(): void {
    this.showFiller = false;
    this.initUserProfile();
    this.initMenu();
  }

  initUserProfile() {
    this.profile = {
      id: localStorage.getItem('userId'),
      name: localStorage.getItem('displayName'),
      role: localStorage.getItem('roleName'),
    };
  }

  initMenu() {
    this.navMenu = [
      { name: 'Beranda', icon: 'fa-home', route: '' },
      { name: 'Registrasi Produsen', icon: 'fa-cart-plus', route: 'registrasi-produsen' },
      { name: 'Registrasi Penerima', icon: 'fa-shopping-basket', route: 'registrasi-penerima' },
    ];
  }

  navigate(path: string) {
    this.router.navigate([path]);
    this.sidenav.close();
  }

  logout() {
    this.authService.logout();
  }
}

interface UserProfile {
  id: string;
  name: string;
  role: string;
}

interface Menu {
  name: string;
  icon: string;
  route: string;
}
