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
  navMenu: Array<Menu> = [];
  profile: UserProfile;
  activeMenu: string;

  constructor(private router: Router, private authService: AuthService, private observer: BreakpointObserver) {}

  ngOnInit(): void {
    this.initUserProfile();
    this.initMenu();
    this.initActiveMenu();
  }

  initUserProfile() {
    this.profile = {
      id: localStorage.getItem('userId'),
      name: localStorage.getItem('displayName'),
      role: localStorage.getItem('roleName'),
    };
  }

  initMenu() {
    if (this.profile.role) {
      this.navMenu = [
        { name: 'Beranda', icon: 'fa-home', route: '' },
        { name: 'Transaksi', icon: 'fa-handshake-o', route: 'transaksi' },
        { name: 'Komoditas', icon: 'fa-shopping-basket', route: 'komoditas' },
        { name: 'Registrasi Produsen', icon: 'fa-cart-plus', route: 'registrasi-produsen' },
        { name: 'Registrasi Penerima', icon: 'fa-id-card-o', route: 'registrasi-penerima' },
      ];
    }
  }

  initActiveMenu() {
    this.navMenu.forEach((menu) => {
      if (this.router.url === '/'.concat(menu.route)) {
        this.activeMenu = menu.name.toUpperCase();
      }
    });
  }

  navigate(menu: Menu) {
    this.activeMenu = menu.name.toUpperCase();
    this.router.navigate([menu.route]);
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
