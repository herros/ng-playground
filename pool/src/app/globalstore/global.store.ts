import { signalStore, withHooks } from '@ngrx/signals';
import { withGlobalStoreMethods } from './global-store.methods';
import { withGlobalStoreState } from './global-store.state';

export const GlobalStore = signalStore(
  { providedIn: 'root' },
  withGlobalStoreState(),
  withGlobalStoreMethods(),
  withHooks({
    onInit: (store): void => {
      store.setTitle('Unknown');
    },
  }),
);

export type GlobalStoreType = InstanceType<typeof GlobalStore>;
