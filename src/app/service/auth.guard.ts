import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthenticationService } from "./authentication.service";

@Injectable({ providedIn: 'root' })
export class AuthorizatedGuard implements CanActivate {
    constructor(private router: Router,
    private authenticationService: AuthenticationService) { }

    canActivate() {
        if (this.authenticationService.isAuthenticated()) {
            return true;
        }
        this.router.navigate(['/login']);
    }
}
