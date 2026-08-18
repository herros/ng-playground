import { inject, Service, Signal } from '@angular/core';
import { Team } from '@models/team';
import { GlobalStoreFacade } from '@services/global-store-facade';
import { TeamStore } from '../store/team.store';

@Service({ autoProvided: false })
export class TeamStoreFacade {
  // Injects
  private readonly _store = inject(TeamStore);
  private readonly _globalStore = inject(GlobalStoreFacade);

  // Signals

  // Computed Signals

  // Variables
  get selectedTeam(): Signal<Team> {
    return this._store.selectedTeam;
  }

  set selectedTeam(value: Team) {
    throw new Error('Do not set selectedTeam directly. Use setSelectedTeam() instead.');
  }

  get teams(): Signal<Team[]> {
    return this._store.sortedData;
  }

  get title(): string {
    return this._globalStore.title();
  }

  set title(value: string) {
    this._globalStore.title = value;
  }

  // Public methods
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

  // Protected methods

  // Private methods
}
