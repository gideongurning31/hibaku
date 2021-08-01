import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';
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

  constructor(private router: Router, private authService: AuthService) {}

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
        { name: 'Supply / Demand', icon: 'fa-cart-plus', route: 'supply-demand' },
        { name: 'Registrasi User', icon: 'fa-id-card-o', route: 'registrasi-penerima' },
      ];
    }
  }

  initActiveMenu() {
    this.router.events.subscribe(event => {
      this.navMenu.forEach(menu => {
        if (event instanceof NavigationEnd && event.url === '/'.concat(menu.route)) {
          this.activeMenu = menu.name;
        }
      });
    });
  }

  navigate(menu: Menu) {
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
