import { TestBed } from '@angular/core/testing';
import { GlobalStoreFacade } from '@app/core/services/global-store-facade';
import { GlobalStore } from '@app/globalstore/global.store';

describe('GlobalStoreFacade', () => {
  afterEach(() => {
    TestBed.resetTestingModule();
  });

  it('should create', () => {
    TestBed.configureTestingModule({
      providers: [GlobalStore, GlobalStoreFacade],
    });

    const facade = TestBed.inject(GlobalStoreFacade);

    expect(facade).toBeTruthy();
  });

  it('should expose title signal from the store', () => {
    TestBed.configureTestingModule({
      providers: [GlobalStore, GlobalStoreFacade],
    });

    const facade = TestBed.inject(GlobalStoreFacade);

    expect(facade.title()).toBe('Unknown');
  });

  it('should set title through the facade', () => {
    TestBed.configureTestingModule({
      providers: [GlobalStore, GlobalStoreFacade],
    });

    const facade = TestBed.inject(GlobalStoreFacade);

    facade.title = 'Teams';

    expect(facade.title()).toBe('Teams');
  });
});
