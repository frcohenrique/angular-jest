import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UsersCreateComponent } from './users-create.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('UsersCreateComponent', () => {
  let component: UsersCreateComponent;
  let fixture: ComponentFixture<UsersCreateComponent>;
  let emitSubmitFormSpy: jest.SpyInstance;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UsersCreateComponent],
      imports: [
        ReactiveFormsModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        BrowserAnimationsModule,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    component.usersForm = new FormGroup({
      name: new FormControl('', Validators.required),
      surname: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      country: new FormControl('', Validators.required),
      state: new FormControl('', Validators.required),
    });

    emitSubmitFormSpy = jest.spyOn(component.emitSubmitForm, 'emit');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit form value when submit button is clicked', () => {
    const submitButton = fixture.debugElement.query(By.css('button'));
    submitButton.triggerEventHandler('click', null);

    expect(emitSubmitFormSpy).toHaveBeenCalled();
  });

  it('should reset form after emitting form value', () => {
    const submitButton = fixture.debugElement.query(By.css('button'));
    submitButton.triggerEventHandler('click', null);

    expect(emitSubmitFormSpy).toHaveBeenCalled();
    expect(component.usersForm.pristine).toBeTruthy();
  });
});
