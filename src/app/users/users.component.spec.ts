import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UsersComponent } from './users.component';
import { DataService } from '../services/data.service';
import { FirebaseService } from '../services/firebase.service';
import { of } from 'rxjs';
import { createUsers } from '../models/users.interface';

describe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;
  let dataService: DataService;
  let firebaseService: FirebaseService;
  const users = [
    {
      country: 'teste',
      email: 'teste@gmail.com',
      state: 'teste',
      name: 'teste',
      surname: 'teste',
      id: 'Ut7OlkHvUiNecEzXzuO3',
    },
  ];
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UsersComponent],
      providers: [
        {
          provide: DataService,
          useValue: {
            setUsers: jest.fn(),
            users$: of(users),
          },
        },
        {
          provide: FirebaseService,
          useValue: {
            getUsers: () => {
              return new Promise((resolve) => {
                resolve(users);
              });
            },
            addUser: (user: createUsers) => {
              return new Promise<void>((resolve) => {
                resolve();
              });
            },
          },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;
    dataService = TestBed.inject(DataService);
    firebaseService = TestBed.inject(FirebaseService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call FirebaseService.getUsers and DataService.setUsers on getUsersList', async () => {
    const setUsersSpy = jest.spyOn(dataService, 'setUsers');

    await component.getUsersList();

    expect(setUsersSpy).toHaveBeenCalledWith(users);
  });

  it('should call FirebaseService.addUser and getUsersList on onSubmitForm', async () => {
    const user = {
      country: 'teste',
      email: 'teste@gmail.com',
      state: 'teste',
      name: 'teste',
      surname: 'teste',
      id: 'Ut7OlkHvUiNecEzXzuO3',
    };

    const addUserSpy = jest.spyOn(firebaseService, 'addUser');
    const getUsersListSpy = jest.spyOn(component, 'getUsersList');

    await component.onSubmitForm(user);

    expect(addUserSpy).toHaveBeenCalledWith(user);
    expect(getUsersListSpy).toHaveBeenCalled();
  });
});
