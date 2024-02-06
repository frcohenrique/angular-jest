import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let fixture: AppComponent;

  beforeEach(() => {
    fixture = new AppComponent();
  });

  it('should have a title angularUnitTesting', () => {
    expect(fixture.title).toEqual('angularUnitTesting');
  });
});
