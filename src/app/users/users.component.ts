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
  public usersForm: FormGroup = this.fb.group({});

  constructor(
    private readonly fb: FormBuilder,
    private readonly dataService: DataService,
    private readonly firebaseService: FirebaseService
  ) {
    this.createUsersForm();
  }

  createUsersForm() {
    this.usersForm = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      name: ['', Validators.required],
      surname: ['', Validators.required],
      state: ['', Validators.required],
      country: ['', Validators.required],
    });
  }

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
      console.log('aaaaa')
    });
  }
}
