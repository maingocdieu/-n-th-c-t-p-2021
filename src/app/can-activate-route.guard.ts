import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router
} from '@angular/router';
import { Observable } from 'rxjs';
import { TokenStorageService } from './_services/token-storage.service';

@Injectable()
export class CanActivateRouteGuard implements CanActivate {
  constructor(private tokenStorage: TokenStorageService, private router: Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    let roles = this.tokenStorage.getUser()?.roles;;
    console.log(roles);
    if (roles && roles[0] === "ROLE_ADMIN") {
      return true;
    } else {
      this.router.navigateByUrl("");
      return false;
    }

  }

}

