import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../services/data.service';
import { FirebaseService } from '../services/firebase.service';
import { createUsers } from '../models/users.interface';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  constructor(
    private readonly dataService: DataService,
    private readonly firebaseService: FirebaseService
  ) {}

  ngOnInit(): void {
    this.getUsersList();
  }

  async getUsersList() {
    const users = await this.firebaseService.getUsers();
    this.dataService.setUsers(users);
  }

  onSubmitForm($event: createUsers) {
    this.firebaseService.addUser($event).then(() => {
      this.getUsersList();
    });
  }
}
