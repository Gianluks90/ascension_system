import { Injectable, signal } from "@angular/core";
import { initializeApp } from "firebase/app";
import { FIREBASE_CONFIG } from "../consts/firebase-config";
import { UserData } from "../models/UserData";
import { getAuth, User } from "firebase/auth";
import { Firestore, getFirestore } from "firebase/firestore";

@Injectable({
  providedIn: "root",
})
export class Firebase {
  private _user = signal<UserData | null>(null);
  public database: Firestore;

  constructor() {
    const app = initializeApp(FIREBASE_CONFIG);
    this.database = getFirestore(app);

    getAuth(app).onAuthStateChanged(async user => {
      if (user) {
        console.log(user);
      }
    });
  }
}
