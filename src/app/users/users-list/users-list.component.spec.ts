import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UsersListComponent } from './users-list.component';
import { DataService } from 'src/app/services/data.service';
import { Users } from 'src/app/models/users.interface';
import { By } from '@angular/platform-browser';

describe('UsersListComponent', () => {
  let component: UsersListComponent;
  let fixture: ComponentFixture<UsersListComponent>;
  let dataService: DataService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UsersListComponent],
      providers: [DataService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersListComponent);
    component = fixture.componentInstance;
    dataService = TestBed.inject(DataService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set users when DataService.users$ emits', () => {
    const users: Users[] = [
      {
        country: 'teste',
        email: 'teste@gmail.com',
        state: 'teste',
        name: 'teste',
        surname: 'teste',
        id: 'Ut7OlkHvUiNecEzXzuO3',
      },
    ];

    const ngOnInitSpy = jest.spyOn(component, 'ngOnInit');

    // Chame a função de detecção de alterações para inicializar o componente
    fixture.detectChanges();

    expect(ngOnInitSpy).toHaveBeenCalled();
  });

  it('should display the received users', () => {
    const users: Users[] = [
      {
        country: 'teste',
        email: 'teste@gmail.com',
        state: 'teste',
        name: 'teste',
        surname: 'teste',
        id: 'Ut7OlkHvUiNecEzXzuO3',
      },
    ];

    dataService.setUsers(users);

    const tableRows = fixture.debugElement.queryAll(By.css('.table-row'));

    expect(tableRows.length).toBe(1);

    const idCells = fixture.debugElement.queryAll(
      By.css('.table-cell:first-child')
    );
    expect(idCells[0].nativeElement.textContent).toBe(users[0].id);
    expect(idCells[1].nativeElement.textContent).toBe(users[0].name);
    expect(idCells[2].nativeElement.textContent).toBe(users[0].surname);
    expect(idCells[3].nativeElement.textContent).toBe(users[0].email);
    expect(idCells[4].nativeElement.textContent).toBe(users[0].country);
    expect(idCells[5].nativeElement.textContent).toBe(users[0].state);
  });
});
