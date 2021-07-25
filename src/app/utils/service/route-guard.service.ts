import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

@Injectable()
export class RouteGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    if (localStorage.getItem('sessionToken')) return true;
    this.router.navigate(['login']);
    return false;
  }
}

@Injectable()
export class LoginGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    if (!localStorage.getItem('sessionToken')) return true;
    this.router.navigate(['/']);
    return false;
  }
}
