import { inject, Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

interface GrantedCredential {
  email: string;
  password: string;
}

@Injectable({
  providedIn: "root",
})
export class Auth {

  constructor(private router: Router) {}
  public createWithEmailAndPassword(credential: GrantedCredential) {
    // TODO: Da implementare nella prossima versione;
  }
  public async loginWithEmailAndPassword(credential: GrantedCredential): Promise<any> {
    const auth = getAuth();
    return signInWithEmailAndPassword(auth, credential.email, credential.password).then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      console.log('Login successful:', user);
    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error('Login failed:', errorCode, errorMessage);
    });
  }

  public logout() {
    getAuth().signOut();
    this.router.navigate(['/']);
  };
}
