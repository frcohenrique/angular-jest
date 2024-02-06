import { Injectable } from '@angular/core';
import { Users, createUsers } from '../models/users.interface';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  constructor(private db: AngularFirestore) {}

  async getUsers() {
    const querySnapshot: any = await this.db
      .collection('users')
      .get()
      .toPromise();

    const users: Users[] = [];
    try {
      querySnapshot.forEach((doc: any) => {
        const user: Users = doc.data();
        user.id = doc.id;
        users.push(user);
      });
    } catch (e) {
      console.error(e);
    }
    return users;
  }

  async addUser(user: createUsers) {
    try {
      await this.db.collection('users').add({
        name: user.name,
        surname: user.surname,
        email: user.email,
        country: user.country,
        state: user.state,
      });
    } catch (error) {
      console.error(error);
    }
  }
}
