import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { map, Observable, take } from "rxjs";
import { AuthService } from "../injectionServices/auth.service";
import { Injectable } from "@angular/core";



@Injectable({ providedIn: 'root' })

export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    // Logic to check if the user is authenticated
    return this.authService.user.pipe(
      take(1),
      map(user => {
        if (user) {
          console.log('User is authenticated:', user);
          return true; // Allow access to the route
        } else {
          this.router.navigate(['/authentication']); // Redirect to authentication page
          return false; // Deny access to the route
        }
      })
    )
  }
}
