import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: AngularFireAuth) { }

  login(email: string, password: string) {
    //localStorage.setItem('user', JSON.stringify(cred));

    //let credDetails = UserService.getById(cred.user.uid as string)

    //localStorage.setItem('user-details', JSON.stringify(credDetails))
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  signup(email: string, password: string) {
    return this.auth.createUserWithEmailAndPassword(email, password);
  }

  isUserLoggedIn() {
    return this.auth.user;
  }

  logout() {
    localStorage.setItem('user', JSON.stringify('null'));
    return this.auth.signOut();
  }

}
