import { Injectable } from '@angular/core';
import { Users } from '../models/users.interface';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private usersSubject: BehaviorSubject<Users[]> = new BehaviorSubject<Users[]>(
    []
  );
  public users$: Observable<Users[]> = this.usersSubject.asObservable();
  constructor() {}

  setUsers(users: Users[]) {
    this.usersSubject.next(users);
  }
}
