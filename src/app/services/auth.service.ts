import { HttpClient, HttpHeaders } from '@angular/common/http';
import { afterNextRender, afterRender, inject, Injectable } from '@angular/core';
import { URL_SERVICE } from '../../config/config';
import { catchError, finalize, from, map, Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { BrowserStorageService } from './browser-storage.service';


import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Superadmin } from '../domains/superadmin';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FileUpload } from 'primeng/fileupload';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  uid: any = '';
  user: any;

  userData?: any;

  constructor(public afAuth: AngularFireAuth, private storage: AngularFireStorage, public afs: AngularFirestore, private http: HttpClient, private router: Router, private LocalStorage: BrowserStorageService) {
    this.loadUser();
  }

  loadUser(){
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        this.uid = user.uid;
        this.LocalStorage.set('user', JSON.stringify(this.userData));
        JSON.parse(this.LocalStorage.get('user')!);
      } else {
        this.LocalStorage.set('user', 'null');
        JSON.parse(this.LocalStorage.get('user')!);
      }
    });
  }

  saveFileInFirebase(path: string, fileUpload: FileUpload) {
    const basePath = '/Admin/' + path + fileUpload.name;
    const storageRef = this.storage.ref(basePath);
    const uploadTask = this.storage.upload(basePath, fileUpload);
    uploadTask.snapshotChanges().pipe(
      finalize(() => {
        storageRef.getDownloadURL().subscribe(downloadURL => {
        const link = downloadURL;
        this.LocalStorage.set('imageLink', link);
        });
      })
    ).subscribe();
    return uploadTask.percentageChanges();
  }


  // Sign up with email/password
  registerUser(email: string, password: string) {
    return this.afAuth.createUserWithEmailAndPassword(email, password).then((result) => {
      return result.user?.email;
    }).catch((error) => {
      throw error;
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

  get checkEmailVerification(): boolean {
    let value = false;
    this.afAuth.currentUser.then((currentUser) => {
      if (currentUser?.emailVerified) {
        value = true;
        return value;
      } else {
        value = false;
        return value;
      }
    });
    return value === false ? false : true;
  }


  loginUser(email: string, password: string): Promise<void> {
    return this.afAuth.signInWithEmailAndPassword(email, password).then((result) => {
      //this.SetUserData(result.user, );
      this.afAuth.authState.subscribe((user) => {
        if (user) {
          return user;
        } else {
          return null;
        }
      });
    })
      .catch((error) => {
        throw error.code;
      });
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

  /* Setting up user data when sign in with username/password,
  sign up with username/password and sign in with social auth
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  SetUserData(resutl: Superadmin) {

    const userData: Superadmin = {
      uid: resutl.uid,
      email: resutl.email,
      name: resutl.name,
      password: resutl.password,
      logo: resutl.logo,
      telephone: resutl.telephone,
      entreprise: resutl.entreprise,
      detail_entreprise: resutl.detail_entreprise,
      nui: resutl.nui,
      sigle: resutl.sigle,
    };

    this.afs.collection("Admin").doc(resutl.uid).set(JSON.parse(JSON.stringify(userData)));
  }

  // Sign out
  SignOut() {
    return this.afAuth.signOut().then(() => {
      this.LocalStorage.remove('user');
      this.LocalStorage.clear();
      this.router.navigate(['login']);
    });
  }


  getUsersCount(userId: any,) {
    console.log(userId);

    return new Promise<any>((resolve) => {
      this.afs.collection('Admin',ref => ref.where('uid', '==', userId)).valueChanges()
        .subscribe(users => {
          console.log(users);
          if (users.length > 0) {
            resolve(users);
            this.router.navigate(['dashboard']);
          }else{
            this.router.navigate(['verify-email-address']);
          }
        });
    })

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
      case 'auth/email-already-in-use': {
        return 'Cet adresse mail est déjà utilisé';
      }
      default: {
        return 'Login error try again later.';
      }
    }
  }
}

