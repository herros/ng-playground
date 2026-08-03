import { computed, Signal } from '@angular/core';
import {
  patchState,
  signalStoreFeature,
  // StateSignals,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';

export type SortDirection = 'asc' | 'desc';

// Interface for the initial state of the feature
export interface SortState<T> {
  sortKey: keyof T | null;
  sortDirection: SortDirection;
}

// type SortContract<T, TState> = StateSignals<TState> & {
//   sortKey: Signal<keyof T | null>;
//   sortDirection: Signal<SortDirection>;
// };

/**
 * A reusable SignalStore feature to sort an array.
 * @param dataSelector A function that selects the signal array to be sorted from the store.
 */
// export function withSorting<T, TState extends object>(
//   dataSelector: (store: SortContract<T, TState>) => Signal<T[]>,
// ) {
export function withSorting<T>(data: Signal<T[]>) {
  return signalStoreFeature(
    // Add the default sort state to the store
    withState<SortState<T>>({
      sortKey: null,
      sortDirection: 'asc',
    }),

    // Add a computed signal for the sorted data
    withComputed((store) => {
      // const data = dataSelector(store as SortContract<T, TState>);

      return {
        sortedData: computed(() => {
          const list = [...data()]; // Make a shallow copy to avoid mutating the original data
          const key = store.sortKey();
          const direction = store.sortDirection();

          if (!key) {
            return list;
          }

          return list.sort((a, b) => {
            const valueA = a[key];
            const valueB = b[key];

            // Handle runtime undefined or null values
            if (valueA == null) return direction === 'asc' ? 1 : -1;
            if (valueB == null) return direction === 'asc' ? -1 : 1;

            // Sort based on type (String or others like Numbers/Dates)
            if (typeof valueA === 'string' && typeof valueB === 'string') {
              return direction === 'asc'
                ? valueA.localeCompare(valueB)
                : valueB.localeCompare(valueA);
            }

            if (valueA < valueB) return direction === 'asc' ? -1 : 1;
            if (valueA > valueB) return direction === 'asc' ? 1 : -1;
            return 0;
          });
        }),
      };
    }),

    // Add methods to update the sort state
    withMethods((store) => ({
      setSort(key: keyof T, direction?: SortDirection): void {
        const currentKey = store.sortKey();
        const currentDirection = store.sortDirection();

        // When no direction is provided, toggle automatically
        const nextDirection = direction
          ? direction
          : currentKey === key && currentDirection === 'asc'
            ? 'desc'
            : 'asc';
        patchState(store, { sortKey: key as keyof T | null, sortDirection: nextDirection });
      },
      clearSort(): void {
        patchState(store, { sortKey: null, sortDirection: 'asc' });
      },
    })),
  );
}
