import { TestBed } from '@angular/core/testing';
import { withSorting } from '@app/shared/storefeatures/with-sorting';
import { signalStore, withFeature, withState } from '@ngrx/signals';

interface Item {
  name: string | null;
  score: number | null;
}

function setup(initialItems: Item[]) {
  const SortingStore = signalStore(
    withState<{ items: Item[] }>({ items: initialItems }),
    // withSorting<Item, { items: Item[] }>((store) => store.items),
    withFeature((store) => withSorting<Item>(store.items)),
  );

  TestBed.configureTestingModule({
    providers: [SortingStore],
  });

  const store = TestBed.inject(SortingStore);

  return { store };
}

describe('withSorting', () => {
  afterEach(() => {
    TestBed.resetTestingModule();
  });

  it('should keep original order when no sort key is set', () => {
    const items: Item[] = [
      { name: 'Charlie', score: 20 },
      { name: 'Alpha', score: 10 },
      { name: 'Bravo', score: 30 },
    ];

    const { store } = setup(items);

    expect(store.sortedData()).toEqual(items);
  });

  it('should sort by name ascending and descending', () => {
    const items: Item[] = [
      { name: 'Charlie', score: 20 },
      { name: 'Alpha', score: 10 },
      { name: 'Bravo', score: 30 },
    ];

    const { store } = setup(items);

    store.setSort('name', 'asc');
    expect(store.sortedData().map((item) => item.name)).toEqual(['Alpha', 'Bravo', 'Charlie']);

    store.setSort('name', 'desc');
    expect(store.sortedData().map((item) => item.name)).toEqual(['Charlie', 'Bravo', 'Alpha']);
  });

  it('should toggle sort direction when no direction is provided', () => {
    const items: Item[] = [
      { name: 'Charlie', score: 20 },
      { name: 'Alpha', score: 10 },
      { name: 'Bravo', score: 30 },
    ];

    const { store } = setup(items);

    store.setSort('name');
    expect(store.sortDirection()).toBe('asc');
    expect(store.sortedData().map((item) => item.name)).toEqual(['Alpha', 'Bravo', 'Charlie']);

    store.setSort('name');
    expect(store.sortDirection()).toBe('desc');
    expect(store.sortedData().map((item) => item.name)).toEqual(['Charlie', 'Bravo', 'Alpha']);
  });

  it('should place null values last in ascending and first in descending order', () => {
    const items: Item[] = [
      { name: null, score: 20 },
      { name: 'Alpha', score: 10 },
      { name: 'Bravo', score: 30 },
    ];

    const { store } = setup(items);

    store.setSort('name', 'asc');
    expect(store.sortedData().map((item) => item.name)).toEqual(['Alpha', 'Bravo', null]);

    store.setSort('name', 'desc');
    expect(store.sortedData().map((item) => item.name)).toEqual([null, 'Bravo', 'Alpha']);
  });

  it('should clear sort and restore original order', () => {
    const items: Item[] = [
      { name: 'Charlie', score: 20 },
      { name: 'Alpha', score: 10 },
      { name: 'Bravo', score: 30 },
    ];

    const { store } = setup(items);

    store.setSort('name', 'desc');
    expect(store.sortedData().map((item) => item.name)).toEqual(['Charlie', 'Bravo', 'Alpha']);

    store.clearSort();
    expect(store.sortKey()).toBeNull();
    expect(store.sortDirection()).toBe('asc');
    expect(store.sortedData()).toEqual(items);
  });
});
