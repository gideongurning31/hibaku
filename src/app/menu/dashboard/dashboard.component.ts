import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';
import { AuthService } from 'src/app/utils/service/auth.service';
import { allMenu } from './dashboard-menu.model';

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
      roleId: localStorage.getItem('roleId'),
      roleName: localStorage.getItem('roleName'),
    };
  }

  initMenu() {
    if (this.profile.roleId) {
      allMenu.forEach(menu => {
        if (!menu.admin || (menu.admin && this.profile.roleId === '1')) {
          this.navMenu.push(menu);
        }
      });
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

export interface Menu {
  name: string;
  icon: string;
  route: string;
  admin: boolean;
}

interface UserProfile {
  id: string;
  name: string;
  roleId: string;
  roleName: string;
}
