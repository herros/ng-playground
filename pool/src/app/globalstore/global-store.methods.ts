import { patchState, signalStoreFeature, withMethods } from '@ngrx/signals';
import { IGlobalStoreState } from './global-store.state';

export function withGlobalStoreMethods() {
  return signalStoreFeature(
    { state: undefined as unknown as IGlobalStoreState },
    withMethods((store) => ({
      setTitle(title: string): void {
        patchState(store, { title });
      },
    })),
  );
}
