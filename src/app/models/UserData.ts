import { Timestamp } from "firebase/firestore";

export interface UserData {
    uid: string;
    nickname: string;
    email: string;
    createdAt: Timestamp; // fornito da Firebase
    updatedAt: Timestamp;
    photoURL?: string;
    playmatURL?: string;
    statistics?: any; // Ci servirà più avanti
}