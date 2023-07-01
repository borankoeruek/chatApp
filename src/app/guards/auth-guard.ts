import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { FirebaseService } from '../service/firebase.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private readonly firebaseService: FirebaseService,
    private readonly router: Router
  ) {}

  public canActivate():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const isLoggedIn = this.isLoggedIn();

    isLoggedIn.subscribe((isLoggedIn) => {
      if (!isLoggedIn) {
        this.redirectToLogin();
      }
    });

    return isLoggedIn;
  }

  private isLoggedIn(): Observable<boolean> {
    return new Observable<boolean>((subscription) => {
      this.firebaseService.getCurrentUserState().subscribe((user) => {
        subscription.next(user !== null);
        subscription.complete();
      });
    });
  }

  private redirectToLogin(): void {
    console.log(2);
    this.router.navigate(['login']);
  }
}
