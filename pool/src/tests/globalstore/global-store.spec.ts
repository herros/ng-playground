import { TestBed } from '@angular/core/testing';
import { GlobalStore } from '@app/globalstore/global.store';

describe('GlobalStore', () => {
  afterEach(() => {
    TestBed.resetTestingModule();
  });

  it('should initialize title with Unknown on init hook', () => {
    TestBed.configureTestingModule({
      providers: [GlobalStore],
    });

    const store = TestBed.inject(GlobalStore);

    expect(store.title()).toBe('Unknown');
  });

  it('should update title when setTitle is called', () => {
    TestBed.configureTestingModule({
      providers: [GlobalStore],
    });

    const store = TestBed.inject(GlobalStore);

    store.setTitle('Teams');

    expect(store.title()).toBe('Teams');
  });
});
