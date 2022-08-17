import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from '@angular/fire/auth';
import {
  addDoc,
  setDoc,
  doc,
  deleteDoc,
  getDoc,
} from '@angular/fire/firestore';
import { collection, collectionData, Firestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Avatar } from '../interfaces/avatar.interface';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private auth: Auth, private firestore: Firestore) {}

  isLogged: boolean = false;

  register({ email, password }: any) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  createAvatar(avatar: Avatar) {
    const avatarDoc = doc(this.firestore, 'avatar', 'aaa', 'avatarr');

    return setDoc(avatarDoc, avatar);
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
