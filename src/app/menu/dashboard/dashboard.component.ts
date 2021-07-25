import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/utils/service/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  profile: UserProfile;
  navMenu: Array<Menu>;
  showFiller: boolean;

  constructor(private authService: AuthService) {}

  ngOnInit() {
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
      { name: 'Menu 1', icon: 'fa-circle', route: '' },
      { name: 'Menu 2', icon: 'fa-circle', route: '' },
      { name: 'Menu 3', icon: 'fa-circle', route: '' },
      { name: 'Menu 4', icon: 'fa-circle', route: '' },
    ];
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
