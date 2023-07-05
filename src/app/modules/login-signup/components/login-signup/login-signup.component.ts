import { Component } from '@angular/core';
import {
  EmailAuthProvider,

  FacebookAuthProvider,
  GithubAuthProvider,
  GoogleAuthProvider,
  TwitterAuthProvider,
} from '@angular/fire/auth';
import { Router } from '@angular/router';
import { auth } from 'firebaseui';
import { FirebaseService } from 'src/app/service/firebase.service';

@Component({
  selector: 'app-login-signup',
  templateUrl: './login-signup.component.html',
  styleUrls: ['./login-signup.component.scss'],
})
export class LoginSignupComponent {
  public showSpinner: boolean = true;

  constructor(
    private readonly firebaseService: FirebaseService,
    private readonly router: Router
  ) {}

  public ngOnInit(): void {
    this.redirectIfLoggedIn();

    const ui = new auth.AuthUI(this.firebaseService.auth);

    ui.start('#firebaseui-auth-container', {
      signInOptions: [
        EmailAuthProvider.PROVIDER_ID,

        GoogleAuthProvider.PROVIDER_ID,
        TwitterAuthProvider.PROVIDER_ID,
        GithubAuthProvider.PROVIDER_ID,
        FacebookAuthProvider.PROVIDER_ID,
      ],
      callbacks: {
        uiShown: () => {
          console.log(false);
          this.showSpinner = false;
        },
      },
      signInSuccessUrl: 'chats',
      tosUrl: 'https://github.com/borankoeruek/chatApp',
      privacyPolicyUrl: 'https://github.com/borankoeruek/chatApp',
    });
  }

  private redirectIfLoggedIn(): void {
    this.firebaseService.getCurrentUserState().subscribe((user) => {
      if (user !== null) {
        this.router.navigate(['chats']);
      }
    });
  }
}
