import { Inject, Injectable } from '@angular/core';
import { Users, createUsers } from '../models/users.interface';
import { BehaviorSubject, Observable } from 'rxjs';
import { Firestore, collection, getDocs } from 'firebase/firestore';
import { inject } from '@angular/core/testing';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User } from 'firebase/auth';

@Injectable({
  providedIn: 'root',
})
export class DataService {

  private usersSubject: BehaviorSubject<Users[]> = new BehaviorSubject<Users[]>([]);
  public users$: Observable<Users[]> = this.usersSubject.asObservable();
  constructor() {}


  setUsers(users: Users[]) {
    this.usersSubject.next(users);
  }
}
