import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
@Component({
  selector: 'app-users-create',
  templateUrl: './users-create.component.html',
  styleUrls: ['./users-create.component.scss'],
})
export class UsersCreateComponent implements OnInit {
  @Input() usersForm: any;

  @Output('formSubmitEmit') emitSubmitForm = new EventEmitter();

  constructor(private readonly dataService: DataService) {}

  submitForm() {
    this.emitSubmitForm.emit(this.usersForm.value);
    this.usersForm.reset();
  }

  ngOnInit(): void {}
}
