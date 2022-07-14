import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  addDoc,
  setDoc,
  doc,
  deleteDoc,
  getDoc,
  collectionData,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Like } from '../interfaces/like.interface';
@Injectable({ providedIn: 'root' })
export class LikesService {
  constructor(private firestore: Firestore) {}
  /**
   *  * Añade un like que has dado a una pelicula
   * @param like objeto de tipo Like
   * @param id de la pelicula
   * @param userCurrent email usuario actual
   * @returns promise
   */
  addLike(like: Like, id: string, userCurrent: any) {
    const likeDoc = doc(this.firestore, 'likes', userCurrent, 'likes', id);

    return setDoc(likeDoc, like);
  }
  /**
   * * Obtiene los likes que ha dado el usuario
   * @param userCurrent
   * @returns promise
   */
  getLikes(userCurrent: any): Observable<Like[]> {
    const likeRef = collection(
      this.firestore,
      'likes',
      userCurrent.email,
      'likes'
    );

    return collectionData(likeRef, { idField: 'id' }) as Observable<Like[]>;
  }
  /**
   * * Elimina un like de una pelicula o serie
   * @param id
   * @param userCurrent
   * @returns
   */
  deleteLike(id: number, userCurrent: any) {
    const likeDocRef = doc(
      this.firestore,
      `likes/${userCurrent.email}/likes/${id}`
    );
    return deleteDoc(likeDocRef);
  }
}
