import { HttpClient, HttpHeaders } from '@angular/common/http';
import { afterNextRender, afterRender, inject, Injectable } from '@angular/core';
import { URL_SERVICE } from '../../config/config';
import { catchError, from, map, Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { BrowserStorageService } from './browser-storage.service';


import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { UserCredential } from '@angular/fire/auth';
import { Superadmin } from '../domains/superadmin';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  user: any;
  token: any = '';

  userData?: Superadmin;

  constructor(public afAuth: AngularFireAuth, public afs: AngularFirestore, private http: HttpClient, private router: Router, private LocalStorage: BrowserStorageService) {
    this.loadStorage();
    /* Saving user data in localstorage when
    logged in and setting up null when logged out */
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user as Superadmin;
        this.LocalStorage.set('user', JSON.stringify(this.userData));
        JSON.parse(this.LocalStorage.get('user')!);
      } else {
        this.LocalStorage.set('user', 'null');
        JSON.parse(this.LocalStorage.get('user')!);
      }
    });
  }


  loadStorage() {

    if (this.LocalStorage.get("userTokenAPI") && this.LocalStorage.get("userData")) {
      this.token = this.LocalStorage.get("userTokenAPI");
      this.user = JSON.parse(this.LocalStorage.get("userData") ?? '');
    }
    else {
      this.token = '';
      this.user = null;
    }
  }

  // Sign up with email/password
  registerUser(userData : Superadmin) {
    return this.afAuth.createUserWithEmailAndPassword(userData.email!, userData.password!).then((result) => {
      /* Call the SendVerificaitonMail() function when new user sign
      up and returns promise */
      this.SendVerificationMail();
      this.SetUserData(result.user, userData);
    })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  // Send email verfificaiton when new user sign up
  SendVerificationMail() {
    return this.afAuth.currentUser
      .then((u: any) => u.sendEmailVerification())
      .then(() => {
        this.router.navigate(['verify-email-address']);
      });
  }

  //manyiyong@gmail.com
  loginUser(email: string, password: string): Promise<void> {
    return this.afAuth.signInWithEmailAndPassword(email, password).then((result) => {
      //this.SetUserData(result.user, );
      this.afAuth.authState.subscribe((user) => {
        if (user) {
          return user;
        }else{
          return null;
        }
      });
    })
      .catch((error) => {
        throw error;

      });
  }


  logout() {
    this.token = null;
    this.user = '';
    this.LocalStorage.remove('userTokenAPI');
    this.LocalStorage.remove('userData');
    this.afAuth.signOut();
    this.router.navigate(['login']);
  }

  // Reset Forggot password
  ForgotPassword(passwordResetEmail: string) {
    return this.afAuth
      .sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert('Password reset email sent, check your inbox.');
      })
      .catch((error) => {
        window.alert(error);
      });
  }

  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    const user = JSON.parse(this.LocalStorage.get('user')!);
    return user !== null && user.emailVerified !== false ? true : false;
  }


  saveLocalStorageResponse(resp: any) {
    if (resp.getIdToken && resp.id) {
      this.LocalStorage.set("userTokenAPI", resp.getIdToken);
      this.LocalStorage.set("userData", JSON.stringify(resp));
      this.user = resp.email;
      this.token = resp.getIdToken
      return true;
    }
    return false;

  }

  /* Setting up user data when sign in with username/password,
  sign up with username/password and sign in with social auth
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  SetUserData(user: any, resutl : Superadmin) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `Admin/${user.uid}`
    );
    const userData: Superadmin = {
      superadmin_id: user.uid,
      email: user.email,
      name: resutl.name,
      password: resutl.password,
      logo: resutl.logo,
      telephone: resutl.telephone,
      entreprise: resutl.entreprise,
      detail_entreprise: resutl.detail_entreprise,
      nui: resutl.nui,
      sigle: resutl.sigle,
    };
    return userRef.set(userData, {
      merge: true,
    });
  }

  // Sign out
  SignOut() {
    return this.afAuth.signOut().then(() => {
      this.LocalStorage.remove('user');
      this.router.navigate(['login']);
    });
  }


  getUsersCount(): Observable<any> {
    const token = this.LocalStorage.get('userTokenAPI');
    if (!this.user) {
      this.router.navigate(['dashboard']);
    }
    const id = this.user.users_id!;
    const telephone = this.user.telephone!;
    let URL = URL_SERVICE + 'snowseller/admin/' + id + '/' + telephone;


    if (!token) {
      return of(null);
    }
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    }
    );

    return this.http.get<any>(URL, { headers });

  }

}

export namespace errorMessage {
  export function convertMessage(code: string): string {
    console.log(code);
    switch (code) {
      case 'auth/user-disabled': {
        return 'Votre compte a été désactivé';
      }
      case 'auth/user-not-found': {
        return 'Désolé votre compte est inexistant';
      }
      case 'auth/wrong-password': {
        return 'Mot passe incorrect. Veuillez ressayez';
      }
      case 'auth/invalid-credential': {
        return 'Désolé vos identifiants sont incorrects';
      }

      default: {
        return 'Login error try again later.';
      }
    }
  }
}

