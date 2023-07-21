import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateChildFn, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class GuardService {

  constructor(private router: Router, private storageServices: StorageService) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean{
    if(this.storageServices.isLoggedIn()){
      return true
    }
    return false
  }
}

export const AuthGuard: CanActivateFn = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  return inject(GuardService).canActivate(next, state);
}

export const AuthGuardChild: CanActivateChildFn = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot) => AuthGuard(next, state);
