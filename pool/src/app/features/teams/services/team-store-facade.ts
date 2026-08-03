import { inject, Service, Signal } from '@angular/core';
import { GlobalStoreFacade } from '@app/core/services/global-store-facade';
import { Team } from '@models/team';
import { TeamStore } from '../store/team.store';

@Service()
export class TeamStoreFacade {
  private readonly _store = inject(TeamStore);
  private readonly _globalStore = inject(GlobalStoreFacade);

  public get selectedTeam(): Signal<Team> {
    return this._store.selectedTeam;
  }

  public set selectedTeam(value: Team) {
    throw new Error('Do not set selectedTeam directly. Use setSelectedTeam() instead.');
  }

  public get teams(): Signal<Team[]> {
    return this._store.sortedData;
  }

  public get title(): string {
    return this._globalStore.title();
  }

  public set title(value: string) {
    this._globalStore.title = value;
  }

  public setSelectedTeam(key: string): void {
    this._store.setSelected(key);
  }

  public async refreshTeams(skipLoader = false): Promise<Team[]> {
    await this._store.getTeams(skipLoader).catch((error) => {
      console.error('Error refreshing teams:', error);
    });
    return this._store.sortedData();
  }

  public sortOn(sortParms: { key: keyof Team; direction?: 'asc' | 'desc' }): void {
    const { key, direction } = sortParms;
    this._store.setSort(key, direction);
  }
}
