import { inject } from '@angular/core';
import { patchState, signalStoreFeature, withMethods } from '@ngrx/signals';
import { TeamService } from '../services/team-service';
import { ITeamState } from './team-store.state';

export function withTeamStoreMethods() {
  return signalStoreFeature(
    { state: undefined as unknown as ITeamState },
    withMethods((store, teamService = inject(TeamService)) => ({
      async getTeams(skipLoader = false): Promise<void> {
        const teams = (await teamService.getAll(skipLoader)) ?? [];
        patchState(store, { teams });
      },
      setSelected(key: string): void {
        patchState(store, { selectedKey: key });
      },
    })),
  );
}
