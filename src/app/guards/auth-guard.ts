import { Injectable } from '@angular/core';
import { CanActivate, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { FirebaseService } from '../service/firebase.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private readonly firebaseService: FirebaseService) {}

  public canActivate():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.isLoggedIn();
  }

  private isLoggedIn(): Observable<boolean> {
    return new Observable<boolean>((subscription) => {
      this.firebaseService.getCurrentUserState().subscribe((user) => {
        subscription.next(user !== null);
        subscription.complete();
      });
    });
  }
}
