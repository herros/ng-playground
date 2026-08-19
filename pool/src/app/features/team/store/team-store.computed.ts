import { computed } from '@angular/core';
import { Team } from '@models/team';
import { signalStoreFeature, withComputed } from '@ngrx/signals';
import { ITeamState } from './team-store.state';

export function withTeamStoreComputed() {
  return signalStoreFeature(
    { state: undefined as unknown as ITeamState },

    withComputed((state) => ({
      selectedTeam: computed(() => {
        if (!state.selectedKey()) {
          return new Team();
        }
        return state.teams().find((team) => team.publicKey === state.selectedKey()) ?? new Team();
      }),
    })),
  );
}
