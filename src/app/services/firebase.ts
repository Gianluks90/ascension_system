import { Injectable } from "@angular/core";
import { initializeApp } from "firebase/app";
import { FIREBASE_CONFIG } from "../consts/firebase-config";

@Injectable({
  providedIn: "root",
})
export class Firebase {
  constructor() {
    const app = initializeApp(FIREBASE_CONFIG);
  }
}
