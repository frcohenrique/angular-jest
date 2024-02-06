import { Component, OnInit } from '@angular/core';
import { Users } from 'src/app/models/users.interface';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent implements OnInit {
  public users: Users[] = [];

  constructor(private readonly dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.users$.subscribe((users: Users[]) => {
      this.users = users;
    });
  }
}
