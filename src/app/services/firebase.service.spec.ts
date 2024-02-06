import { FirebaseService } from './firebase.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { of } from 'rxjs';

describe('FirebaseService', () => {
  let service: FirebaseService;
  let angularFirestoreSpy: any;

  beforeEach(() => {
    angularFirestoreSpy = {
      collection: jest.fn().mockReturnThis(),
      get: jest.fn(),
      toPromise: jest.fn(),
      add: jest.fn(),
    };

    const querySnapshotSpy = { docs: [] };

    angularFirestoreSpy.get.mockReturnValue({
      toPromise: jest.fn().mockResolvedValue(querySnapshotSpy),
    });

    service = new FirebaseService(angularFirestoreSpy as any);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getUsers', () => {
    it('should call get method on db.collection', async () => {
      const users: any = [];

      const result = await service.getUsers();

      expect(angularFirestoreSpy.collection).toHaveBeenCalledWith('users');
      expect(angularFirestoreSpy.get).toHaveBeenCalled();
      expect(angularFirestoreSpy.get).toHaveBeenCalledTimes(1);
      expect(result).toEqual(users);
    });
  });

  describe('addUser', () => {
    it('should call add method on db.collection', async () => {
      const user: any = {
        name: 'test',
        surname: 'test',
        email: 'test@test.com',
        country: 'test',
        state: 'test',
      };

      angularFirestoreSpy.add.mockResolvedValue({} as any);

      await service.addUser(user);

      expect(angularFirestoreSpy.collection).toHaveBeenCalledWith('users');
      expect(angularFirestoreSpy.add).toHaveBeenCalled();
      expect(angularFirestoreSpy.add).toHaveBeenCalledTimes(1);
    });
  });
});