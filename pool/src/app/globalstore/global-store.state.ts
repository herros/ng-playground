import { withState } from '@ngrx/signals';

export interface IGlobalStoreState {
  title: string;
}

const initialState: IGlobalStoreState = {
  title: '',
};

export function withGlobalStoreState(): ReturnType<typeof withState<IGlobalStoreState>> {
  return withState(initialState);
}
