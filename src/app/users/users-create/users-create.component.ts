import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-users-create',
  templateUrl: './users-create.component.html',
  styleUrls: ['./users-create.component.scss'],
})
export class UsersCreateComponent implements OnInit {
  public usersForm: FormGroup = this.fb.group({});

  @Output('formSubmitEmit') emitSubmitForm = new EventEmitter();

  constructor(private readonly fb: FormBuilder) {}

  createUsersForm() {
    this.usersForm = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      name: ['', Validators.required],
      surname: ['', Validators.required],
      state: ['', Validators.required],
      country: ['', Validators.required],
    });
  }

  submitForm() {
    this.emitSubmitForm.emit(this.usersForm.value);
    this.usersForm.reset();
  }

  ngOnInit(): void {
    this.createUsersForm();
  }
}
