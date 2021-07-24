import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

@Injectable()
export class RouteGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    return true;
  }
}

@Injectable()
export class LoginGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    return false;
  }
}
