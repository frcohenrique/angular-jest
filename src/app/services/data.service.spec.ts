import { DataService } from './data.service';
import { Users } from '../models/users.interface';
import { BehaviorSubject } from 'rxjs';

describe('DataService', () => {
  let service: DataService;

  beforeEach(() => {
    service = new DataService();
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  describe('setUsers', () => {
    it('should set users to the users$ observable', () => {
      const users: Users[] = [
        {
          id: '1',
          name: 'test',
          surname: 'test',
          email: 'test@test.com',
          country: 'test',
          state: 'test',
        },
        {
          id: '2',
          name: 'tes2t',
          surname: 'test2',
          email: 'test2@test.com',
          country: 'test2',
          state: 'test2',
        },
      ];

      service.setUsers(users);

      service.users$.subscribe((receivedUsers: Users[]) => {
        expect(receivedUsers).toEqual(users);
      });
    });
  });
});
