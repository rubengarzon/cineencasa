import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from '@angular/fire/auth';
import { collection, collectionData, Firestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private auth: Auth, private firestore: Firestore) {}

  isLogged: boolean = false;

  register({ email, password }: any) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  login({ email, password }: any) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  getUserCurrent() {
    return this.auth.currentUser;
  }
  /**
   * Obtiene información del perfil del usuario
   * @param userCurrent
   * @returns
   */
  getProfile(userCurrent: any) {
    const likeRef = collection(this.firestore, 'profile', userCurrent, '1');

    return collectionData(likeRef) as Observable<any>;
  }

  logout() {
    return signOut(this.auth);
  }
}
