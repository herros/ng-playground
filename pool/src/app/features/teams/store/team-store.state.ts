import { Team } from '@models/team';
import { withState } from '@ngrx/signals';

export interface ITeamState {
  teams: Team[];
  selectedKey: string | undefined;
}

const initialState: ITeamState = {
  teams: [],
  selectedKey: undefined,
};

export function withTeamStoreState(): ReturnType<typeof withState<ITeamState>> {
  return withState(initialState);
}
